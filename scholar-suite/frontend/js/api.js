/**
 * api.js — Data layer.
 * Tries the Express backend first (/api/*).
 * If the server is not running (404/NetworkError), falls back to
 * LOCAL_DATA so the app works by opening index.html directly in a browser.
 */

const API_BASE = "/api";

// ── Local fallback data ───────────────────────────────────────
const LOCAL_FACULTY = [
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

const LOCAL_PROJECTS = {
  1:  [
    { id:"p1-1",  title:"Smart Campus Attendance System",          desc:"Real-time face-recognition attendance tracking using OpenCV and Flask, integrated with the university DBMS.",                    tags:["Python","OpenCV","Flask","MySQL"],           status:"ongoing",   students:4, year:"2024-25" },
    { id:"p1-2",  title:"NLP-Based Student Query Chatbot",         desc:"A fine-tuned language model chatbot to answer student FAQs about university policies and schedules.",                           tags:["NLP","Transformers","React"],                status:"completed", students:3, year:"2023-24" },
    { id:"p1-3",  title:"Distributed File Sharing System",         desc:"Peer-to-peer file sharing with encryption for secure document exchange between students and faculty.",                           tags:["Java","Sockets","Cryptography"],             status:"open",      students:0, year:"2025-26" },
  ],
  2:  [
    { id:"p2-1",  title:"Blockchain-Based Certificate Verification",desc:"Issuing and verifying academic certificates on a permissioned blockchain to prevent forgery.",                                  tags:["Blockchain","Solidity","Web3"],              status:"ongoing",   students:5, year:"2024-25" },
    { id:"p2-2",  title:"Graph-Based Course Recommendation",        desc:"Using knowledge graphs to recommend elective courses based on a student academic history and career goals.",                    tags:["Graph DB","ML","Neo4j"],                     status:"open",      students:0, year:"2025-26" },
  ],
  3:  [
    { id:"p3-1",  title:"IoT-Based Smart Classroom",                desc:"Sensor network controlling lighting, fans, and attendance boards in seminar halls, visualized on a real-time dashboard.",       tags:["IoT","Arduino","MQTT","React"],              status:"ongoing",   students:3, year:"2024-25" },
    { id:"p3-2",  title:"Spectrum Sensing for Cognitive Radio",      desc:"Machine-learning based spectrum sensing algorithm for dynamic spectrum access in cognitive radio networks.",                    tags:["Signal Processing","Python","ML"],           status:"completed", students:2, year:"2023-24" },
  ],
  4:  [
    { id:"p4-1",  title:"CAD Automation for Gear Design",            desc:"Automated MATLAB scripts to generate and optimize spur gear profiles based on load and torque specifications.",               tags:["MATLAB","CAD","Optimization"],               status:"completed", students:4, year:"2023-24" },
    { id:"p4-2",  title:"3D Printed Prosthetic Hand",                 desc:"Low-cost prosthetic hand with servo-controlled fingers, driven by EMG signals from the residual limb.",                      tags:["3D Printing","EMG","Arduino"],               status:"ongoing",   students:3, year:"2024-25" },
    { id:"p4-3",  title:"Solar Tracker Mechanism",                    desc:"A single-axis solar panel tracking system using LDR sensors to maximize energy capture throughout the day.",                 tags:["Mechanical","Electronics","Energy"],         status:"open",      students:0, year:"2025-26" },
  ],
  5:  [
    { id:"p5-1",  title:"Cryptographic Key Generation via Chaos",    desc:"Generating pseudo-random keys using chaotic dynamical systems for lightweight encryption.",                                   tags:["Cryptography","Chaos Theory","Python"],      status:"completed", students:2, year:"2023-24" },
    { id:"p5-2",  title:"Mathematical Modelling of Epidemic Spread", desc:"SIR/SEIR model implementation and simulation to study infection dynamics in university populations.",                         tags:["Differential Equations","Simulation","R"],  status:"ongoing",   students:3, year:"2024-25" },
  ],
  6:  [
    { id:"p6-1",  title:"Structural Health Monitoring System",       desc:"Wireless sensor-based monitoring of bridge structures to detect micro-cracks and stress anomalies in real time.",             tags:["IoT","Structural Engg","Sensors"],           status:"ongoing",   students:5, year:"2024-25" },
    { id:"p6-2",  title:"GIS-Based Urban Flood Mapping",             desc:"Using satellite imagery and GIS tools to identify flood-prone zones and plan drainage infrastructure.",                       tags:["GIS","Python","Remote Sensing"],             status:"open",      students:0, year:"2025-26" },
  ],
  7:  [
    { id:"p7-1",  title:"Student Performance Prediction",            desc:"ML model predicting student performance using attendance, assignments, and mid-term scores to flag at-risk students early.",  tags:["ML","Scikit-learn","Django"],                status:"ongoing",   students:4, year:"2024-25" },
    { id:"p7-2",  title:"Automated Code Review Tool",                desc:"Static analysis tool that reviews student code submissions for correctness, efficiency, and style violations.",               tags:["AST","Python","React"],                      status:"open",      students:0, year:"2025-26" },
  ],
  8:  [
    { id:"p8-1",  title:"VLSI Design of Low-Power ALU",              desc:"Gate-level design and simulation of a low-power 8-bit ALU using Cadence tools targeting sub-threshold operation.",           tags:["VLSI","Cadence","Verilog"],                  status:"completed", students:2, year:"2023-24" },
    { id:"p8-2",  title:"Wireless Body Area Network for Health",     desc:"WBAN architecture for continuous patient monitoring, transmitting vitals to a mobile app over BLE.",                          tags:["BLE","Embedded C","Healthcare"],             status:"ongoing",   students:3, year:"2024-25" },
  ],
  9:  [
    { id:"p9-1",  title:"Numerical Methods Visualizer",              desc:"Interactive web app to visualize root-finding algorithms, numerical integration, and ODE solvers step by step.",             tags:["JavaScript","D3.js","Algorithms"],           status:"completed", students:2, year:"2023-24" },
    { id:"p9-2",  title:"Fractal Geometry Art Generator",            desc:"Generating and animating fractal patterns (Mandelbrot, Julia sets) using GPU-accelerated WebGL shaders.",                    tags:["WebGL","GLSL","Math"],                       status:"open",      students:0, year:"2025-26" },
  ],
  10: [
    { id:"p10-1", title:"CFD Analysis of Aerodynamic Bodies",        desc:"OpenFOAM-based CFD simulation of drag and lift on various vehicle profiles to guide lightweight design.",                     tags:["CFD","OpenFOAM","Python"],                   status:"ongoing",   students:4, year:"2024-25" },
    { id:"p10-2", title:"Autonomous Line-Following Robot",           desc:"PID-controlled differential drive robot that follows a track using IR sensors and adapts to varying line widths.",            tags:["Arduino","PID","C++"],                       status:"completed", students:3, year:"2023-24" },
  ],
  11: [
    { id:"p11-1", title:"Rainwater Harvesting Simulation",           desc:"Simulation model for optimizing rainwater collection and storage in urban residential complexes.",                            tags:["MATLAB","Water Resources","GIS"],            status:"completed", students:3, year:"2023-24" },
    { id:"p11-2", title:"Smart Traffic Signal System",               desc:"Computer vision based adaptive traffic signal control that adjusts green-time based on real-time vehicle density.",           tags:["OpenCV","Raspberry Pi","IoT"],               status:"open",      students:0, year:"2025-26" },
  ],
  12: [
    { id:"p12-1", title:"Compiler Design: Mini-Language",            desc:"End-to-end compiler for a custom teaching language — lexer, parser, semantic analyser, and bytecode generator.",             tags:["Compiler Design","C","LLVM"],                status:"ongoing",   students:5, year:"2024-25" },
    { id:"p12-2", title:"Federated Learning for Privacy",            desc:"Decentralized ML training across devices without sharing raw data, tested on medical image classification.",                  tags:["Federated Learning","PyTorch","Privacy"],    status:"completed", students:4, year:"2023-24" },
    { id:"p12-3", title:"Operating System Scheduler Simulator",      desc:"Web-based interactive simulator for CPU scheduling algorithms — FCFS, SJF, RR, and Priority with Gantt charts.",            tags:["OS","React","Algorithms"],                   status:"open",      students:0, year:"2025-26" },
  ],
};

// ── Helpers ───────────────────────────────────────────────────

/** Try a fetch; on any network/HTTP error resolve to null instead of rejecting. */
function tryFetch(url) {
  return fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
}

/** Apply ?q and ?dept filters locally (mirrors backend logic). */
function localFilterFaculty(params = {}) {
  let result = LOCAL_FACULTY;
  if (params.dept) {
    const depts = params.dept.toUpperCase().split(",");
    result = result.filter((f) => depts.includes(f.dept));
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    result = result.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.dept.toLowerCase().includes(q) ||
        f.deptLabel.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q)
    );
  }
  return { count: result.length, data: result };
}

