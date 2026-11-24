/* Persistence and mutations for the House of Clergy demo. */
(function (global) {
  const KEY = "hoc-demo-v1";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function nowIso() {
    return new Date().toISOString().replace("Z", "+00:00");
  }

  function todayEatDate() {
    try {
      var s = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      return s.replace(/\//g, "-");
    } catch (err) {
      return new Date().toISOString().slice(0, 10);
    }
  }

  const Store = {
    data: null,

    init: function () {
      var raw = null;
      try {
        raw = localStorage.getItem(KEY);
      } catch (err) {
        raw = null;
      }
      if (raw) {
        try {
          var parsed = JSON.parse(raw);
          if (parsed && parsed.version === global.HOC_SEED.version) {
            this.data = parsed;
            this.ensureShape();
            return;
          }
        } catch (err) {
          this.data = null;
        }
      }
      this.data = clone(global.HOC_SEED);
      this.save();
    },

    ensureShape: function () {
      if (!this.data.ui) {
        this.data.ui = clone(global.HOC_SEED.ui);
      }
      if (!this.data.ui.role) this.data.ui.role = "secretary";
      if (!this.data.ui.verifierProvince) this.data.ui.verifierProvince = "Lagos Province";
      if (!this.data.ui.repId) this.data.ui.repId = "r30";
      if (!this.data.ui.confirmStep) this.data.ui.confirmStep = 1;
      if (!this.data.designations) this.data.designations = clone(global.HOC_SEED.designations || []);
      if (!this.data.meetings) this.data.meetings = clone(global.HOC_SEED.meetings || []);
      if (!this.data.reports) this.data.reports = clone(global.HOC_SEED.reports || []);
    },

    save: function () {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.data));
      } catch (err) {
        console.warn("Could not save demo state", err);
      }
    },

    reset: function () {
      this.data = clone(global.HOC_SEED);
      this.save();
    },

    get: function () {
      return this.data;
    },

    setUI: function (partial) {
      Object.assign(this.data.ui, partial);
      this.save();
    },

    provinces: function () {
      return this.data.provinces.slice();
    },

    committees: function () {
      return this.data.committees.slice();
    },

    designations: function () {
      return (this.data.designations || global.HOC_SEED.designations || []).slice();
    },

    dioceses: function (province) {
      return this.data.dioceses.filter(function (d) {
        return !province || d.province === province;
      });
    },

    people: function () {
      return this.data.people;
    },

    person: function (id) {
      return this.data.people.find(function (p) {
        return p.id === id;
      }) || null;
    },

    currentRep: function () {
      return this.person(this.data.ui.repId) || this.data.people[0];
    },

    queryPeople: function (filters) {
      filters = filters || {};
      var q = (filters.q || "").trim().toLowerCase();
      return this.data.people.filter(function (p) {
        if (filters.province && p.province !== filters.province) return false;
        if (filters.diocese && p.diocese !== filters.diocese) return false;
        if (filters.status && p.status !== filters.status) return false;
        if (filters.committee && p.committee !== filters.committee) return false;
        if (filters.active === "yes" && !p.active) return false;
        if (filters.active === "no" && p.active) return false;
        if (filters.fromVerified && (p.lastVerified || "") < filters.fromVerified) return false;
        if (filters.toVerified && (p.lastVerified || "") > filters.toVerified) return false;
        if (q) {
          var hay = [p.fullName, p.title, p.designation, p.province, p.diocese, p.role, p.email, p.committee]
            .join(" ")
            .toLowerCase();
          if (hay.indexOf(q) === -1) return false;
        }
        return true;
      }).slice().sort(function (a, b) {
        return a.fullName.localeCompare(b.fullName);
      });
    },

    appendAudit: function (person, action, note) {
      var ui = this.data.ui;
      var actor = "Secretary's office";
      var role = "Secretary";
      if (ui.role === "verifier") {
        role = "Provincial verifier";
        actor = "Provincial verifier (" + ui.verifierProvince + ")";
      } else if (ui.role === "rep") {
        var rep = this.currentRep();
        role = "Clergy representative";
        actor = (rep.title + " " + rep.fullName).trim();
      }
      person.audit = person.audit || [];
      person.audit.push({
        at: nowIso(),
        role: role,
        actor: actor,
        action: action,
        note: note || "",
      });
    },

    updatePerson: function (id, fields) {
      var person = this.person(id);
      if (!person) return null;
      Object.keys(fields).forEach(function (key) {
        if (key !== "id" && key !== "audit") person[key] = fields[key];
      });
      this.save();
      return person;
    },

    submitConfirmation: function (id, fields) {
      var person = this.person(id);
      if (!person) return null;
      Object.keys(fields).forEach(function (key) {
        if (key !== "id" && key !== "audit" && key !== "status") person[key] = fields[key];
      });
      person.status = "Submitted";
      person.confirmRequested = false;
      this.appendAudit(person, "Submitted a confirmation of details.", "");
      this.save();
      return person;
    },

    checkPerson: function (id, note) {
      var person = this.person(id);
      if (!person) return null;
      person.status = "Checked";
      this.appendAudit(person, "Marked as Checked.", note);
      this.save();
      return person;
    },

    verifyPerson: function (id, note) {
      var person = this.person(id);
      if (!person) return null;
      var stamp = todayEatDate();
      if (person.status === "Verified") {
        person.status = "Maintained";
        this.appendAudit(person, "Re-confirmed and marked as Maintained.", note);
      } else {
        person.status = "Verified";
        this.appendAudit(person, "Verified the record.", note);
      }
      person.lastVerified = stamp;
      this.save();
      return person;
    },

    returnPerson: function (id, note) {
      var person = this.person(id);
      if (!person) return null;
      person.status = "Update needed";
      person.confirmRequested = true;
      this.appendAudit(person, "Returned the record for an update.", note);
      this.save();
      return person;
    },

    circulars: function () {
      return this.data.circulars.slice().sort(function (a, b) {
        return a.postedAt < b.postedAt ? 1 : -1;
      });
    },

    circular: function (id) {
      return this.data.circulars.find(function (c) {
        return c.id === id;
      }) || null;
    },

    recipientsFor: function (circular) {
      var target = circular.target || { type: "all" };
      var people = this.data.people;
      if (target.type === "all") return people.slice();
      if (target.type === "province") {
        var set = target.provinces || [];
        return people.filter(function (p) {
          return set.indexOf(p.province) !== -1;
        });
      }
      if (target.type === "dioceses") {
        var dioc = target.dioceses || [];
        return people.filter(function (p) {
          return dioc.indexOf(p.diocese) !== -1;
        });
      }
      if (target.type === "committee") {
        return people.filter(function (p) {
          return p.committee === target.committee;
        });
      }
      if (target.type === "individuals") {
        var ids = target.ids || [];
        return people.filter(function (p) {
          return ids.indexOf(p.id) !== -1;
        });
      }
      return [];
    },

    circularsForRep: function (repId) {
      var self = this;
      var person = this.person(repId);
      if (!person) return [];
      return this.circulars().filter(function (c) {
        return self.recipientsFor(c).some(function (p) {
          return p.id === repId;
        });
      });
    },

    postCircular: function (fields) {
      var id = "c" + Date.now().toString(36);
      var circular = {
        id: id,
        title: fields.title,
        body: fields.body,
        postedAt: nowIso(),
        author: "Secretary's office",
        target: fields.target,
        received: {},
        acknowledged: {},
      };
      this.data.circulars.push(circular);
      this.save();
      return circular;
    },

    markReceived: function (circularId, repId) {
      var circular = this.circular(circularId);
      if (!circular || !repId) return;
      circular.received = circular.received || {};
      if (!circular.received[repId]) {
        circular.received[repId] = nowIso();
        this.save();
      }
    },

    acknowledge: function (circularId, repId) {
      var circular = this.circular(circularId);
      if (!circular || !repId) return;
      circular.received = circular.received || {};
      circular.acknowledged = circular.acknowledged || {};
      if (!circular.received[repId]) circular.received[repId] = nowIso();
      circular.acknowledged[repId] = nowIso();
      this.save();
      return circular;
    },

    circularStats: function (circular) {
      var recipients = this.recipientsFor(circular);
      var received = 0;
      var acknowledged = 0;
      recipients.forEach(function (p) {
        if (circular.received && circular.received[p.id]) received += 1;
        if (circular.acknowledged && circular.acknowledged[p.id]) acknowledged += 1;
      });
      var status = "Outstanding";
      if (recipients.length && acknowledged === recipients.length) status = "Complete";
      else if (received > 0 && acknowledged < recipients.length) status = "Follow up";
      else if (received === 0) status = "Outstanding";
      return {
        total: recipients.length,
        received: received,
        acknowledged: acknowledged,
        status: status,
      };
    },

    provinceTracker: function (circular) {
      var self = this;
      var recipients = this.recipientsFor(circular);
      return this.provinces().map(function (province) {
        var group = recipients.filter(function (p) {
          return p.province === province;
        });
        if (!group.length) return null;
        var received = group.filter(function (p) {
          return circular.received && circular.received[p.id];
        }).length;
        var acknowledged = group.filter(function (p) {
          return circular.acknowledged && circular.acknowledged[p.id];
        }).length;
        var status = "Outstanding";
        if (acknowledged === group.length) status = "Complete";
        else if (received > 0) status = "Follow up";
        return {
          province: province,
          total: group.length,
          received: received,
          acknowledged: acknowledged,
          status: status,
        };
      }).filter(Boolean);
    },

    dashboard: function () {
      var self = this;
      var people = this.data.people;
      var verifiedLike = people.filter(function (p) {
        return p.status === "Verified" || p.status === "Maintained";
      }).length;
      var outstanding = people.filter(function (p) {
        return p.status === "Update needed";
      }).length;
      var pendingAck = 0;
      this.data.circulars.forEach(function (c) {
        var stats = self.circularStats(c);
        pendingAck += Math.max(0, stats.total - stats.acknowledged);
      });
      var recent = this.circulars().length;
      var provinces = this.provinces().map(function (province) {
        var group = people.filter(function (p) {
          return p.province === province;
        });
        var status = "Verified";
        if (group.some(function (p) { return p.status === "Update needed"; })) {
          status = "Update required";
        } else if (group.some(function (p) { return p.status === "Submitted" || p.status === "Checked"; })) {
          status = "Awaiting confirmation";
        } else if (group.every(function (p) { return p.status === "Verified" || p.status === "Maintained"; })) {
          status = "Verified";
        }
        var done = group.filter(function (p) {
          return p.status === "Verified" || p.status === "Maintained";
        }).length;
        return {
          province: province,
          count: group.length,
          verified: done,
          status: status,
        };
      });
      return {
        provinces: 14,
        representatives: people.length,
        verifiedPct: people.length ? Math.round((verifiedLike / people.length) * 100) : 0,
        verifiedCount: verifiedLike,
        outstanding: outstanding,
        recentCommunications: recent,
        pendingAcknowledgements: pendingAck,
        provinceStatus: provinces,
      };
    },

    meetings: function () {
      return (this.data.meetings || []).slice().sort(function (a, b) {
        if (a.date === b.date) return (a.time || "") < (b.time || "") ? 1 : -1;
        return a.date < b.date ? 1 : -1;
      });
    },

    meeting: function (id) {
      return (this.data.meetings || []).find(function (m) {
        return m.id === id;
      }) || null;
    },

    upcomingMeetings: function () {
      var today = todayEatDate();
      return this.meetings().filter(function (m) {
        return m.date >= today;
      }).sort(function (a, b) {
        if (a.date === b.date) return (a.time || "") < (b.time || "") ? -1 : 1;
        return a.date < b.date ? -1 : 1;
      });
    },

    postMeeting: function (fields) {
      var meeting = {
        id: "m" + Date.now().toString(36),
        title: fields.title,
        date: fields.date,
        time: fields.time || "",
        venue: fields.venue || "",
        audience: fields.audience || "All provinces",
        notice: fields.notice || "",
        agenda: fields.agenda || "",
        postedAt: nowIso(),
        author: "Secretary's office",
      };
      this.data.meetings = this.data.meetings || [];
      this.data.meetings.push(meeting);
      this.save();
      return meeting;
    },

    reports: function () {
      return (this.data.reports || []).slice().sort(function (a, b) {
        return a.uploadedAt < b.uploadedAt ? 1 : -1;
      });
    },

    report: function (id) {
      return (this.data.reports || []).find(function (r) {
        return r.id === id;
      }) || null;
    },

    uploadReport: function (fields) {
      var report = {
        id: "rp" + Date.now().toString(36),
        title: fields.title,
        committee: fields.committee,
        period: fields.period || "",
        fileName: fields.fileName,
        notes: fields.notes || "",
        uploadedAt: nowIso(),
        uploadedBy: fields.uploadedBy || "Secretary's office",
        authorPersonId: fields.authorPersonId || "",
      };
      this.data.reports = this.data.reports || [];
      this.data.reports.push(report);
      this.save();
      return report;
    },

    exportCsv: function () {
      var headers = [
        "id", "title", "fullName", "designation", "province", "diocese", "role",
        "committee", "mobile", "whatsapp", "email", "status", "active",
        "lastVerified", "shareContact", "responsibilities",
      ];
      function cell(value) {
        var s = value === true ? "yes" : value === false ? "no" : String(value == null ? "" : value);
        if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
        return s;
      }
      var lines = [headers.join(",")];
      this.data.people.slice().sort(function (a, b) {
        return a.province.localeCompare(b.province) || a.fullName.localeCompare(b.fullName);
      }).forEach(function (p) {
        lines.push(headers.map(function (h) { return cell(p[h]); }).join(","));
      });
      return "\uFEFF" + lines.join("\n");
    },
  };

  global.HOCStore = Store;
})(window);
