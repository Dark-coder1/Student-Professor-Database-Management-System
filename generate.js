const fs = require('fs');
const path = require('path');

const addressesStr = fs.readFileSync('addresses.txt', 'utf8');
const addresses = {};
for (const line of addressesStr.split('\n')) {
  if (line.trim() === '') continue;
  const match = line.match(/^(\d+)\.\s*(.*)/);
  if (match) {
    addresses[parseInt(match[1])] = match[2].trim();
  }
}

const existingFaculty = [
  { id:1,  emoji:"👩‍💻", name:"Dr. Priya Nair",           title:"Associate Professor",       dept:"CSE",   deptLabel:"Computer Science",     phone:"+91 98765 43210", email:"priya.nair@univ.edu.in",    free:["Mon 10 AM–11 AM","Wed 2 PM–4 PM"],       busy:[], campusStatus: "on-campus" },
  { id:2,  emoji:"👨‍🔬", name:"Prof. S. Krishnaswamy",    title:"Professor & Head of Dept",  dept:"CSE",   deptLabel:"Computer Science",     phone:"+91 94321 87654", email:"s.krishna@univ.edu.in",     free:["Tue 3 PM–4 PM","Thu 10 AM–12 PM"],                  busy:[], campusStatus: "on-campus" },
  { id:3,  emoji:"👩‍🏫", name:"Dr. Meena Rajagopalan",    title:"Assistant Professor",       dept:"ECE",   deptLabel:"Electronics & Comm.",  phone:"+91 91234 56789", email:"meena.raj@univ.edu.in",     free:["Mon 2 PM–3 PM","Fri 3 PM–5 PM"],         busy:[], campusStatus: "on-campus" },
  { id:4,  emoji:"👨‍🏫", name:"Dr. Ramesh Iyer",          title:"Senior Professor",          dept:"MECH",  deptLabel:"Mechanical Engg.",     phone:"+91 97654 32109", email:"r.iyer@univ.edu.in",        free:["Wed 10 AM–12 PM","Fri 2 PM–3 PM"],                  busy:[], campusStatus: "on-campus" },
  { id:5,  emoji:"👩‍🔬", name:"Dr. Anitha Subramaniam",   title:"Associate Professor",       dept:"MATH",  deptLabel:"Mathematics",          phone:"+91 93456 78901", email:"anitha.s@univ.edu.in",      free:["Mon 11 AM–1 PM","Thu 9 AM–10 AM"],        busy:[], campusStatus: "on-campus" },
  { id:6,  emoji:"👨‍💼", name:"Prof. Vijay Shankar",       title:"Professor",                 dept:"CIVIL", deptLabel:"Civil Engineering",    phone:"+91 98901 23456", email:"v.shankar@univ.edu.in",     free:["Tue 10 AM–11 AM","Fri 9 AM–11 AM"],                 busy:[], campusStatus: "on-campus" },
  { id:7,  emoji:"👩‍💼", name:"Dr. Kavitha Menon",         title:"Assistant Professor",       dept:"CSE",   deptLabel:"Computer Science",     phone:"+91 95678 12345", email:"kavitha.m@univ.edu.in",     free:["Mon 9 AM–11 AM","Wed 11 AM–12 PM"],                  busy:[], campusStatus: "on-campus" },
  { id:8,  emoji:"🧑‍🏫", name:"Dr. Suresh Babu",           title:"Associate Professor",       dept:"ECE",   deptLabel:"Electronics & Comm.",  phone:"+91 99012 34567", email:"suresh.b@univ.edu.in",      free:["Tue 11 AM–1 PM","Thu 3 PM–5 PM"],       busy:[], campusStatus: "on-campus" },
  { id:9,  emoji:"👩‍🔬", name:"Prof. Lakshmi Devi",        title:"Senior Professor",          dept:"MATH",  deptLabel:"Mathematics",          phone:"+91 90123 45678", email:"lakshmi.d@univ.edu.in",     free:["Mon 3 PM–5 PM","Wed 9 AM–10 AM"],                   busy:[], campusStatus: "on-campus" },
  { id:10, emoji:"👨‍🔬", name:"Dr. Arunkumar Patel",       title:"Assistant Professor",       dept:"MECH",  deptLabel:"Mechanical Engg.",     phone:"+91 88765 43210", email:"arun.p@univ.edu.in",        free:["Tue 2 PM–3 PM","Thu 10 AM–12 PM"],        busy:[], campusStatus: "off-campus" },
  { id:11, emoji:"🧑‍💻", name:"Dr. Deepa Chandrasekhar",   title:"Associate Professor",       dept:"CIVIL", deptLabel:"Civil Engineering",    phone:"+91 87654 32109", email:"deepa.c@univ.edu.in",       free:["Mon 11 AM–12 PM","Fri 11 AM–1 PM"],                  busy:[], campusStatus: "on-campus" },
  { id:12, emoji:"👨‍🏫", name:"Prof. Mohan Venkatesh",     title:"Professor",                 dept:"CSE",   deptLabel:"Computer Science",     phone:"+91 86543 21098", email:"m.venkatesh@univ.edu.in",   free:["Wed 3 PM–5 PM","Thu 11 AM–12 PM"],                   busy:[], campusStatus: "on-campus" },
];

