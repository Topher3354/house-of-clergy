/* House of Clergy demo UI — no build step, no network calls. */
(function () {
  var Store = window.HOCStore;
  var filters = { q: "", province: "", diocese: "", committee: "", status: "", fromVerified: "", toVerified: "" };
  var toastTimer = null;

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDate(iso) {
    if (!iso) return "—";
    var d = iso.length <= 10 ? new Date(iso + "T12:00:00+03:00") : new Date(iso);
    if (isNaN(d.getTime())) return esc(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Africa/Nairobi",
    });
  }

  function formatDateTime(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return esc(iso);
    return d.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Africa/Nairobi",
    }) + " EAT";
  }

  function displayName(person) {
    return (person.title + " " + person.fullName).replace(/\s+/g, " ").trim();
  }

  function pill(status) {
    var map = {
      "Verified": "pill-verified",
      "Submitted": "pill-submitted",
      "Checked": "pill-checked",
      "Maintained": "pill-maintained",
      "Update needed": "pill-update",
      "Update required": "pill-update",
      "Awaiting confirmation": "pill-awaiting",
      "Complete": "pill-complete",
      "Follow up": "pill-follow",
      "Outstanding": "pill-outstanding",
      "Active": "pill-active",
      "Inactive": "pill-inactive",
    };
    var cls = map[status] || "pill-awaiting";
    return '<span class="pill ' + cls + '">' + esc(status) + "</span>";
  }

  function targetLabel(circular) {
    var t = circular.target || { type: "all" };
    if (t.type === "all") return "All provinces";
    if (t.type === "province") return "Province: " + (t.provinces || []).join(", ");
    if (t.type === "dioceses") return "Dioceses: " + (t.dioceses || []).join(", ");
    if (t.type === "committee") return "Committee: " + t.committee;
    if (t.type === "individuals") {
      var names = (t.ids || []).map(function (id) {
        var p = Store.person(id);
        return p ? displayName(p) : id;
      });
      return "Individuals: " + names.join(", ");
    }
    return "Targeted";
  }

  function route() {
    var hash = (location.hash || "#/").replace(/^#/, "");
    if (hash.charAt(0) !== "/") hash = "/" + hash;
    var parts = hash.split("?")[0].split("/").filter(Boolean);
    return { parts: parts, name: parts[0] || "home", id: parts[1] || "" };
  }

  function go(path) {
    if (location.hash === "#" + path) render();
    else location.hash = path;
  }

  function navItems(role) {
    if (role === "secretary") {
      return [
        ["/", "Dashboard"],
        ["/directory", "Directory"],
        ["/circulars/new", "New circular"],
        ["/circulars", "Tracker"],
        ["/meetings", "Meetings"],
        ["/reports", "Reports"],
        ["/about", "About"],
      ];
    }
    if (role === "verifier") {
      return [
        ["/", "Queue"],
        ["/directory", "Directory"],
        ["/news", "News"],
        ["/meetings", "Meetings"],
        ["/reports", "Reports"],
        ["/about", "About"],
      ];
    }
    return [
      ["/", "My details"],
      ["/news", "News"],
      ["/meetings", "Meetings"],
      ["/reports", "Reports"],
      ["/directory", "Contacts"],
      ["/about", "About"],
    ];
  }

  function isCurrent(href, r) {
    if (href === "/") return r.name === "home" || r.parts.length === 0;
    if (href === "/directory") return r.name === "directory" || r.name === "record";
    if (href === "/news") return r.name === "news";
    if (href === "/circulars") return r.name === "circulars" && r.id !== "new";
    if (href === "/circulars/new") return r.name === "circulars" && r.id === "new";
    if (href === "/meetings") return r.name === "meetings";
    if (href === "/reports") return r.name === "reports";
    if (href === "/about") return r.name === "about";
    return false;
  }

  function options(list, selected, blank) {
    var html = blank != null ? '<option value="">' + esc(blank) + "</option>" : "";
    list.forEach(function (item) {
      var value = typeof item === "string" ? item : item.value;
      var label = typeof item === "string" ? item : item.label;
      html += '<option value="' + esc(value) + '"' + (value === selected ? " selected" : "") + ">" + esc(label) + "</option>";
    });
    return html;
  }

  function toast(message) {
    var region = document.getElementById("toast-region");
    if (!region) return;
    region.innerHTML = '<div class="toast" role="status">' + esc(message) + "</div>";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      region.innerHTML = "";
    }, 4000);
  }

  function shell(mainHtml) {
    var ui = Store.get().ui;
    var r = route();
    var roleOptions = [
      { value: "secretary", label: "Secretary" },
      { value: "verifier", label: "Provincial verifier" },
      { value: "rep", label: "Clergy representative" },
    ];
    var extra = "";
    if (ui.role === "verifier") {
      extra =
        '<div class="field"><label for="verifier-province">Province</label>' +
        '<select id="verifier-province" data-action="switch-verifier-province">' +
        options(Store.provinces(), ui.verifierProvince) +
        "</select></div>";
    }
    if (ui.role === "rep") {
      var reps = Store.people().slice().sort(function (a, b) {
        return a.fullName.localeCompare(b.fullName);
      }).map(function (p) {
        return { value: p.id, label: displayName(p) + " — " + p.province };
      });
      extra =
        '<div class="field"><label for="rep-select">Signed in as</label>' +
        '<select id="rep-select" data-action="switch-rep">' +
        options(reps, ui.repId) +
        "</select></div>";
    }
    var nav = navItems(ui.role).map(function (item) {
      var current = isCurrent(item[0], r);
      return (
        '<a href="#' + item[0] + '"' + (current ? ' aria-current="page"' : "") + ">" +
        esc(item[1]) + "</a>"
      );
    }).join("");

    return (
      '<header class="site-header">' +
        '<div class="header-inner">' +
          '<div class="brand-row">' +
            '<a class="brand" href="#/">' +
              '<span class="brand-mark" aria-hidden="true">HC</span>' +
              '<span class="brand-text">' +
                '<p class="brand-kicker">Church of Nigeria (Anglican Communion)</p>' +
                '<p class="brand-title">House of Clergy</p>' +
                '<p class="brand-sub">National Coordination Directory</p>' +
              "</span>" +
            "</a>" +
            '<p class="demo-badge">Demo, sample data</p>' +
          "</div>" +
          '<div class="toolbar">' +
            '<div class="field"><label for="role-select">Role (demo only)</label>' +
            '<select id="role-select" data-action="switch-role">' +
            options(roleOptions, ui.role) +
            "</select></div>" +
            extra +
            '<button type="button" class="btn btn-quiet" id="reset-demo" data-action="reset">Reset demo</button>' +
          "</div>" +
        "</div>" +
        '<nav class="site-nav" aria-label="Main">' + nav + "</nav>" +
      "</header>" +
      '<main id="main" class="site-main" tabindex="-1">' + mainHtml + "</main>" +
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          "<p>Built as a volunteer project by AYVO, a brand of Trublshut AI Limited.</p>" +
          "<p>Demo only. Fictional sample records. No real clergy data is collected or stored on a server.</p>" +
        "</div>" +
      "</footer>"
    );
  }

  function pageHead(title, lede) {
    return (
      '<header class="page-head">' +
        "<h1>" + esc(title) + "</h1>" +
        (lede ? '<p class="lede">' + lede + "</p>" : "") +
      "</header>" +
      '<p class="demo-note" role="note">Demo, sample data. Dioceses, people and contact details are fictional. Province names are the Church of Nigeria’s 14 ecclesiastical provinces, as listed on the official site in May 2024.</p>'
    );
  }

  function viewDashboard() {
    var d = Store.dashboard();
    var rows = d.provinceStatus.map(function (p) {
      return (
        '<div class="province-status">' +
          "<div><strong>" + esc(p.province) + "</strong> " +
          '<span class="muted small">(' + p.verified + " of " + p.count + " verified)</span></div>" +
          pill(p.status) +
        "</div>"
      );
    }).join("");
    return (
      '<div id="dashboard">' +
        pageHead("Secretary’s dashboard", "A simple view of the national picture, as described in the House of Clergy presentation.") +
        '<div class="grid metrics" aria-label="Summary figures">' +
          metric(d.provinces, "Provinces") +
          metric(d.representatives, "Representatives") +
          metric(d.verifiedPct + "%", "Verified", d.verifiedCount + " of " + d.representatives + " verified or maintained") +
          metric(d.outstanding, "Outstanding updates") +
          metric(d.recentCommunications, "Recent communications") +
          metric(d.pendingAcknowledgements, "Pending acknowledgements") +
        "</div>" +
        '<div class="grid grid-2-wide" style="margin-top:1.25rem">' +
          '<section class="card" aria-labelledby="prov-status-title">' +
            '<h2 id="prov-status-title" class="section-title">Province status</h2>' +
            rows +
          "</section>" +
          '<section class="card" aria-labelledby="dash-actions-title">' +
            '<h2 id="dash-actions-title" class="section-title">Next steps</h2>' +
            '<p class="muted">Use the directory to search and filter records, including by committee. Post a circular, share a meeting notice and agenda, or review committee reports. Export a CSV when the office needs a handover copy.</p>' +
            '<div class="actions">' +
              '<a class="btn" href="#/directory">Open directory</a>' +
              '<a class="btn btn-secondary" href="#/circulars/new">Post a circular</a>' +
              '<a class="btn btn-secondary" href="#/meetings">Meetings</a>' +
              '<a class="btn btn-secondary" href="#/reports">Reports</a>' +
              '<button type="button" class="btn btn-secondary" data-action="export">Export CSV</button>' +
            "</div>" +
          "</section>" +
        "</div>" +
      "</div>"
    );
  }

  function metric(value, label, detail) {
    return (
      '<div class="metric">' +
        '<span class="metric-value">' + esc(String(value)) + "</span>" +
        '<span class="metric-label">' + esc(label) + (detail ? ". " + esc(detail) : "") + "</span>" +
      "</div>"
    );
  }

  function viewQueue() {
    var province = Store.get().ui.verifierProvince;
    var list = Store.queryPeople({ province: province });
    var submitted = list.filter(function (p) { return p.status === "Submitted"; });
    var checked = list.filter(function (p) { return p.status === "Checked"; });
    var returned = list.filter(function (p) { return p.status === "Update needed"; });

    function group(title, items, hint) {
      if (!items.length) {
        return (
          '<section class="card" style="margin-bottom:1rem">' +
            "<h2 class=\"section-title\">" + esc(title) + "</h2>" +
            '<p class="muted">' + esc(hint || "Nothing in this list just now.") + "</p>" +
          "</section>"
        );
      }
      return (
        '<section aria-label="' + esc(title) + '" style="margin-bottom:1rem">' +
          "<h2 class=\"section-title\">" + esc(title) + " (" + items.length + ")</h2>" +
          peopleTable(items, { actions: true, verifier: true }) +
        "</section>"
      );
    }

    return (
      '<div id="queue">' +
        pageHead("Verification queue — " + province, "Check submitted records for this province, then verify them or return them with a note.") +
        group("Submitted — ready to check", submitted) +
        group("Checked — ready to verify or return", checked) +
        group("Returned — update needed", returned, "No records are waiting on an update in this province.") +
      "</div>"
    );
  }

  function peopleTable(items, opts) {
    opts = opts || {};
    if (!items.length) {
      return '<p class="empty">No records match these filters.</p>';
    }
    var showContact = opts.contacts === true;
    var head =
      "<thead><tr>" +
        "<th scope=\"col\">Name</th>" +
        "<th scope=\"col\">Province</th>" +
        "<th scope=\"col\">Diocese</th>" +
        "<th scope=\"col\">Role</th>" +
        (showContact ? '<th scope="col">Contact</th>' : "") +
        '<th scope="col">Status</th>' +
        '<th scope="col">Last verified</th>' +
        (opts.actions ? '<th scope="col">Actions</th>' : "") +
      "</tr></thead>";
    var body = items.map(function (p) {
      var contact = "—";
      if (showContact) {
        if (p.shareContact) {
          contact = esc(p.email) + "<br>" + esc(p.mobile);
        } else {
          contact = '<span class="contact-hidden">Not shared</span>';
        }
      }
      var actions = "";
      if (opts.verifier) {
        if (p.status === "Submitted") {
          actions =
            '<button type="button" class="btn" data-action="check" data-id="' + esc(p.id) + '">Check</button> ' +
            '<button type="button" class="btn btn-secondary" data-action="ask-return" data-id="' + esc(p.id) + '">Return</button>';
        } else if (p.status === "Checked") {
          actions =
            '<button type="button" class="btn" data-action="verify" data-id="' + esc(p.id) + '">Verify</button> ' +
            '<button type="button" class="btn btn-secondary" data-action="ask-return" data-id="' + esc(p.id) + '">Return</button>';
        }
        actions += '<a class="btn btn-secondary" href="#/record/' + esc(p.id) + '">View</a>';
        actions = '<div class="row-actions">' + actions + '</div>';
      }
      return (
        "<tr>" +
          '<td><a href="#/record/' + esc(p.id) + '">' + esc(displayName(p)) + "</a>" +
            '<div class="muted small">' + esc(p.designation || "") +
            (p.committee ? " · " + esc(p.committee) + " committee" : "") +
            "</div></td>" +
          '<td class="cell-nowrap">' + esc(p.province) + "</td>" +
          '<td class="cell-nowrap">' + esc(p.diocese) + "</td>" +
          "<td>" + esc(p.role) + "</td>" +
          (showContact ? "<td>" + contact + "</td>" : "") +
          "<td>" + pill(p.status) + "</td>" +
          "<td>" + formatDate(p.lastVerified) + "</td>" +
          (opts.actions ? "<td>" + actions + "</td>" : "") +
        "</tr>"
      );
    }).join("");
    var min = showContact || opts.actions ? "52rem" : "36rem";
    return (
      '<div class="table-wrap">' +
        '<table class="data" style="min-width:' + min + '">' +
          '<caption class="visually-hidden">Directory records</caption>' +
          head + "<tbody>" + body + "</tbody>" +
        "</table>" +
      "</div>"
    );
  }

  function viewDirectory() {
    var ui = Store.get().ui;
    var isRep = ui.role === "rep";
    var isVerifier = ui.role === "verifier";
    if (isVerifier && !filters.province) filters.province = ui.verifierProvince;
    var list = Store.queryPeople(filters);
    if (isVerifier) {
      list = list.filter(function (p) { return p.province === ui.verifierProvince; });
    }
    var dioceseOpts = Store.dioceses(isVerifier ? ui.verifierProvince : filters.province).map(function (d) {
      return d.name;
    });
    var title = isRep ? "Authorised contact directory" : "National directory";
    var lede = isRep
      ? "You can see a colleague’s email or phone only if they opted to share it. Use the committee filter to find who is serving on a committee."
      : "Search and filter representatives across the 14 provinces, or find the members of a committee.";
    var exportBtn = ui.role === "secretary"
      ? '<button type="button" class="btn btn-secondary" data-action="export">Export CSV</button>'
      : "";

    return (
      '<div id="directory">' +
        pageHead(title, lede) +
        '<form class="filters" id="filter-form" role="search">' +
          '<div class="field"><label for="filter-q">Search</label>' +
          '<input id="filter-q" name="q" type="search" value="' + esc(filters.q) + '" placeholder="Name, diocese, committee, email"></div>' +
          (isVerifier
            ? ""
            : '<div class="field"><label for="filter-province">Province</label>' +
              '<select id="filter-province" name="province">' +
              options(Store.provinces(), filters.province, "All provinces") +
              "</select></div>") +
          '<div class="field"><label for="filter-diocese">Diocese</label>' +
          '<select id="filter-diocese" name="diocese">' +
          options(dioceseOpts, filters.diocese, "All dioceses") +
          "</select></div>" +
          '<div class="field"><label for="filter-committee">Committee</label>' +
          '<select id="filter-committee" name="committee">' +
          options(Store.committees(), filters.committee, "All committees") +
          "</select></div>" +
          '<div class="field"><label for="filter-status">Status</label>' +
          '<select id="filter-status" name="status">' +
          options(["Submitted", "Checked", "Verified", "Maintained", "Update needed"], filters.status, "All statuses") +
          "</select></div>" +
          (isRep
            ? ""
            : '<div class="field field-date"><label for="filter-from">Last verified from</label>' +
              '<input id="filter-from" name="fromVerified" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" value="' + esc(filters.fromVerified) + '"></div>' +
              '<div class="field field-date"><label for="filter-to">Last verified to</label>' +
              '<input id="filter-to" name="toVerified" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" value="' + esc(filters.toVerified) + '"></div>') +
          '<div class="field field-actions"><span class="label" aria-hidden="true">&nbsp;</span>' +
          '<div class="row-actions"><button type="submit" class="btn">Apply filters</button>' +
          exportBtn + "</div></div>" +
        "</form>" +
        '<p class="muted small">' + list.length + " record" + (list.length === 1 ? "" : "s") + " shown.</p>" +
        peopleTable(list, { contacts: isRep, actions: false }) +
      "</div>"
    );
  }

  function viewRecord(id) {
    var person = Store.person(id);
    if (!person) {
      return pageHead("Record not found", "That sample record is not in this demo.") +
        '<p><a href="#/directory">Back to the directory</a></p>';
    }
    var ui = Store.get().ui;
    var isRep = ui.role === "rep";
    var isSelf = isRep && ui.repId === person.id;
    var canSeeContact = !isRep || isSelf || person.shareContact;
    var canAct = ui.role === "secretary" || (ui.role === "verifier" && ui.verifierProvince === person.province);
    var contactBlock = canSeeContact
      ? row("Mobile", person.mobile) + row("WhatsApp", person.whatsapp) + row("Email", person.email)
      : row("Contact", "Not shared by this representative");

    var actions = "";
    if (canAct && !isRep) {
      actions =
        '<div class="actions" id="record-actions">' +
          (person.status === "Submitted"
            ? '<button type="button" class="btn" data-action="check" data-id="' + esc(person.id) + '">Check</button>'
            : "") +
          (person.status === "Checked" || person.status === "Submitted" || person.status === "Update needed"
            ? '<button type="button" class="btn" data-action="verify" data-id="' + esc(person.id) + '">Verify</button>'
            : "") +
          (person.status === "Verified"
            ? '<button type="button" class="btn" data-action="verify" data-id="' + esc(person.id) + '">Mark maintained</button>'
            : "") +
          '<button type="button" class="btn btn-secondary" data-action="ask-return" data-id="' + esc(person.id) + '">Return with a note</button>' +
        "</div>" +
        '<form id="return-form" hidden style="margin-top:1rem">' +
          '<input type="hidden" name="recordId" value="' + esc(person.id) + '">' +
          '<div class="field"><label for="return-note">Note to the representative</label>' +
          '<textarea id="return-note" name="note" required maxlength="500"></textarea></div>' +
          '<div class="actions">' +
            '<button type="submit" class="btn btn-danger" data-action="return" data-id="' + esc(person.id) + '">Return record</button>' +
            '<button type="button" class="btn btn-secondary" data-action="cancel-return">Cancel</button>' +
          "</div>" +
        "</form>";
    }

    var audit = (person.audit || []).slice().reverse().map(function (entry) {
      return (
        "<li>" +
          '<span class="when">' + formatDateTime(entry.at) + " · " + esc(entry.role) + "</span>" +
          "<strong>" + esc(entry.actor) + "</strong> — " + esc(entry.action) +
          (entry.note ? '<div class="muted small">' + esc(entry.note) + "</div>" : "") +
        "</li>"
      );
    }).join("");

    return (
      '<div id="record-detail">' +
        pageHead(displayName(person), esc(person.role) + " · " + esc(person.province)) +
        '<div class="grid grid-2-wide">' +
          '<section class="card">' +
            "<h2 class=\"section-title\">Record</h2>" +
            '<dl class="dl">' +
              row("Title", person.title) +
              row("Full name", person.fullName) +
              row("Clerical designation", person.designation) +
              row("Province", person.province) +
              row("Diocese", person.diocese) +
              row("Role in the House", person.role) +
              row("Committee", person.committee || "—") +
              row("Status", null, pill(person.status)) +
              row("Active", null, pill(person.active ? "Active" : "Inactive")) +
              row("Last verified", formatDate(person.lastVerified)) +
              contactBlock +
              row("Shares contact", person.shareContact ? "Yes" : "No") +
              row("Responsibilities", person.responsibilities || "—") +
            "</dl>" +
            actions +
            (isSelf ? '<p class="actions"><a class="btn btn-secondary" href="#/">Confirm or correct these details</a></p>' : "") +
          "</section>" +
          '<section class="card" aria-labelledby="audit-title">' +
            '<h2 id="audit-title" class="section-title">Audit trail</h2>' +
            '<ol class="audit">' + (audit || "<li>No entries yet.</li>") + "</ol>" +
          "</section>" +
        "</div>" +
        '<p class="actions"><a href="#/directory">Back to the directory</a></p>' +
      "</div>"
    );
  }

  function row(label, value, html) {
    return "<dt>" + esc(label) + "</dt><dd>" + (html != null ? html : esc(value)) + "</dd>";
  }

  function viewConfirm() {
    var person = Store.currentRep();
    var step = Store.get().ui.confirmStep || 1;
    var steps =
      '<ol class="step-list">' +
        '<li' + (step === 1 ? ' aria-current="step"' : "") + ">1. Review</li>" +
        '<li' + (step === 2 ? ' aria-current="step"' : "") + ">2. Correct if needed</li>" +
        '<li' + (step === 3 ? ' aria-current="step"' : "") + ">3. Submit</li>" +
      "</ol>";
    var greeting = "Hello " + esc(displayName(person)) + ", please confirm your details.";
    if (person.confirmRequested) {
      greeting = "The Secretary’s office has asked you to confirm your details. " + greeting;
    }

    if (step === 3) {
      return (
        '<div id="confirm-done">' +
          pageHead("Confirmation submitted", "Thank you. Your record is now marked Submitted and will be checked by the provincial verifier, then verified by the House.") +
          steps +
          '<section class="card"><p>Your details have been sent for checking. You can still read news and use the contact directory.</p>' +
          '<div class="actions"><a class="btn" href="#/news">Go to news</a> <a class="btn btn-secondary" href="#/">View my details</a></div></section>' +
        "</div>"
      );
    }

    if (step === 2) {
      return (
        '<div id="confirm-form-wrap">' +
          pageHead("Correct your details", greeting) +
          steps +
          confirmForm(person) +
        "</div>"
      );
    }

    return (
      '<div id="confirm-review">' +
        pageHead("Confirm your details", greeting) +
        steps +
        '<section class="card review-card">' +
          "<h2>Your current record</h2>" +
          '<dl class="dl">' +
            row("Province", person.province) +
            row("Diocese", person.diocese) +
            row("Role in the House", person.role) +
            row("Committee", person.committee || "—") +
            row("Mobile", person.mobile) +
            row("WhatsApp", person.whatsapp) +
            row("Email", person.email) +
            row("Share email and phone in the directory", person.shareContact ? "Yes" : "No") +
            row("Responsibilities", person.responsibilities || "—") +
            row("Status", null, pill(person.status)) +
          "</dl>" +
          '<div class="actions">' +
            '<button type="button" class="btn" id="confirm-as-shown" data-action="confirm-as-shown">Confirm as shown</button>' +
            '<button type="button" class="btn btn-secondary" id="request-correction" data-action="request-correction">Request a correction</button>' +
          "</div>" +
        "</section>" +
      "</div>"
    );
  }

  function confirmForm(person) {
    var dioceses = Store.dioceses(person.province).map(function (d) { return d.name; });
    return (
      '<form id="confirm-form" class="card">' +
        '<div class="form-grid form-grid-2">' +
          '<div class="field"><label for="f-title">Title</label>' +
          '<select id="f-title" name="title">' +
          options(["Rev.", "Ven.", "Rev. Canon", "Very Rev.", "Rev. Dr", "Canon"], person.title) +
          "</select></div>" +
          '<div class="field"><label for="f-name">Full name</label>' +
          '<input id="f-name" name="fullName" type="text" required value="' + esc(person.fullName) + '"></div>' +
          '<div class="field"><label for="f-desig">Clerical designation</label>' +
          '<input id="f-desig" name="designation" type="text" required list="desig-list" autocomplete="off" value="' + esc(person.designation) + '">' +
          '<datalist id="desig-list">' + options(Store.designations(), person.designation) + "</datalist>" +
          '<p class="help">Choose from the list, or type if the right designation is not there.</p></div>' +
          '<div class="field"><label for="f-role">Role in the House</label>' +
          '<input id="f-role" name="role" type="text" required value="' + esc(person.role) + '">' +
          '<p class="help">This is the House role, for example Clergy Representative, not the clerical designation.</p></div>' +
          '<div class="field"><label for="f-province">Province</label>' +
          '<select id="f-province" name="province" data-action="cascade-diocese">' +
          options(Store.provinces(), person.province) +
          "</select></div>" +
          '<div class="field"><label for="f-diocese">Diocese</label>' +
          '<select id="f-diocese" name="diocese">' +
          options(dioceses, person.diocese) +
          "</select></div>" +
          '<div class="field"><label for="f-committee">Committee</label>' +
          '<select id="f-committee" name="committee">' +
          options(Store.committees(), person.committee, "None") +
          "</select></div>" +
          '<div class="field"><label for="f-mobile">Mobile</label>' +
          '<input id="f-mobile" name="mobile" type="tel" required value="' + esc(person.mobile) + '">' +
          '<p class="help">This demo uses the fictional pattern +234 800 000 00xx.</p></div>' +
          '<div class="field"><label for="f-whatsapp">WhatsApp</label>' +
          '<input id="f-whatsapp" name="whatsapp" type="tel" value="' + esc(person.whatsapp) + '"></div>' +
          '<div class="field"><label for="f-email">Email</label>' +
          '<input id="f-email" name="email" type="email" required value="' + esc(person.email) + '"></div>' +
        "</div>" +
        '<div class="field" style="margin-top:0.85rem"><label for="f-resp">Responsibilities</label>' +
        '<textarea id="f-resp" name="responsibilities">' + esc(person.responsibilities) + "</textarea></div>" +
        '<label class="check"><input type="checkbox" name="shareContact" value="yes"' + (person.shareContact ? " checked" : "") + ">" +
        "<span>Share my email and phone with other signed-in representatives in the contact directory.</span></label>" +
        '<div class="actions">' +
          '<button type="submit" class="btn" id="submit-confirmation">Submit confirmation</button>' +
          '<button type="button" class="btn btn-secondary" data-action="confirm-back">Back to review</button>' +
        "</div>" +
      "</form>"
    );
  }

  function viewNews(id) {
    var ui = Store.get().ui;
    var list;
    if (ui.role === "rep") list = Store.circularsForRep(ui.repId);
    else if (ui.role === "verifier") {
      list = Store.circulars().filter(function (c) {
        return Store.recipientsFor(c).some(function (p) { return p.province === ui.verifierProvince; });
      });
    } else {
      list = Store.circulars();
    }

    if (id) {
      var circular = Store.circular(id);
      if (!circular) {
        return pageHead("Circular not found") + '<p><a href="#/news">Back to news</a></p>';
      }
      if (ui.role === "rep") Store.markReceived(id, ui.repId);
      var stats = Store.circularStats(circular);
      var acked = ui.role === "rep" && circular.acknowledged && circular.acknowledged[ui.repId];
      var ackBtn = "";
      if (ui.role === "rep") {
        ackBtn = acked
          ? '<p class="muted">You acknowledged this circular on ' + formatDateTime(circular.acknowledged[ui.repId]) + ".</p>"
          : '<div class="actions"><button type="button" class="btn" id="ack-btn" data-action="acknowledge" data-id="' + esc(circular.id) + '">Acknowledge</button></div>';
      }
      return (
        '<div id="circular-detail">' +
          pageHead(circular.title, esc(targetLabel(circular)) + " · Posted " + formatDateTime(circular.postedAt) + " by " + esc(circular.author)) +
          '<article class="card prose">' +
            circular.body.split(/\n\n/).map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("") +
          "</article>" +
          ackBtn +
          (ui.role === "secretary" ? '<p class="muted small" style="margin-top:1rem">' + stats.received + " of " + stats.total + " received, " + stats.acknowledged + " acknowledged. " + pill(stats.status) + '</p><p><a href="#/circulars">Open the tracker</a></p>' : "") +
          '<p class="actions"><a href="#/news">Back to news</a></p>' +
        "</div>"
      );
    }

    var items = list.map(function (c) {
      var acked = ui.role === "rep" && c.acknowledged && c.acknowledged[ui.repId];
      var received = ui.role === "rep" && c.received && c.received[ui.repId];
      var state = acked ? "Acknowledged" : received ? "Received" : "Not yet opened";
      return (
        '<article class="card news-item" style="margin-bottom:0.85rem">' +
          "<h2><a href=\"#/news/" + esc(c.id) + '">' + esc(c.title) + "</a></h2>" +
          '<p class="news-meta">' + formatDateTime(c.postedAt) + " · " + esc(targetLabel(c)) +
          (ui.role === "rep" ? " · " + esc(state) : "") + "</p>" +
          '<p class="muted">' + esc(c.body.split(/\n\n/)[0]) + "</p>" +
          (ui.role === "rep" && !acked
            ? '<div class="actions"><a class="btn btn-secondary" href="#/news/' + esc(c.id) + '">Read and acknowledge</a></div>'
            : "") +
        "</article>"
      );
    }).join("");

    var upcoming = Store.upcomingMeetings().slice(0, 3).map(function (m) {
      return (
        '<li><a href="#/meetings/' + esc(m.id) + '">' + esc(m.title) + "</a>" +
        '<span class="muted"> — ' + esc(formatDate(m.date)) +
        (m.time ? ", " + esc(m.time) : "") +
        "</span></li>"
      );
    }).join("");
    var meetingsCard = upcoming
      ? '<section class="card" style="margin-bottom:1rem" aria-labelledby="upcoming-meetings-title">' +
        '<h2 id="upcoming-meetings-title" class="section-title">Upcoming meetings</h2>' +
        '<ul class="plain-list">' + upcoming + '</ul>' +
        '<p><a href="#/meetings">Open the meetings calendar</a></p>' +
        "</section>"
      : "";

    return (
      '<div id="news-feed">' +
        pageHead("News and circulars", "Official information from the House, shown only to the people it was sent to. Meeting notices and agendas are also on the Meetings page.") +
        meetingsCard +
        (items || '<p class="empty">There are no circulars for you in this demo just now.</p>') +
      "</div>"
    );
  }

  function viewNewCircular() {
    var peopleOpts = Store.people().slice().sort(function (a, b) {
      return a.fullName.localeCompare(b.fullName);
    });
    var dioceseBoxes = Store.get().dioceses.map(function (d) {
      return '<label class="check"><input type="checkbox" name="dioceses" value="' + esc(d.name) + '"><span>' + esc(d.name) + " (" + esc(d.province) + ")</span></label>";
    }).join("");
    var provinceBoxes = Store.provinces().map(function (p) {
      return '<label class="check"><input type="checkbox" name="provinces" value="' + esc(p) + '"><span>' + esc(p) + "</span></label>";
    }).join("");
    var peopleBoxes = peopleOpts.map(function (p) {
      return '<label class="check"><input type="checkbox" name="individuals" value="' + esc(p.id) + '"><span>' + esc(displayName(p)) + " — " + esc(p.diocese) + "</span></label>";
    }).join("");

    return (
      '<div id="new-circular">' +
        pageHead("Post a circular", "Send official information to all provinces, one province, selected dioceses, a committee, or named representatives.") +
        '<form id="circular-form" class="card">' +
          '<div class="field"><label for="c-title">Title</label>' +
          '<input id="c-title" name="title" type="text" required maxlength="160"></div>' +
          '<div class="field" style="margin-top:0.85rem"><label for="c-body">Message</label>' +
          '<textarea id="c-body" name="body" required maxlength="4000"></textarea></div>' +
          '<fieldset style="margin-top:1rem;border:0;padding:0">' +
            "<legend class=\"label\">Audience</legend>" +
            '<label class="check"><input type="radio" name="targetType" value="all" checked data-action="toggle-target"> <span>All provinces</span></label>' +
            '<label class="check"><input type="radio" name="targetType" value="province" data-action="toggle-target"> <span>One or more provinces</span></label>' +
            '<label class="check"><input type="radio" name="targetType" value="dioceses" data-action="toggle-target"> <span>Specific dioceses</span></label>' +
            '<label class="check"><input type="radio" name="targetType" value="committee" data-action="toggle-target"> <span>A committee</span></label>' +
            '<label class="check"><input type="radio" name="targetType" value="individuals" data-action="toggle-target"> <span>Specific representatives</span></label>' +
          "</fieldset>" +
          '<div id="target-province" hidden class="card" style="box-shadow:none;margin-top:0.75rem"><p class="label">Provinces</p>' + provinceBoxes + "</div>" +
          '<div id="target-dioceses" hidden class="card" style="box-shadow:none;margin-top:0.75rem"><p class="label">Dioceses</p>' + dioceseBoxes + "</div>" +
          '<div id="target-committee" hidden class="field" style="margin-top:0.75rem"><label for="c-committee">Committee</label>' +
          '<select id="c-committee" name="committee">' + options(Store.committees(), "") + "</select></div>" +
          '<div id="target-individuals" hidden class="card" style="box-shadow:none;margin-top:0.75rem"><p class="label">Representatives</p>' + peopleBoxes + "</div>" +
          '<p class="help" id="recipient-count" style="margin-top:0.75rem"></p>' +
          '<div class="actions"><button type="submit" class="btn" id="post-circular">Post circular</button></div>' +
        "</form>" +
      "</div>"
    );
  }

  function viewTracker() {
    var circulars = Store.circulars();
    var blocks = circulars.map(function (c) {
      var stats = Store.circularStats(c);
      var rows = Store.provinceTracker(c).map(function (row) {
        return (
          "<tr>" +
            "<td>" + esc(row.province) + "</td>" +
            "<td>" + row.received + " of " + row.total + "</td>" +
            "<td>" + row.acknowledged + " of " + row.total + "</td>" +
            "<td>" + pill(row.status) + "</td>" +
          "</tr>"
        );
      }).join("");
      return (
        '<section class="card" style="margin-bottom:1rem" aria-labelledby="t-' + esc(c.id) + '">' +
          "<h2 id=\"t-" + esc(c.id) + "\" class=\"section-title\"><a href=\"#/news/" + esc(c.id) + '\">' + esc(c.title) + "</a></h2>" +
          '<p class="news-meta">' + formatDateTime(c.postedAt) + " · " + esc(targetLabel(c)) + " · " +
          stats.acknowledged + " of " + stats.total + " acknowledged · " + pill(stats.status) + "</p>" +
          '<div class="table-wrap">' +
            '<table class="data" style="min-width:30rem">' +
              "<thead><tr><th scope=\"col\">Province</th><th scope=\"col\">Received</th><th scope=\"col\">Acknowledged</th><th scope=\"col\">Status</th></tr></thead>" +
              "<tbody>" + (rows || '<tr><td colspan="4">No recipients.</td></tr>') + "</tbody>" +
            "</table>" +
          "</div>" +
        "</section>"
      );
    }).join("");

    return (
      '<div id="tracker">' +
        pageHead("Circular tracker", "Knowing that information was sent is not always enough. This view shows who has received and acknowledged each circular.") +
        (blocks || '<p class="empty">No circulars have been posted in this demo yet.</p>') +
        '<div class="actions"><a class="btn" href="#/circulars/new">Post a circular</a></div>' +
      "</div>"
    );
  }


  function audienceLabel(value) {
    if (!value || value === "All provinces") return "All provinces";
    return "Committee: " + value;
  }

  function viewMeetings(id) {
    var ui = Store.get().ui;
    if (id === "new") {
      if (ui.role !== "secretary") {
        return pageHead("Secretary only", "Posting a meeting notice is a Secretary’s task in this demo.") +
          '<p><a href="#/meetings">Back to meetings</a></p>';
      }
      var audienceOpts = ["All provinces"].concat(Store.committees());
      return (
        '<div id="new-meeting">' +
          pageHead("Post a meeting notice", "Share a date, notice and agenda so representatives can get what they need from the Secretariat.") +
          '<form id="meeting-form" class="card">' +
            '<div class="form-grid form-grid-2">' +
              '<div class="field"><label for="m-title">Title</label>' +
              '<input id="m-title" name="title" type="text" required maxlength="160"></div>' +
              '<div class="field"><label for="m-audience">Audience</label>' +
              '<select id="m-audience" name="audience">' + options(audienceOpts, "All provinces") + "</select></div>" +
              '<div class="field"><label for="m-date">Date</label>' +
              '<input id="m-date" name="date" type="text" required inputmode="numeric" placeholder="YYYY-MM-DD"></div>' +
              '<div class="field"><label for="m-time">Time</label>' +
              '<input id="m-time" name="time" type="text" placeholder="10:00"></div>' +
              '<div class="field" style="grid-column:1/-1"><label for="m-venue">Venue</label>' +
              '<input id="m-venue" name="venue" type="text" maxlength="160"></div>' +
            "</div>" +
            '<div class="field" style="margin-top:0.85rem"><label for="m-notice">Notice</label>' +
            '<textarea id="m-notice" name="notice" required maxlength="4000"></textarea></div>' +
            '<div class="field" style="margin-top:0.85rem"><label for="m-agenda">Agenda</label>' +
            '<textarea id="m-agenda" name="agenda" maxlength="4000" placeholder="1. Opening prayers"></textarea></div>' +
            '<div class="actions">' +
              '<button type="submit" class="btn">Post meeting notice</button>' +
              '<a class="btn btn-secondary" href="#/meetings">Cancel</a>' +
            "</div>" +
            '<p class="help">This is a demo. The notice stays in this browser only and is not sent to anyone.</p>' +
          "</form>" +
        "</div>"
      );
    }
    if (id) {
      var meeting = Store.meeting(id);
      if (!meeting) {
        return pageHead("Meeting not found") + '<p><a href="#/meetings">Back to meetings</a></p>';
      }
      var agenda = (meeting.agenda || "").split(/\n/).filter(Boolean).map(function (line) {
        return "<li>" + esc(line.replace(/^\d+\.\s*/, "")) + "</li>";
      }).join("");
      return (
        '<div id="meeting-detail">' +
          pageHead(meeting.title, audienceLabel(meeting.audience) + " · Posted " + formatDateTime(meeting.postedAt) + " by " + esc(meeting.author)) +
          '<article class="card prose">' +
            "<p><strong>Date:</strong> " + esc(formatDate(meeting.date)) +
            (meeting.time ? " at " + esc(meeting.time) : "") + "</p>" +
            (meeting.venue ? "<p><strong>Venue:</strong> " + esc(meeting.venue) + "</p>" : "") +
            (meeting.notice || "").split(/\n\n/).map(function (para) { return "<p>" + esc(para) + "</p>"; }).join("") +
            (agenda ? '<h2 class="section-title">Agenda</h2><ol class="agenda-list">' + agenda + "</ol>" : "") +
          "</article>" +
          '<p class="actions"><a href="#/meetings">Back to meetings</a></p>' +
        "</div>"
      );
    }
    var items = Store.meetings().map(function (m) {
      return (
        '<article class="card news-item" style="margin-bottom:0.85rem">' +
          "<h2><a href=\"#/meetings/" + esc(m.id) + '">' + esc(m.title) + "</a></h2>" +
          '<p class="news-meta">' + esc(formatDate(m.date)) +
          (m.time ? ", " + esc(m.time) : "") +
          " · " + esc(audienceLabel(m.audience)) +
          (m.venue ? " · " + esc(m.venue) : "") + "</p>" +
          '<p class="muted">' + esc((m.notice || "").split(/\n\n/)[0]) + "</p>" +
        "</article>"
      );
    }).join("");
    var postBtn = ui.role === "secretary"
      ? '<div class="actions"><a class="btn" href="#/meetings/new">Post a meeting notice</a></div>'
      : "";
    return (
      '<div id="meetings">' +
        pageHead("Meetings calendar", "Notices and agendas from the Secretariat, so clergy can see the next meeting and what will be discussed. Sample data only.") +
        postBtn +
        (items || '<p class="empty">No meeting notices have been posted in this demo yet.</p>') +
      "</div>"
    );
  }

  function viewReports(showForm) {
    var ui = Store.get().ui;
    var person = ui.role === "rep" ? Store.currentRep() : null;
    var canUpload = ui.role === "secretary" || (person && person.committee);
    var list = Store.reports();
    if (ui.role === "rep" && person && person.committee && !showForm) {
      /* still show all sample reports, so the Secretary can demonstrate the House view */
    }
    var items = list.map(function (r) {
      return (
        '<article class="card news-item" style="margin-bottom:0.85rem">' +
          "<h2>" + esc(r.title) + "</h2>" +
          '<p class="news-meta">' + esc(r.committee) + " committee" +
          (r.period ? " · " + esc(r.period) : "") +
          " · Uploaded " + formatDateTime(r.uploadedAt) +
          " by " + esc(r.uploadedBy) + "</p>" +
          '<p class="muted">File (sample name only): ' + esc(r.fileName) + "</p>" +
          (r.notes ? '<p class="muted">' + esc(r.notes) + "</p>" : "") +
        "</article>"
      );
    }).join("");

    var form = "";
    if (canUpload) {
      var committees = ui.role === "rep" && person.committee
        ? [person.committee]
        : Store.committees();
      form =
        '<form id="report-form" class="card" style="margin-bottom:1.25rem">' +
          "<h2 class=\"section-title\">Upload a committee report</h2>" +
          '<p class="help">This demo stores only the file name in this browser. No file is sent to a server.</p>' +
          '<div class="form-grid form-grid-2">' +
            '<div class="field"><label for="rp-title">Title</label>' +
            '<input id="rp-title" name="title" type="text" required maxlength="160"></div>' +
            '<div class="field"><label for="rp-committee">Committee</label>' +
            '<select id="rp-committee" name="committee">' + options(committees, person && person.committee || "") + "</select></div>" +
            '<div class="field"><label for="rp-period">Period</label>' +
            '<input id="rp-period" name="period" type="text" placeholder="July–September 2026"></div>' +
            '<div class="field"><label for="rp-file">File (demo: name only)</label>' +
            '<input id="rp-file" name="file" type="file"></div>' +
          "</div>" +
          '<div class="field" style="margin-top:0.85rem"><label for="rp-notes">Note</label>' +
          '<textarea id="rp-notes" name="notes" maxlength="1000"></textarea></div>' +
          '<div class="actions"><button type="submit" class="btn">Upload report</button></div>' +
        "</form>";
    } else if (ui.role === "rep") {
      form = '<p class="muted">In this demo, a representative can upload a report when their record lists a committee.</p>';
    }

    return (
      '<div id="reports">' +
        pageHead("Committee reports", "A place for committees to send reports to the Secretariat. Sample data only; uploads stay in this browser.") +
        form +
        "<h2 class=\"section-title\">Reports on file</h2>" +
        (items || '<p class="empty">No committee reports have been uploaded in this demo yet.</p>') +
      "</div>"
    );
  }

  function viewAbout() {
    return (
      '<div id="about" class="prose">' +
        pageHead("About this demo", "A clickable model of a national coordination directory for the House of Clergy.") +
        "<p>This demo lets the Secretary’s office, provincial verifiers and clergy representatives try the main flows: keeping one record per person, checking and verifying details, reading news and circulars, finding committee members, seeing meeting notices and agendas, and uploading a sample committee report.</p>" +
        "<p>Every person, diocese, phone number and email you see here is fictional and labelled <strong>Demo, sample data</strong>. Phone numbers follow the obviously fake pattern +234 800 000 00xx. Nothing is sent to a server. Changes stay in this browser only, in local storage, until you choose Reset demo.</p>" +
        "<p>The 14 province names are the ecclesiastical provinces of the Church of Nigeria (Anglican Communion), as listed on the official Church site on 29 May 2024. The dioceses in this demo are invented and are not a list of real dioceses.</p>" +
        "<p>A live version would add secure logins and a protected database, and could notify people when a notice or report arrives. Clergy personal data would not sit in a public website folder or a static file. This demo does not collect real data and should not be used with real names or real telephone numbers. Uploaded “files” in the demo are names only.</p>" +
        "<p>The work was prepared as a volunteer project for the Secretary of the House of Clergy. The site footer records that it was built as a volunteer project by AYVO, a brand of Trublshut AI Limited.</p>" +
      "</div>"
    );
  }

  function render() {
    var root = document.getElementById("app");
    var ui = Store.get().ui;
    var r = route();
    var view = "";

    if (r.name === "about") {
      view = viewAbout();
    } else if (r.name === "record") {
      view = viewRecord(r.id);
    } else if (r.name === "directory") {
      view = viewDirectory();
    } else if (r.name === "news") {
      view = viewNews(r.id);
    } else if (r.name === "circulars" && r.id === "new") {
      if (ui.role !== "secretary") {
        view = pageHead("Secretary only", "Posting circulars is a Secretary’s task in this demo.") +
          '<p><a href="#/">Go to your home</a></p>';
      } else view = viewNewCircular();
    } else if (r.name === "circulars") {
      if (ui.role !== "secretary") {
        view = pageHead("Secretary only", "The circular tracker is a Secretary’s view in this demo.") +
          '<p><a href="#/news">Open news</a></p>';
      } else view = viewTracker();
    } else if (r.name === "meetings") {
      view = viewMeetings(r.id);
    } else if (r.name === "reports") {
      view = viewReports();
    } else if (ui.role === "secretary") {
      view = viewDashboard();
    } else if (ui.role === "verifier") {
      view = viewQueue();
    } else {
      if (r.name === "confirm") Store.setUI({ confirmStep: 1 });
      view = viewConfirm();
    }

    root.innerHTML = shell(view);
    document.title = document.querySelector(".page-head h1")
      ? document.querySelector(".page-head h1").textContent + " — House of Clergy (Demo)"
      : "House of Clergy — National Coordination Directory (Demo)";
    updateRecipientCount();
  }

  function readFilters(form) {
    var data = new FormData(form);
    filters.q = data.get("q") || "";
    filters.province = data.get("province") || "";
    filters.diocese = data.get("diocese") || "";
    filters.committee = data.get("committee") || "";
    filters.status = data.get("status") || "";
    filters.fromVerified = data.get("fromVerified") || "";
    filters.toVerified = data.get("toVerified") || "";
  }

  function cascadeDiocese(select) {
    var province = select.value;
    var dioceseSelect = document.getElementById("f-diocese");
    if (!dioceseSelect) return;
    var current = dioceseSelect.value;
    var list = Store.dioceses(province).map(function (d) { return d.name; });
    dioceseSelect.innerHTML = options(list, list.indexOf(current) !== -1 ? current : list[0] || "");
  }

  function toggleTarget() {
    var form = document.getElementById("circular-form");
    if (!form) return;
    var type = (form.querySelector('input[name="targetType"]:checked') || {}).value || "all";
    document.getElementById("target-province").hidden = type !== "province";
    document.getElementById("target-dioceses").hidden = type !== "dioceses";
    document.getElementById("target-committee").hidden = type !== "committee";
    document.getElementById("target-individuals").hidden = type !== "individuals";
    updateRecipientCount();
  }

  function updateRecipientCount() {
    var form = document.getElementById("circular-form");
    var out = document.getElementById("recipient-count");
    if (!form || !out) return;
    var target = readTarget(form);
    if (!target) {
      out.textContent = "Choose at least one recipient.";
      return;
    }
    var n = Store.recipientsFor({ target: target }).length;
    out.textContent = n + " representative" + (n === 1 ? "" : "s") + " would receive this circular.";
  }

  function readTarget(form) {
    var type = (form.querySelector('input[name="targetType"]:checked') || {}).value || "all";
    if (type === "all") return { type: "all" };
    if (type === "province") {
      var provinces = checkedValues(form, "provinces");
      if (!provinces.length) return null;
      return { type: "province", provinces: provinces };
    }
    if (type === "dioceses") {
      var dioceses = checkedValues(form, "dioceses");
      if (!dioceses.length) return null;
      return { type: "dioceses", dioceses: dioceses };
    }
    if (type === "committee") {
      return { type: "committee", committee: form.committee.value };
    }
    if (type === "individuals") {
      var ids = checkedValues(form, "individuals");
      if (!ids.length) return null;
      return { type: "individuals", ids: ids };
    }
    return { type: "all" };
  }

  function checkedValues(form, name) {
    return Array.prototype.map.call(form.querySelectorAll('input[name="' + name + '"]:checked'), function (el) {
      return el.value;
    });
  }

  function exportCsv() {
    var blob = new Blob([Store.exportCsv()], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "house-of-clergy-directory-demo.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    toast("Directory exported as CSV. Sample data only.");
  }

  function askReturn(id) {
    var form = document.getElementById("return-form");
    if (form) {
      form.hidden = false;
      var note = document.getElementById("return-note");
      if (note) note.focus();
      return;
    }
    var noteText = window.prompt("Note to the representative (required):");
    if (noteText == null) return;
    if (!String(noteText).trim()) {
      toast("A note is required when you return a record.");
      return;
    }
    Store.returnPerson(id, String(noteText).trim());
    toast("Record returned for an update.");
    render();
  }

  function onSubmit(event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.id === "filter-form") {
      event.preventDefault();
      readFilters(form);
      render();
      return;
    }
    if (form.id === "confirm-form") {
      event.preventDefault();
      var data = new FormData(form);
      Store.submitConfirmation(Store.get().ui.repId, {
        title: data.get("title"),
        fullName: data.get("fullName"),
        designation: data.get("designation"),
        role: data.get("role"),
        province: data.get("province"),
        diocese: data.get("diocese"),
        committee: data.get("committee") || "",
        mobile: data.get("mobile"),
        whatsapp: data.get("whatsapp"),
        email: data.get("email"),
        responsibilities: data.get("responsibilities") || "",
        shareContact: form.shareContact.checked,
      });
      Store.setUI({ confirmStep: 3 });
      toast("Confirmation submitted. The record is now Submitted.");
      render();
      return;
    }
    if (form.id === "return-form") {
      event.preventDefault();
      var note = String(form.note.value || "").trim();
      if (!note) {
        toast("A note is required when you return a record.");
        return;
      }
      var recordId = form.elements.namedItem("recordId").value;
      Store.returnPerson(recordId, note);
      toast("Record returned for an update.");
      render();
      return;
    }
    if (form.id === "circular-form") {
      event.preventDefault();
      var target = readTarget(form);
      if (!target) {
        toast("Choose at least one recipient.");
        return;
      }
      var posted = Store.postCircular({
        title: String(form.title.value).trim(),
        body: String(form.body.value).trim(),
        target: target,
      });
      toast("Circular posted to " + Store.recipientsFor(posted).length + " representatives.");
      go("/circulars");
      return;
    }
    if (form.id === "meeting-form") {
      event.preventDefault();
      var date = String(form.date.value || "").trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        toast("Please enter the date as YYYY-MM-DD.");
        return;
      }
      var meeting = Store.postMeeting({
        title: String(form.title.value).trim(),
        date: date,
        time: String(form.time.value || "").trim(),
        venue: String(form.venue.value || "").trim(),
        audience: String(form.audience.value || "All provinces"),
        notice: String(form.notice.value || "").trim(),
        agenda: String(form.agenda.value || "").trim(),
      });
      toast("Meeting notice posted. Sample data only.");
      go("/meetings/" + meeting.id);
      return;
    }
    if (form.id === "report-form") {
      event.preventDefault();
      var fileInput = form.elements.namedItem("file");
      var fileName = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0].name : "";
      if (!fileName) {
        toast("Choose a sample file. This demo keeps only the file name in this browser.");
        return;
      }
      var ui = Store.get().ui;
      var uploader = "Secretary's office";
      var authorId = "";
      if (ui.role === "rep") {
        var rep = Store.currentRep();
        uploader = displayName(rep);
        authorId = rep.id;
      }
      Store.uploadReport({
        title: String(form.title.value).trim(),
        committee: String(form.committee.value).trim(),
        period: String(form.period.value || "").trim(),
        fileName: fileName,
        notes: String(form.notes.value || "").trim(),
        uploadedBy: uploader,
        authorPersonId: authorId,
      });
      toast("Report recorded in this browser. The file itself was not uploaded.");
      form.reset();
      render();
      return;
    }
  }

  function onChange(event) {
    var el = event.target;
    if (el.id === "role-select" || el.getAttribute("data-action") === "switch-role") {
      var next = el.value;
      var ui = { role: next, confirmStep: 1 };
      if (next === "verifier") ui.verifierProvince = Store.get().ui.verifierProvince || "Lagos Province";
      Store.setUI(ui);
      filters = { q: "", province: next === "verifier" ? Store.get().ui.verifierProvince : "", diocese: "", committee: "", status: "", fromVerified: "", toVerified: "" };
      go("/");
      return;
    }
    if (el.getAttribute("data-action") === "switch-rep" || el.id === "rep-select") {
      Store.setUI({ repId: el.value, confirmStep: 1 });
      render();
      return;
    }
    if (el.getAttribute("data-action") === "switch-verifier-province" || el.id === "verifier-province") {
      Store.setUI({ verifierProvince: el.value });
      filters.province = el.value;
      filters.diocese = "";
      render();
      return;
    }
    if (el.getAttribute("data-action") === "cascade-diocese") {
      cascadeDiocese(el);
      return;
    }
    if (el.getAttribute("data-action") === "toggle-target" || (el.form && el.form.id === "circular-form")) {
      if (el.name === "targetType") toggleTarget();
      else updateRecipientCount();
    }
  }

  function onClick(event) {
    var btn = event.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    var id = btn.getAttribute("data-id");
    if (action === "reset") {
      if (window.confirm("Reset the demo? This clears changes in this browser and restores the fictional sample data.")) {
        Store.reset();
        filters = { q: "", province: "", diocese: "", committee: "", status: "", fromVerified: "", toVerified: "" };
        toast("Demo reset to the sample data.");
        go("/");
      }
      return;
    }
    if (action === "export") {
      exportCsv();
      return;
    }
    if (action === "request-correction") {
      Store.setUI({ confirmStep: 2 });
      render();
      return;
    }
    if (action === "confirm-back") {
      Store.setUI({ confirmStep: 1 });
      render();
      return;
    }
    if (action === "confirm-as-shown") {
      var person = Store.currentRep();
      Store.submitConfirmation(person.id, {
        title: person.title,
        fullName: person.fullName,
        designation: person.designation,
        role: person.role,
        province: person.province,
        diocese: person.diocese,
        committee: person.committee,
        mobile: person.mobile,
        whatsapp: person.whatsapp,
        email: person.email,
        responsibilities: person.responsibilities,
        shareContact: person.shareContact,
      });
      Store.setUI({ confirmStep: 3 });
      toast("Confirmation submitted. The record is now Submitted.");
      render();
      return;
    }
    if (action === "check") {
      Store.checkPerson(id, "");
      toast("Record marked as Checked.");
      render();
      return;
    }
    if (action === "verify") {
      Store.verifyPerson(id, "");
      toast("Record verified.");
      render();
      return;
    }
    if (action === "ask-return") {
      askReturn(id);
      return;
    }
    if (action === "return") {
      event.preventDefault();
      var form = btn.closest("form");
      var noteEl = form ? form.elements.namedItem("note") : null;
      var idEl = form ? form.elements.namedItem("recordId") : null;
      var note = noteEl ? String(noteEl.value || "").trim() : "";
      var recordId = (idEl && idEl.value) || id;
      if (!note) {
        toast("A note is required when you return a record.");
        return;
      }
      Store.returnPerson(recordId, note);
      toast("Record returned for an update.");
      render();
      return;
    }
    if (action === "cancel-return") {
      var form = document.getElementById("return-form");
      if (form) form.hidden = true;
      return;
    }
    if (action === "acknowledge") {
      Store.acknowledge(id, Store.get().ui.repId);
      toast("Circular acknowledged.");
      render();
      return;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    Store.init();
    render();
  });
  window.addEventListener("hashchange", render);
  document.addEventListener("click", onClick);
  document.addEventListener("submit", onSubmit);
  document.addEventListener("change", onChange);
})();
