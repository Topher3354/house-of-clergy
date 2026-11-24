/* Seed data for the House of Clergy demo.
   Province names are the 14 ecclesiastical provinces listed on the
   official Church of Nigeria site on 29 May 2024:
   https://anglican-nig.org/50-things-to-know-about-the-church-of-nigeria-anglican-communion/
   Dioceses, people, phone numbers, emails and circulars are fictional.
   Phone numbers use the obviously fake pattern +234 800 000 00xx.
*/
window.HOC_SEED = {
  version: 2,
  generatedAt: "2026-11-24T13:00:00+03:00",
  provinces: [
  "Aba Province",
  "Abuja Province",
  "Bendel Province",
  "Enugu Province",
  "Ibadan Province",
  "Jos Province",
  "Kaduna Province",
  "Kwara Province",
  "Lagos Province",
  "Lokoja Province",
  "Niger Delta Province",
  "Niger Province",
  "Ondo Province",
  "Owerri Province"
],
  committees: [
  "House Business",
  "Education",
  "Liturgy",
  "Mission",
  "Youth"
],
  dioceses: [
  {
    "id": "d01",
    "name": "Cedar Hill",
    "province": "Aba Province"
  },
  {
    "id": "d02",
    "name": "Newmarch",
    "province": "Aba Province"
  },
  {
    "id": "d03",
    "name": "Greenfield",
    "province": "Abuja Province"
  },
  {
    "id": "d04",
    "name": "Lakeside",
    "province": "Abuja Province"
  },
  {
    "id": "d05",
    "name": "Ironwood",
    "province": "Bendel Province"
  },
  {
    "id": "d06",
    "name": "Southridge",
    "province": "Bendel Province"
  },
  {
    "id": "d07",
    "name": "Amberley",
    "province": "Enugu Province"
  },
  {
    "id": "d08",
    "name": "Hillcrest",
    "province": "Enugu Province"
  },
  {
    "id": "d09",
    "name": "Orchard Gate",
    "province": "Ibadan Province"
  },
  {
    "id": "d10",
    "name": "Whitecroft",
    "province": "Ibadan Province"
  },
  {
    "id": "d11",
    "name": "Coldspring",
    "province": "Jos Province"
  },
  {
    "id": "d12",
    "name": "Ridgeway",
    "province": "Jos Province"
  },
  {
    "id": "d13",
    "name": "Highgate",
    "province": "Kaduna Province"
  },
  {
    "id": "d14",
    "name": "Northvale",
    "province": "Kaduna Province"
  },
  {
    "id": "d15",
    "name": "Eastbrook",
    "province": "Kwara Province"
  },
  {
    "id": "d16",
    "name": "Fairmead",
    "province": "Kwara Province"
  },
  {
    "id": "d17",
    "name": "Harbour Light",
    "province": "Lagos Province"
  },
  {
    "id": "d18",
    "name": "Westmead",
    "province": "Lagos Province"
  },
  {
    "id": "d19",
    "name": "Riverbend",
    "province": "Lokoja Province"
  },
  {
    "id": "d20",
    "name": "Stonebridge",
    "province": "Lokoja Province"
  },
  {
    "id": "d21",
    "name": "Palmgrove",
    "province": "Niger Delta Province"
  },
  {
    "id": "d22",
    "name": "Tidemark",
    "province": "Niger Delta Province"
  },
  {
    "id": "d23",
    "name": "Silverstream",
    "province": "Niger Province"
  },
  {
    "id": "d24",
    "name": "Fieldmere",
    "province": "Niger Province"
  },
  {
    "id": "d25",
    "name": "Coralwood",
    "province": "Ondo Province"
  },
  {
    "id": "d26",
    "name": "Meridian",
    "province": "Ondo Province"
  },
  {
    "id": "d27",
    "name": "Ashbourne",
    "province": "Owerri Province"
  },
  {
    "id": "d28",
    "name": "Brookfield",
    "province": "Owerri Province"
  }
],
  people: [
  {
    "id": "r01",
    "title": "Rev.",
    "fullName": "Amara Okoro",
    "designation": "Priest",
    "province": "Aba Province",
    "diocese": "Cedar Hill",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0001",
    "whatsapp": "+234 800 000 0001",
    "email": "amara.okoro@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-12",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Represents Cedar Hill on House business.",
    "audit": [
      {
        "at": "2026-09-12T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r02",
    "title": "Ven.",
    "fullName": "Chinedu Nwosu",
    "designation": "Archdeacon",
    "province": "Aba Province",
    "diocese": "Newmarch",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0002",
    "whatsapp": "+234 800 000 0002",
    "email": "chinedu.nwosu@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-06-18",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Provincial liaison for Newmarch.",
    "audit": [
      {
        "at": "2026-06-18T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r03",
    "title": "Rev. Canon",
    "fullName": "Ngozi Eze",
    "designation": "Canon",
    "province": "Aba Province",
    "diocese": "Cedar Hill",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0003",
    "whatsapp": "+234 800 000 0003",
    "email": "ngozi.eze@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-02-04",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Cedar Hill.",
    "audit": [
      {
        "at": "2026-02-04T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r04",
    "title": "Very Rev.",
    "fullName": "Ifeanyi Okafor",
    "designation": "Provost",
    "province": "Aba Province",
    "diocese": "Newmarch",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0004",
    "whatsapp": "+234 800 000 0004",
    "email": "ifeanyi.okafor@example.org",
    "status": "Update needed",
    "active": true,
    "lastVerified": "2025-11-20",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Mission brief for Newmarch.",
    "audit": [
      {
        "at": "2025-11-20T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Update needed for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r05",
    "title": "Rev. Dr",
    "fullName": "Folake Adeyemi",
    "designation": "Priest",
    "province": "Abuja Province",
    "diocese": "Greenfield",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0005",
    "whatsapp": "+234 800 000 0005",
    "email": "folake.adeyemi@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-02",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Education brief for Greenfield.",
    "audit": [
      {
        "at": "2026-10-02T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r06",
    "title": "Very Rev.",
    "fullName": "Tunde Balogun",
    "designation": "Dean",
    "province": "Abuja Province",
    "diocese": "Lakeside",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0006",
    "whatsapp": "+234 800 000 0006",
    "email": "tunde.balogun@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-05-22",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Lakeside representative.",
    "audit": [
      {
        "at": "2026-05-22T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r07",
    "title": "Rev.",
    "fullName": "Amina Bello",
    "designation": "Priest",
    "province": "Abuja Province",
    "diocese": "Greenfield",
    "role": "Deputy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0007",
    "whatsapp": "+234 800 000 0007",
    "email": "amina.bello@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-03-15",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy, liturgy matters.",
    "audit": [
      {
        "at": "2026-03-15T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Checked for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r08",
    "title": "Canon",
    "fullName": "Yakubu Danjuma",
    "designation": "Canon",
    "province": "Abuja Province",
    "diocese": "Lakeside",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0008",
    "whatsapp": "+234 800 000 0008",
    "email": "yakubu.danjuma@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-01-09",
    "shareContact": true,
    "confirmRequested": true,
    "responsibilities": "Mission contact for Lakeside.",
    "audit": [
      {
        "at": "2026-01-09T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r09",
    "title": "Rev.",
    "fullName": "Osagie Aluko",
    "designation": "Priest",
    "province": "Bendel Province",
    "diocese": "Ironwood",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0009",
    "whatsapp": "+234 800 000 0009",
    "email": "osagie.aluko@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-19",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Ironwood representative.",
    "audit": [
      {
        "at": "2026-08-19T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r10",
    "title": "Ven.",
    "fullName": "Comfort Ibe",
    "designation": "Archdeacon",
    "province": "Bendel Province",
    "diocese": "Southridge",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0010",
    "whatsapp": "+234 800 000 0010",
    "email": "comfort.ibe@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-01",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Education brief for Southridge.",
    "audit": [
      {
        "at": "2026-09-01T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r11",
    "title": "Rev. Canon",
    "fullName": "Efe Okonkwo",
    "designation": "Canon",
    "province": "Bendel Province",
    "diocese": "Ironwood",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0011",
    "whatsapp": "+234 800 000 0011",
    "email": "efe.okonkwo@example.org",
    "status": "Update needed",
    "active": true,
    "lastVerified": "2025-12-11",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Youth brief, record needs a review.",
    "audit": [
      {
        "at": "2025-12-11T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Update needed for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r12",
    "title": "Rev.",
    "fullName": "Adaeze Nnamani",
    "designation": "Priest",
    "province": "Enugu Province",
    "diocese": "Amberley",
    "role": "Clergy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0012",
    "whatsapp": "+234 800 000 0012",
    "email": "adaeze.nnamani@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-14",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Liturgy contact for Amberley.",
    "audit": [
      {
        "at": "2026-10-14T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r13",
    "title": "Ven.",
    "fullName": "Chukwuma Umeh",
    "designation": "Archdeacon",
    "province": "Enugu Province",
    "diocese": "Hillcrest",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0013",
    "whatsapp": "+234 800 000 0013",
    "email": "chukwuma.umeh@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-04-28",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Hillcrest representative.",
    "audit": [
      {
        "at": "2026-04-28T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r14",
    "title": "Rev.",
    "fullName": "Ijeoma Dike",
    "designation": "Priest",
    "province": "Enugu Province",
    "diocese": "Amberley",
    "role": "Deputy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0014",
    "whatsapp": "+234 800 000 0014",
    "email": "ijeoma.dike@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-02-21",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Amberley.",
    "audit": [
      {
        "at": "2026-02-21T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r15",
    "title": "Rev. Dr",
    "fullName": "Onyeka Chukwu",
    "designation": "Priest",
    "province": "Enugu Province",
    "diocese": "Hillcrest",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0015",
    "whatsapp": "+234 800 000 0015",
    "email": "onyeka.chukwu@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-07-07",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Education brief for Hillcrest.",
    "audit": [
      {
        "at": "2026-07-07T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Checked for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r16",
    "title": "Rev. Canon",
    "fullName": "Funmilayo Ajayi",
    "designation": "Canon",
    "province": "Ibadan Province",
    "diocese": "Orchard Gate",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0016",
    "whatsapp": "+234 800 000 0016",
    "email": "funmilayo.ajayi@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-30",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Orchard Gate representative.",
    "audit": [
      {
        "at": "2026-09-30T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r17",
    "title": "Ven.",
    "fullName": "Kayode Adebayo",
    "designation": "Archdeacon",
    "province": "Ibadan Province",
    "diocese": "Whitecroft",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0017",
    "whatsapp": "+234 800 000 0017",
    "email": "kayode.adebayo@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-08",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Mission brief for Whitecroft.",
    "audit": [
      {
        "at": "2026-08-08T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r18",
    "title": "Rev.",
    "fullName": "Kehinde Afolabi",
    "designation": "Priest",
    "province": "Ibadan Province",
    "diocese": "Orchard Gate",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0018",
    "whatsapp": "+234 800 000 0018",
    "email": "kehinde.afolabi@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-03-03",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy, youth matters.",
    "audit": [
      {
        "at": "2026-03-03T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r19",
    "title": "Rev.",
    "fullName": "Titilayo Bakare",
    "designation": "Priest",
    "province": "Ibadan Province",
    "diocese": "Whitecroft",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0019",
    "whatsapp": "+234 800 000 0019",
    "email": "titilayo.bakare@example.org",
    "status": "Update needed",
    "active": false,
    "lastVerified": "2025-10-16",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Currently marked inactive pending a posting update.",
    "audit": [
      {
        "at": "2025-10-16T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Update needed for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r20",
    "title": "Rev.",
    "fullName": "Rahila Pam",
    "designation": "Priest",
    "province": "Jos Province",
    "diocese": "Coldspring",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0020",
    "whatsapp": "+234 800 000 0020",
    "email": "rahila.pam@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-20",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Coldspring representative.",
    "audit": [
      {
        "at": "2026-10-20T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r21",
    "title": "Ven.",
    "fullName": "Danladi Shehu",
    "designation": "Archdeacon",
    "province": "Jos Province",
    "diocese": "Ridgeway",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0021",
    "whatsapp": "+234 800 000 0021",
    "email": "danladi.shehu@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-05-05",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Ridgeway representative.",
    "audit": [
      {
        "at": "2026-05-05T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r22",
    "title": "Rev. Canon",
    "fullName": "Ladi Abdullahi",
    "designation": "Canon",
    "province": "Jos Province",
    "diocese": "Coldspring",
    "role": "Deputy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0022",
    "whatsapp": "+234 800 000 0022",
    "email": "ladi.abdullahi@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-06-25",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Deputy, liturgy matters.",
    "audit": [
      {
        "at": "2026-06-25T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Checked for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r23",
    "title": "Rev. Dr",
    "fullName": "Halima Yusuf",
    "designation": "Priest",
    "province": "Kaduna Province",
    "diocese": "Highgate",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0023",
    "whatsapp": "+234 800 000 0023",
    "email": "halima.yusuf@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-09",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Education brief for Highgate.",
    "audit": [
      {
        "at": "2026-09-09T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r24",
    "title": "Ven.",
    "fullName": "Ibrahim Sule",
    "designation": "Archdeacon",
    "province": "Kaduna Province",
    "diocese": "Northvale",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0024",
    "whatsapp": "+234 800 000 0024",
    "email": "ibrahim.sule@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-27",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Northvale representative.",
    "audit": [
      {
        "at": "2026-08-27T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r25",
    "title": "Rev.",
    "fullName": "Maryam Garba",
    "designation": "Priest",
    "province": "Kaduna Province",
    "diocese": "Highgate",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0025",
    "whatsapp": "+234 800 000 0025",
    "email": "maryam.garba@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-01-28",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Highgate.",
    "audit": [
      {
        "at": "2026-01-28T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r26",
    "title": "Canon",
    "fullName": "Musa Lawal",
    "designation": "Canon",
    "province": "Kaduna Province",
    "diocese": "Northvale",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0026",
    "whatsapp": "+234 800 000 0026",
    "email": "musa.lawal@example.org",
    "status": "Update needed",
    "active": true,
    "lastVerified": "2025-11-02",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Mission brief needs a current number.",
    "audit": [
      {
        "at": "2025-11-02T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Update needed for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r27",
    "title": "Rev.",
    "fullName": "Bosede Aluko",
    "designation": "Priest",
    "province": "Kwara Province",
    "diocese": "Eastbrook",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0027",
    "whatsapp": "+234 800 000 0027",
    "email": "bosede.aluko@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-05",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Eastbrook representative.",
    "audit": [
      {
        "at": "2026-10-05T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r28",
    "title": "Ven.",
    "fullName": "Jide Afolabi",
    "designation": "Archdeacon",
    "province": "Kwara Province",
    "diocese": "Fairmead",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0028",
    "whatsapp": "+234 800 000 0028",
    "email": "jide.afolabi@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-04-12",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Education brief for Fairmead.",
    "audit": [
      {
        "at": "2026-04-12T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r29",
    "title": "Rev. Canon",
    "fullName": "Ronke Adeyemi",
    "designation": "Canon",
    "province": "Kwara Province",
    "diocese": "Eastbrook",
    "role": "Deputy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0029",
    "whatsapp": "+234 800 000 0029",
    "email": "ronke.adeyemi@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-02-14",
    "shareContact": true,
    "confirmRequested": true,
    "responsibilities": "Deputy, liturgy matters.",
    "audit": [
      {
        "at": "2026-02-14T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r30",
    "title": "Rev. Canon",
    "fullName": "Adeola Bankole",
    "designation": "Canon",
    "province": "Lagos Province",
    "diocese": "Harbour Light",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0030",
    "whatsapp": "+234 800 000 0030",
    "email": "adeola.bankole@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-11",
    "shareContact": true,
    "confirmRequested": true,
    "responsibilities": "Harbour Light representative. Default demo user.",
    "audit": [
      {
        "at": "2026-10-11T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r31",
    "title": "Ven.",
    "fullName": "Segun Bakare",
    "designation": "Archdeacon",
    "province": "Lagos Province",
    "diocese": "Westmead",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0031",
    "whatsapp": "+234 800 000 0031",
    "email": "segun.bakare@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-06-02",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Westmead representative.",
    "audit": [
      {
        "at": "2026-06-02T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r32",
    "title": "Rev.",
    "fullName": "Yetunde Okafor",
    "designation": "Priest",
    "province": "Lagos Province",
    "diocese": "Harbour Light",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0032",
    "whatsapp": "+234 800 000 0032",
    "email": "yetunde.okafor@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-03-19",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Harbour Light.",
    "audit": [
      {
        "at": "2026-01-10T09:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Record created from a provincial list (demo).",
        "note": ""
      },
      {
        "at": "2026-03-19T14:20:00+03:00",
        "role": "Clergy representative",
        "actor": "Rev. Yetunde Okafor",
        "action": "Submitted a confirmation of details.",
        "note": ""
      }
    ]
  },
  {
    "id": "r33",
    "title": "Rev. Dr",
    "fullName": "Femi Ajayi",
    "designation": "Priest",
    "province": "Lagos Province",
    "diocese": "Westmead",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0033",
    "whatsapp": "+234 800 000 0033",
    "email": "femi.ajayi@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-07-16",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Education brief for Westmead.",
    "audit": [
      {
        "at": "2026-02-02T11:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Record created (demo).",
        "note": ""
      },
      {
        "at": "2026-07-16T09:40:00+03:00",
        "role": "Provincial verifier",
        "actor": "Provincial verifier (Lagos Province)",
        "action": "Marked as Checked.",
        "note": "Name and diocese match the provincial list."
      }
    ]
  },
  {
    "id": "r34",
    "title": "Rev.",
    "fullName": "Bola Adeyemi",
    "designation": "Priest",
    "province": "Lagos Province",
    "diocese": "Harbour Light",
    "role": "Clergy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0034",
    "whatsapp": "+234 800 000 0034",
    "email": "bola.adeyemi@example.org",
    "status": "Update needed",
    "active": true,
    "lastVerified": "2025-12-01",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Liturgy contact; details marked for review.",
    "audit": [
      {
        "at": "2025-12-01T08:30:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Marked Update needed.",
        "note": "Email bounced on a previous circular (demo)."
      }
    ]
  },
  {
    "id": "r35",
    "title": "Rev.",
    "fullName": "Gbenga Adebayo",
    "designation": "Priest",
    "province": "Lokoja Province",
    "diocese": "Riverbend",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0035",
    "whatsapp": "+234 800 000 0035",
    "email": "gbenga.adebayo@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-17",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Riverbend representative.",
    "audit": [
      {
        "at": "2026-09-17T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r36",
    "title": "Ven.",
    "fullName": "Blessing Okeke",
    "designation": "Archdeacon",
    "province": "Lokoja Province",
    "diocese": "Stonebridge",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0036",
    "whatsapp": "+234 800 000 0036",
    "email": "blessing.okeke@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-03",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Stonebridge representative.",
    "audit": [
      {
        "at": "2026-08-03T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r37",
    "title": "Rev. Canon",
    "fullName": "Tope Yusuf",
    "designation": "Canon",
    "province": "Lokoja Province",
    "diocese": "Riverbend",
    "role": "Deputy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0037",
    "whatsapp": "+234 800 000 0037",
    "email": "tope.yusuf@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-04-01",
    "shareContact": true,
    "confirmRequested": true,
    "responsibilities": "Deputy for Riverbend.",
    "audit": [
      {
        "at": "2026-04-01T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r38",
    "title": "Rev.",
    "fullName": "Emeka Okoro",
    "designation": "Priest",
    "province": "Niger Delta Province",
    "diocese": "Palmgrove",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0038",
    "whatsapp": "+234 800 000 0038",
    "email": "emeka.okoro@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-08",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Palmgrove representative.",
    "audit": [
      {
        "at": "2026-10-08T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r39",
    "title": "Ven.",
    "fullName": "Chioma Nwosu",
    "designation": "Archdeacon",
    "province": "Niger Delta Province",
    "diocese": "Tidemark",
    "role": "Clergy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0039",
    "whatsapp": "+234 800 000 0039",
    "email": "chioma.nwosu@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-05-30",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Tidemark representative.",
    "audit": [
      {
        "at": "2026-05-30T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r40",
    "title": "Rev.",
    "fullName": "Nkechi Eze",
    "designation": "Priest",
    "province": "Niger Delta Province",
    "diocese": "Palmgrove",
    "role": "Deputy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0040",
    "whatsapp": "+234 800 000 0040",
    "email": "nkechi.eze@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-07-22",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Deputy for Palmgrove.",
    "audit": [
      {
        "at": "2026-07-22T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Checked for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r41",
    "title": "Rev. Dr",
    "fullName": "Kelechi Obi",
    "designation": "Priest",
    "province": "Niger Delta Province",
    "diocese": "Tidemark",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0041",
    "whatsapp": "+234 800 000 0041",
    "email": "kelechi.obi@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-02-27",
    "shareContact": true,
    "confirmRequested": true,
    "responsibilities": "Education brief for Tidemark.",
    "audit": [
      {
        "at": "2026-02-27T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r42",
    "title": "Rev. Canon",
    "fullName": "Nnamdi Umeh",
    "designation": "Canon",
    "province": "Niger Province",
    "diocese": "Silverstream",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0042",
    "whatsapp": "+234 800 000 0042",
    "email": "nnamdi.umeh@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-21",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Silverstream representative.",
    "audit": [
      {
        "at": "2026-09-21T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r43",
    "title": "Ven.",
    "fullName": "Ikenna Dike",
    "designation": "Archdeacon",
    "province": "Niger Province",
    "diocese": "Fieldmere",
    "role": "Clergy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0043",
    "whatsapp": "+234 800 000 0043",
    "email": "ikenna.dike@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-14",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Fieldmere representative.",
    "audit": [
      {
        "at": "2026-08-14T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r44",
    "title": "Rev.",
    "fullName": "Grace Obi",
    "designation": "Priest",
    "province": "Niger Province",
    "diocese": "Silverstream",
    "role": "Deputy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0044",
    "whatsapp": "+234 800 000 0044",
    "email": "grace.obi@example.org",
    "status": "Update needed",
    "active": true,
    "lastVerified": "2025-11-28",
    "shareContact": false,
    "confirmRequested": false,
    "responsibilities": "Mission brief needs confirmation.",
    "audit": [
      {
        "at": "2025-11-28T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Update needed for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r45",
    "title": "Rev.",
    "fullName": "Aisha Lawal",
    "designation": "Priest",
    "province": "Ondo Province",
    "diocese": "Coralwood",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0045",
    "whatsapp": "+234 800 000 0045",
    "email": "aisha.lawal@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-10-16",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Coralwood representative.",
    "audit": [
      {
        "at": "2026-10-16T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r46",
    "title": "Ven.",
    "fullName": "Sani Mohammed",
    "designation": "Archdeacon",
    "province": "Ondo Province",
    "diocese": "Meridian",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0046",
    "whatsapp": "+234 800 000 0046",
    "email": "sani.mohammed@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-04-20",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Meridian representative.",
    "audit": [
      {
        "at": "2026-04-20T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r47",
    "title": "Rev. Canon",
    "fullName": "Fatima Bello",
    "designation": "Canon",
    "province": "Ondo Province",
    "diocese": "Coralwood",
    "role": "Deputy Representative",
    "committee": "Liturgy",
    "mobile": "+234 800 000 0047",
    "whatsapp": "+234 800 000 0047",
    "email": "fatima.bello@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-03-08",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Coralwood.",
    "audit": [
      {
        "at": "2026-03-08T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r48",
    "title": "Rev.",
    "fullName": "Zainab Shehu",
    "designation": "Priest",
    "province": "Ondo Province",
    "diocese": "Meridian",
    "role": "Clergy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0048",
    "whatsapp": "+234 800 000 0048",
    "email": "zainab.shehu@example.org",
    "status": "Checked",
    "active": true,
    "lastVerified": "2026-06-11",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Youth brief for Meridian.",
    "audit": [
      {
        "at": "2026-06-11T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Checked for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r49",
    "title": "Rev. Dr",
    "fullName": "Uche Okonkwo",
    "designation": "Priest",
    "province": "Owerri Province",
    "diocese": "Ashbourne",
    "role": "Clergy Representative",
    "committee": "House Business",
    "mobile": "+234 800 000 0049",
    "whatsapp": "+234 800 000 0049",
    "email": "uche.okonkwo@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-09-26",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Ashbourne representative.",
    "audit": [
      {
        "at": "2026-09-26T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r50",
    "title": "Ven.",
    "fullName": "Ngozi-Ada Ibe",
    "designation": "Archdeacon",
    "province": "Owerri Province",
    "diocese": "Brookfield",
    "role": "Clergy Representative",
    "committee": "Education",
    "mobile": "+234 800 000 0050",
    "whatsapp": "+234 800 000 0050",
    "email": "ngozi.ada.ibe@example.org",
    "status": "Verified",
    "active": true,
    "lastVerified": "2026-08-22",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Brookfield representative.",
    "audit": [
      {
        "at": "2026-08-22T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Verified for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r51",
    "title": "Rev.",
    "fullName": "Kelechi-Paul Eze",
    "designation": "Priest",
    "province": "Owerri Province",
    "diocese": "Ashbourne",
    "role": "Deputy Representative",
    "committee": "Mission",
    "mobile": "+234 800 000 0051",
    "whatsapp": "+234 800 000 0051",
    "email": "kelechi.paul.eze@example.org",
    "status": "Submitted",
    "active": true,
    "lastVerified": "2026-01-16",
    "shareContact": false,
    "confirmRequested": true,
    "responsibilities": "Deputy for Ashbourne.",
    "audit": [
      {
        "at": "2026-01-16T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Submitted for this demo.",
        "note": ""
      }
    ]
  },
  {
    "id": "r52",
    "title": "Canon",
    "fullName": "Chioma-Blessing Nwosu",
    "designation": "Canon",
    "province": "Owerri Province",
    "diocese": "Brookfield",
    "role": "Clergy Representative",
    "committee": "Youth",
    "mobile": "+234 800 000 0052",
    "whatsapp": "+234 800 000 0052",
    "email": "chioma.blessing.nwosu@example.org",
    "status": "Maintained",
    "active": true,
    "lastVerified": "2026-05-14",
    "shareContact": true,
    "confirmRequested": false,
    "responsibilities": "Youth brief for Brookfield.",
    "audit": [
      {
        "at": "2026-05-14T10:00:00+03:00",
        "role": "Secretary",
        "actor": "Secretary's office",
        "action": "Seed status set to Maintained for this demo.",
        "note": ""
      }
    ]
  }
],
  circulars: [
  {
    "id": "c01",
    "title": "Notice of the mid-year meeting of the House of Clergy",
    "body": "The mid-year meeting of the House of Clergy will take place on Tuesday 8 December 2026 in Abuja. Provincial representatives are asked to confirm attendance and to send any items for the agenda to the Secretary's office by 28 November 2026.\n\nThis is a sample circular for the demo. It is not an official notice of the House.",
    "postedAt": "2026-11-10T09:00:00+03:00",
    "author": "Secretary's office",
    "target": {
      "type": "all"
    },
    "received": {
      "r01": "2026-11-10T16:10:00+03:00",
      "r02": "2026-11-11T08:02:00+03:00",
      "r05": "2026-11-10T12:40:00+03:00",
      "r09": "2026-11-12T09:15:00+03:00",
      "r12": "2026-11-10T18:22:00+03:00",
      "r16": "2026-11-11T07:50:00+03:00",
      "r20": "2026-11-11T10:05:00+03:00",
      "r23": "2026-11-10T14:33:00+03:00",
      "r27": "2026-11-13T11:00:00+03:00",
      "r30": "2026-11-10T09:45:00+03:00",
      "r31": "2026-11-10T11:20:00+03:00",
      "r35": "2026-11-14T08:10:00+03:00",
      "r38": "2026-11-11T15:00:00+03:00",
      "r42": "2026-11-12T12:12:00+03:00",
      "r45": "2026-11-10T17:40:00+03:00",
      "r49": "2026-11-11T09:09:00+03:00"
    },
    "acknowledged": {
      "r01": "2026-11-11T09:00:00+03:00",
      "r05": "2026-11-10T13:05:00+03:00",
      "r12": "2026-11-12T08:40:00+03:00",
      "r16": "2026-11-11T08:10:00+03:00",
      "r20": "2026-11-11T10:20:00+03:00",
      "r23": "2026-11-13T07:30:00+03:00",
      "r30": "2026-11-10T09:50:00+03:00",
      "r38": "2026-11-11T15:12:00+03:00",
      "r45": "2026-11-14T19:00:00+03:00",
      "r49": "2026-11-11T09:20:00+03:00"
    }
  },
  {
    "id": "c02",
    "title": "Request for provincial returns \u2014 Lagos Province",
    "body": "The Secretary's office requests current returns from representatives in Lagos Province ahead of the mid-year meeting. Please confirm that your contact details in the directory are correct, and send outstanding returns by 1 December 2026.\n\nThis is a sample circular for the demo.",
    "postedAt": "2026-11-18T11:30:00+03:00",
    "author": "Secretary's office",
    "target": {
      "type": "province",
      "provinces": [
        "Lagos Province"
      ]
    },
    "received": {
      "r30": "2026-11-18T12:00:00+03:00",
      "r31": "2026-11-18T15:40:00+03:00"
    },
    "acknowledged": {
      "r30": "2026-11-18T12:05:00+03:00"
    }
  },
  {
    "id": "c03",
    "title": "Education committee briefing",
    "body": "Members of the Education committee are invited to a briefing on Friday 4 December 2026. Papers will be circulated once attendance is confirmed.\n\nThis is a sample circular for the demo.",
    "postedAt": "2026-11-20T08:15:00+03:00",
    "author": "Secretary's office",
    "target": {
      "type": "committee",
      "committee": "Education"
    },
    "received": {
      "r01": "2026-11-20T09:00:00+03:00",
      "r05": "2026-11-20T10:10:00+03:00"
    },
    "acknowledged": {}
  }
],

  designations: [
    "Priest",
    "Canon",
    "Archdeacon",
    "Dean",
    "Provost"
  ],
  meetings: [
    {
      "id": "m01",
      "title": "Mid-year meeting of the House of Clergy",
      "date": "2026-12-08",
      "time": "10:00",
      "venue": "Abuja (sample venue)",
      "audience": "All provinces",
      "notice": "Provincial representatives are asked to confirm attendance and to send any items for the agenda to the Secretary's office by 28 November 2026.\n\nThis is a sample meeting notice for the demo. It is not an official notice of the House.",
      "agenda": "1. Opening prayers and roll of provinces\n2. Secretary's report\n3. Confirmation of the national directory\n4. Committee reports\n5. Any other business",
      "postedAt": "2026-11-10T09:00:00+03:00",
      "author": "Secretary's office"
    },
    {
      "id": "m02",
      "title": "Education committee briefing",
      "date": "2026-12-04",
      "time": "11:00",
      "venue": "To be confirmed (sample)",
      "audience": "Education",
      "notice": "Members of the Education committee are invited to a briefing ahead of the mid-year meeting. This is a sample meeting notice for the demo.",
      "agenda": "1. Opening prayer\n2. Committee attendance\n3. Review of sample provincial returns\n4. Papers for the mid-year meeting",
      "postedAt": "2026-11-20T08:15:00+03:00",
      "author": "Secretary's office"
    },
    {
      "id": "m03",
      "title": "House Business committee working session",
      "date": "2026-11-27",
      "time": "15:00",
      "venue": "Online (sample)",
      "audience": "House Business",
      "notice": "A short working session to prepare business for the mid-year meeting. This is a sample meeting notice for the demo.",
      "agenda": "1. Opening prayer\n2. Draft order of business\n3. Outstanding reports",
      "postedAt": "2026-11-18T09:30:00+03:00",
      "author": "Secretary's office"
    }
  ],
  reports: [
    {
      "id": "rp01",
      "title": "Education committee — third-quarter activity report",
      "committee": "Education",
      "period": "July–September 2026",
      "fileName": "education-q3-2026-sample.pdf",
      "notes": "A sample committee report for the demo. The file name is shown only; no real file is stored.",
      "uploadedAt": "2026-10-15T10:00:00+03:00",
      "uploadedBy": "Rev. Amara Okoro",
      "authorPersonId": "r01"
    },
    {
      "id": "rp02",
      "title": "Mission committee — mid-year note",
      "committee": "Mission",
      "period": "January–June 2026",
      "fileName": "mission-midyear-2026-sample.pdf",
      "notes": "A sample committee report for the demo. The file name is shown only; no real file is stored.",
      "uploadedAt": "2026-11-02T14:20:00+03:00",
      "uploadedBy": "Canon Yakubu Danjuma",
      "authorPersonId": "r08"
    },
    {
      "id": "rp03",
      "title": "House Business committee — draft order of business",
      "committee": "House Business",
      "period": "November 2026",
      "fileName": "house-business-order-nov-2026-sample.docx",
      "notes": "A sample committee paper for the demo. The file name is shown only; no real file is stored.",
      "uploadedAt": "2026-11-16T08:40:00+03:00",
      "uploadedBy": "Rev. Canon Adeola Bankole",
      "authorPersonId": "r30"
    }
  ],
  ui: {
    role: "secretary",
    verifierProvince: "Lagos Province",
    repId: "r30",
    confirmStep: 1
  }
};