const depts = [
  { dept: "CSE", deptLabel: "Computer Science" },
  { dept: "ECE", deptLabel: "Electronics & Comm." },
  { dept: "MECH", deptLabel: "Mechanical Engg." },
  { dept: "MATH", deptLabel: "Mathematics" },
  { dept: "CIVIL", deptLabel: "Civil Engineering" },
  { dept: "SCOPE", deptLabel: "Computer Science (SCOPE)" },
  { dept: "SENSE", deptLabel: "Electronics (SENSE)" },
  { dept: "SMEC", deptLabel: "Mechanical (SMEC)" },
  { dept: "VSB", deptLabel: "Business (VSB)" },
  { dept: "VSL", deptLabel: "Law (VSL)" },
];

const emojis = ["👩‍💻", "👨‍🔬", "👩‍🏫", "👨‍🏫", "👩‍🔬", "👨‍💼", "👩‍💼", "🧑‍🏫", "🧑‍💻"];
const titles = ["Assistant Professor", "Associate Professor", "Professor", "Senior Professor"];

const allFaculty = [];
for (let i = 1; i <= 100; i++) {
  let f;
  if (i <= 12) {
    f = existingFaculty[i - 1];
  } else {
    const d = depts[i % depts.length];
    f = {
      id: i,
      emoji: emojis[i % emojis.length],
      name: `Dr. Faculty ${i}`,
      title: titles[i % titles.length],
      dept: d.dept,
      deptLabel: d.deptLabel,
      phone: `+91 9${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
      email: `faculty${i}@univ.edu.in`,
      free: [],
      busy: [],
      campusStatus: Math.random() > 0.8 ? "off-campus" : "on-campus"
    };
  }
  f.officeAddress = addresses[i] || "N/A";
  allFaculty.push(f);
}

// Write to frontend/js/api.js
const apiPath = path.join(__dirname, 'scholar-suite/frontend/js/api.js');
let apiJs = fs.readFileSync(apiPath, 'utf8');

// Replace LOCAL_FACULTY
const newLocalFacultyStr = "const LOCAL_FACULTY = " + JSON.stringify(allFaculty, null, 2) + ";";
apiJs = apiJs.replace(/const LOCAL_FACULTY = \[[\s\S]*?\];/, newLocalFacultyStr);
fs.writeFileSync(apiPath, apiJs);

// Write to backend/data/faculty.js
const backendPath = path.join(__dirname, 'scholar-suite/backend/data/faculty.js');
const newBackendFacultyStr = "const faculty = " + JSON.stringify(allFaculty, null, 2) + ";\n\nmodule.exports = faculty;";
fs.writeFileSync(backendPath, newBackendFacultyStr);

console.log("Done generating 100 faculties with office addresses.");