// ── Public API object ─────────────────────────────────────────
const api = {
  /** Get all faculty, with optional { q, dept } params. */
  getFaculty(params = {}) {
    const qs  = new URLSearchParams(params).toString();
    const url = qs ? `${API_BASE}/faculty?${qs}` : `${API_BASE}/faculty`;
    return tryFetch(url).then((json) => json ?? localFilterFaculty(params));
  },

  /** Get a single faculty member by numeric ID. */
  getFacultyById(id) {
    return tryFetch(`${API_BASE}/faculty/${id}`).then((json) => {
      if (json) return json;
      const member = LOCAL_FACULTY.find((f) => f.id === id);
      if (!member) throw new Error(`Faculty ${id} not found`);
      return member;
    });
  },

  /** Get all projects across all faculty, with optional { status } param. */
  getAllProjects(params = {}) {
    const qs  = new URLSearchParams(params).toString();
    const url = qs ? `${API_BASE}/projects?${qs}` : `${API_BASE}/projects`;
    return tryFetch(url).then((json) => {
      if (json) return json;
      // Build flat list from local data, grouped by faculty department
      const all = [];
      Object.entries(LOCAL_PROJECTS).forEach(([fid, projs]) => {
        const member = LOCAL_FACULTY.find((f) => f.id === parseInt(fid));
        const deptLabel = member?.deptLabel || "Unknown Department";
        projs.forEach((p) =>
          all.push({ 
            ...p, 
            facultyId: parseInt(fid), 
            facultyName: member?.name, 
            department: deptLabel
          })
        );
      });
      const result = params.status ? all.filter((p) => p.status === params.status) : all;
      return { count: result.length, data: result };
    });
  },

  /** Get all projects for a specific faculty member. */
  getProjectsByFaculty(facultyId) {
    return tryFetch(`${API_BASE}/projects/faculty/${facultyId}`).then((json) => {
      if (json) return json;
      const member   = LOCAL_FACULTY.find((f) => f.id === facultyId);
      const projects = LOCAL_PROJECTS[facultyId] || [];
      return { 
        faculty: { 
          id: member?.id,
          name: member?.name,
          email: member?.email,
          department: member?.deptLabel || "Unknown",
          title: member?.title,
          emoji: member?.emoji,
        }, 
        count: projects.length, 
        data: projects 
      };
    });
  },

  /** Register for a project (mock with 20s selection timer). */
  registerForProject(projectId, providedTitle = null, providedFacultyName = null) {
    return new Promise((resolve) => {
      // Find project info for the request entry
      let projectTitle = providedTitle || "Project";
      let facultyName = providedFacultyName || "Unknown Faculty";
      
      // Fallback lookup in local data if not provided
      if (!providedTitle || !providedFacultyName) {
        for (const [fid, projs] of Object.entries(LOCAL_PROJECTS)) {
          const found = projs.find(p => p.id === projectId);
          if (found) {
            projectTitle = providedTitle || found.title;
            const member = LOCAL_FACULTY.find(f => f.id === parseInt(fid));
            facultyName = providedFacultyName || (member ? member.name : facultyName);
            break;
          }
        }
      }

      const newRequest = {
        id: "reg-" + Date.now(),
        type: "Registration",
        projectId: projectId,
        projectTitle: projectTitle,
        facultyName: facultyName,
        timestamp: new Date().toISOString(),
        status: "pending"
      };

      state.requests.unshift(newRequest);
      this._persistRequests();
      
      // Notify UI
      if (window.renderRequestHistory) renderRequestHistory();

      // Selection Timer (20 seconds)
      setTimeout(() => {
        // 60% chance of acceptance, 40% chance of rejection for a "realistic" feel
        const finalStatus = Math.random() > 0.4 ? "accepted" : "rejected";
        
        this.updateRequestStatus(newRequest.id, finalStatus);
        
        const acceptMsgs = [
          `Dear student, I am pleased to inform you that you have been selected for the "${newRequest.projectTitle}" project. Welcome aboard!`,
          `I've reviewed your profile and would love to have you on the "${newRequest.projectTitle}" team. Let's get started soon!`,
          `Congratulations! Your registration for "${newRequest.projectTitle}" has been approved. Meet me in my office next Monday.`
        ];
        
        const rejectMsgs = [
          `Thank you for your interest in "${newRequest.projectTitle}". Unfortunately, we have decided to move forward with other candidates at this time.`,
          `The slots for "${newRequest.projectTitle}" are currently full. I encourage you to apply for other projects in our department.`,
          `We appreciate your application, but we are looking for students with different specialized skills for "${newRequest.projectTitle}" right now.`
        ];

        let responseMsg = finalStatus === "accepted" 
          ? acceptMsgs[Math.floor(Math.random() * acceptMsgs.length)]
          : rejectMsgs[Math.floor(Math.random() * rejectMsgs.length)];

        if (finalStatus === "accepted") {
          state.registeredProjects.add(projectId);
          localStorage.setItem(
            "registeredProjects", 
            JSON.stringify(Array.from(state.registeredProjects))
          );
        }

        // Add an actual "Message" from the professor to the history
        const professorResponse = {
          id: "msg-res-" + Date.now(),
          type: "Message",
          facultyName: newRequest.facultyName,
          subject: `RESPONSE: ${newRequest.projectTitle}`,
          message: responseMsg,
          timestamp: new Date().toISOString(),
          status: "accepted", // Responses are always "accepted" as they are the final word
          isIncoming: true    // New flag to distinguish
        };
        state.requests.unshift(professorResponse);
        this._persistRequests();

        // Notify user
        if (typeof interactions !== 'undefined' && interactions.showToast) {
          const type = finalStatus === 'accepted' ? 'success' : 'error';
          interactions.showToast(finalStatus === 'accepted' ? 'Selected for project!' : 'Registration rejected', type);
        }

        // Re-render
        if (window.renderRequestHistory) renderRequestHistory();

        // Re-render project views
        if (window.openFacultyProjects && state.currentFacultyId) {
          openFacultyProjects(state.currentFacultyId);
        } else if (window.openMyProjects) {
          openMyProjects();
        }
      }, 20000);

      resolve({ success: true, requestId: newRequest.id });
    });
  },

  /** Unregister from a project. */
  unregisterFromProject(projectId) {
    return new Promise((resolve) => {
      // Update state
      state.registeredProjects.delete(projectId);
      
      // Persist to localStorage
      localStorage.setItem(
        "registeredProjects", 
        JSON.stringify(Array.from(state.registeredProjects))
      );
      
      // Mock network delay
      setTimeout(() => {
        resolve({ success: true, projectId });
      }, 300);
    });
  },

  /** Get only registered projects across all faculty. */
  getRegisteredProjects() {
    return this.getAllProjects().then(({ data: allProjects }) => {
      const registered = allProjects.filter(p => state.registeredProjects.has(p.id));
      return { count: registered.length, data: registered };
    });
  },

  /** Send a request (meeting or message) and trigger auto-resolution. */
  sendRequest(requestData) {
    return new Promise((resolve) => {
      const newRequest = {
        id: "req-" + Date.now(),
        timestamp: new Date().toISOString(),
        status: "pending",
        ...requestData
      };

      state.requests.unshift(newRequest);
      this._persistRequests();
      
      // Auto-resolution after 1.5 seconds for realistic chat feel
      setTimeout(() => {
        let finalStatus = "accepted";
        let responseMsg = "";

        if (newRequest.type === 'Meeting') {
            finalStatus = Math.random() > 0.3 ? "accepted" : "rejected";
            this.updateRequestStatus(newRequest.id, finalStatus);
            responseMsg = finalStatus === 'accepted' 
              ? `I am available for our meeting request regarding "${newRequest.reason || 'our upcoming project'}". See you then.`
              : `I'm sorry, my schedule is quite packed. Please check back next week.`;
        } else {
            // AI Chatbot logic based on message content
            const msgLower = (newRequest.message || "").toLowerCase();
            this.updateRequestStatus(newRequest.id, "accepted");

            if (msgLower.includes("hello") || msgLower.includes("hi")) {
                responseMsg = `Hello! How can I help you today?`;
            } else if (msgLower.includes("project") || msgLower.includes("research") || msgLower.includes("thesis")) {
                responseMsg = `That sounds interesting. Have you prepared a proposal document for this?`;
            } else if (msgLower.includes("meeting") || msgLower.includes("meet")) {
                responseMsg = `I'd be happy to meet. Please use the "Request Meeting" button to officially book a slot.`;
            } else if (msgLower.includes("grade") || msgLower.includes("assignment") || msgLower.includes("exam")) {
                responseMsg = `Grades/marks are typically updated by the end of the week. Let me know if you see any discrepancies by Monday.`;
            } else if (msgLower.includes("thank")) {
                responseMsg = `You're welcome! Let me know if you need anything else.`;
            } else if (msgLower.includes("help") || msgLower.includes("stuck") || msgLower.includes("error")) {
                responseMsg = `I understand you're facing an issue. Please come to my office hours or share the specific details so I can take a look.`;
            } else {
                const genericResponses = [
                    "I see. Could you provide a bit more detail on that?",
                    "Understood. Let's discuss this further during my next office hours.",
                    `I've noted that down. I'll get back to you shortly regarding "${newRequest.subject || 'this point'}".`,
                    "Thanks for reaching out. Please send me an email with the specifics and we can take it from there."
                ];
                responseMsg = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            }
        }

        const professorResponse = {
          id: "msg-res-" + Date.now(),
          type: "Message",
          facultyName: newRequest.facultyName,
          subject: newRequest.type === 'Meeting' ? `RE: Meeting Request` : `RE: ${newRequest.subject || 'Message'}`,
          message: responseMsg,
          timestamp: new Date().toISOString(),
          status: "accepted",
          isIncoming: true
        };
        state.requests.unshift(professorResponse);
        this._persistRequests();
        
        // Notify user via toast if it's a meeting (we don't need a toast for every chat message to avoid spam)
        if (newRequest.type === 'Meeting' && typeof interactions !== 'undefined' && interactions.showToast) {
          const type = finalStatus === 'accepted' ? 'success' : 'error';
          interactions.showToast(`Meeting with ${newRequest.facultyName} was ${finalStatus}.`, type);
        }
        
        if (window.renderRequestHistory) window.renderRequestHistory();
      }, 1500);

      resolve(newRequest);
    });
  },

  /** Update status of a specific request. */
  updateRequestStatus(requestId, status) {
    const req = state.requests.find(r => r.id === requestId);
    if (req) {
      req.status = status;
      this._persistRequests();
      
      // Update UI if relevant helpers exist
      if (window.renderRequestHistory) renderRequestHistory();
      if (state.currentFacultyId && window.openFacultyProjects) {
        // Redraw current faculty view to show status change if same faculty
        const currentFaculty = state.allFaculty.find(f => f.id === state.currentFacultyId);
        if (currentFaculty && currentFaculty.name === req.facultyName) {
           openFacultyProjects(state.currentFacultyId);
        }
      }
    }
  },

  /** Clear all request history. */
  clearRequests() {
    state.requests = [];
    this._persistRequests();
    if (window.renderRequestHistory) renderRequestHistory();
    // Refresh current faculty view if open
    if (state.currentFacultyId && window.openFacultyProjects) {
      openFacultyProjects(state.currentFacultyId);
    }
  },

  _persistRequests() {
    localStorage.setItem("requests", JSON.stringify(state.requests));
  }
};
