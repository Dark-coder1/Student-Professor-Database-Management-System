const fs = require('fs');
const path = require('path');

const facultyDataPath = 'c:\\Users\\saiad\\OneDrive\\Desktop\\saad1\\facultydata.txt';
const facultyDataStr = fs.readFileSync(facultyDataPath, 'utf8');
const facultyDataJSON = JSON.parse(facultyDataStr);

const getDeptCode = (deptName) => {
  if (!deptName) return "UNKNOWN";
  const match = deptName.match(/\(([A-Z]+)\)$/);
  return match ? match[1] : deptName.substring(0, 4).toUpperCase();
};

const emojis = ["👩‍💻", "👨‍🔬", "👩‍🏫", "👨‍🏫", "👩‍🔬", "👨‍💼", "👩‍💼", "🧑‍🏫", "🧑‍💻"];

const allFaculty = [];
const limit = Math.min(100, facultyDataJSON.data.length);

for (let i = 0; i < limit; i++) {
  const item = facultyDataJSON.data[i];
  const attr = item.attributes;
  
  let p = attr.Contact_No || "";
  if (p && !p.startsWith("+")) p = "+91 " + p;

  const f = {
    id: i + 1,
    emoji: emojis[i % emojis.length],
    name: attr.Name || `Faculty ${i+1}`,
    title: attr.Designation || "Professor",
    dept: getDeptCode(attr.Department),
    deptLabel: attr.Department || "Unknown Department",
    phone: p || `+91 9${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}`,
    email: attr.EMAIL || `faculty${i+1}@univ.edu.in`,
    free: [],
    busy: [],
    campusStatus: "on-campus",
    officeAddress: attr.Office_Address || "N/A",
  };
  
  if (attr.Photo && attr.Photo.data && attr.Photo.data.attributes && attr.Photo.data.attributes.url) {
    f.photo = attr.Photo.data.attributes.url;
  }
  
  allFaculty.push(f);
}

// Write to frontend/js/api.js
const apiPath = path.join(__dirname, 'scholar-suite/frontend/js/api.js');
let apiJs = fs.readFileSync(apiPath, 'utf8');

const newLocalFacultyStr = "const LOCAL_FACULTY = " + JSON.stringify(allFaculty, null, 2) + ";";
apiJs = apiJs.replace(/const LOCAL_FACULTY = \[[\s\S]*?\];/, newLocalFacultyStr);
fs.writeFileSync(apiPath, apiJs);

// Write to backend/data/faculty.js
const backendPath = path.join(__dirname, 'scholar-suite/backend/data/faculty.js');
const newBackendFacultyStr = "const faculty = " + JSON.stringify(allFaculty, null, 2) + ";\n\nmodule.exports = faculty;";
fs.writeFileSync(backendPath, newBackendFacultyStr);

console.log(`Successfully parsed and saved ${allFaculty.length} faculties.`);
