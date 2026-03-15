/**
 * projects.js — Full-page projects view.
 * Handles open/close and rendering of per-faculty and all-faculty project pages.
 */

/** Open the projects page for a specific faculty member. */
function openFacultyProjects(facultyId) {
  state.currentFacultyId = facultyId;

  const page = document.getElementById("projectsPage");
  const body = document.getElementById("projectsBody");
  const title = document.getElementById("projectsTitle");

  // Show page immediately with a loader
  title.innerHTML = "Projects — <span>Loading…</span>";
  body.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Fetching projects…</p>
    </div>`;
  page.classList.add("open");
  page.scrollTop = 0;

  // Track history
  addToRecentlyViewed(facultyId);

  api
    .getProjectsByFaculty(facultyId)
    .then(({ faculty, data: projects }) => {
      // Cache project count on faculty object so the card can show it
      const f = state.allFaculty.find((x) => x.id === facultyId);
      if (f) f.projectCount = projects.length;

      title.innerHTML = `Projects — <span>${faculty.name}</span>`;
      body.innerHTML = buildFacultyProjectsHTML(faculty, projects);
    })
    .catch((err) => {
      body.innerHTML = `<p style="padding:40px;color:var(--terracotta)">Error loading projects: ${err.message}</p>`;
    });
}

/** Open the projects page showing only projects the student has registered for. */
function openMyProjects() {
  const page = document.getElementById("projectsPage");
  const body = document.getElementById("projectsBody");
  const title = document.getElementById("projectsTitle");

  title.innerHTML = "Projects — <span>My Registered Projects</span>";
  body.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading your projects…</p>
    </div>`;
  page.classList.add("open");
  page.scrollTop = 0;

  // Fetch registered projects
  api
    .getRegisteredProjects()
    .then(({ data: myProjects }) => {
      if (myProjects.length === 0) {
        body.innerHTML = `
          <div class="empty-state" style="padding: 100px 40px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64" style="margin-bottom: 20px; color: var(--ink-muted);">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            <h3>No Registered Projects</h3>
            <p>You haven't registered for any projects yet. Browse faculty profiles to find open projects!</p>
            <button class="btn-interaction" style="margin-top: 20px;" onclick="closeProjects()">Explore Directory</button>
          </div>`;
        return;
      }

      // Group by department
      const groups = {};
      myProjects.forEach((p) => {
        const dept = p.department || "Other";
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(p);
      });

      // Extract short department code from full name for CSS class
      const getDeptCode = (deptName) => {
        const match = (deptName || "").match(/\(([A-Z]+)\)$/);
        return match ? match[1].toLowerCase() : "unknown";
      };

      const groupsHTML = Object.entries(groups)
        .map(([dept, projects]) => buildDepartmentGroupHTML(dept, projects, getDeptCode(dept)))
        .join("");

      body.innerHTML = `
        <div class="projects-section-title" style="margin-bottom:40px;">
          My Registered Research &amp; Student Projects
        </div>
        ${groupsHTML}`;
    })
    .catch((err) => {
      console.error("Error loading my projects:", err);
      body.innerHTML = `<p style="padding:40px;color:var(--terracotta)">Error: ${err.message}</p>`;
    });
}

/** Close the projects page and return to the directory. */
function closeProjects() {
  document.getElementById("projectsPage").classList.remove("open");
  state.currentFacultyId = null;
}

/** Add a faculty ID to the recently viewed list. */
function addToRecentlyViewed(facultyId) {
  // Remove if already exists (to move to top)
  state.recentlyViewed = state.recentlyViewed.filter(id => id !== facultyId);
  
  // Add to beginning
  state.recentlyViewed.unshift(facultyId);
  
  // Cap at 10
  if (state.recentlyViewed.length > 10) {
    state.recentlyViewed.pop();
  }
  
  // Persist
  localStorage.setItem("recentlyViewed", JSON.stringify(state.recentlyViewed));
  
  // Update UI if render RecentlyViewed exists
  if (window.renderRecentlyViewed) renderRecentlyViewed();
}

/** Clear all history. */
function clearRecentlyViewed() {
  state.recentlyViewed = [];
  localStorage.setItem("recentlyViewed", JSON.stringify([]));
  if (window.renderRecentlyViewed) renderRecentlyViewed();
}

// ── HTML builders ────────────────────────────────────────────

/** Build HTML for a department section with all its projects. */
function buildDepartmentGroupHTML(deptName, projects, deptKey) {
  return `
    <div class="department-group">
      <div class="department-group-header">
        <div class="department-group-name">${deptName}</div>
        <div class="department-group-count">${projects.length} Project${projects.length !== 1 ? "s" : ""}</div>
      </div>
      <div class="projects-grid">
        ${projects.map((p) => buildProjectCardHTML(p, deptKey)).join("")}
      </div>
    </div>`;
}

function buildFacultyProjectsHTML(faculty, projects) {
  // Extract short department code from full department name
  const getDeptCode = (deptName) => {
    const match = (deptName || "").match(/\(([A-Z]+)\)$/);
    return match ? match[1].toLowerCase() : (deptName || "unknown").toLowerCase();
  };
  
  const deptKey = getDeptCode(faculty.department || faculty.deptLabel || "");
  
  return `
    <div class="proj-faculty-hero">
      <div class="proj-faculty-photo">${faculty.emoji || "👤"}</div>
      <div>
        <div class="proj-faculty-name">${faculty.name}</div>
        <div class="proj-faculty-sub">${faculty.title} · ${faculty.deptLabel || faculty.department}</div>
        <span class="proj-count-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          ${projects.length} Registered Project${projects.length !== 1 ? "s" : ""}
        </span>
        <div class="interaction-actions">
          <button class="btn-interaction btn-meeting" onclick="interactions.openModal('meetingModal', '${faculty.name.replace(/'/g, "\\'")}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Request Meeting
          </button>
          <button class="btn-interaction btn-message" onclick="interactions.openModal('messageModal', '${faculty.name.replace(/'/g, "\\'")}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Send Message
          </button>
        </div>
      </div>
    </div>
    <div class="projects-section-title">Research &amp; Student Projects</div>
    <div class="projects-grid">
      ${projects.length > 0 
        ? projects.map((p) => buildProjectCardHTML(p, deptKey)).join("")
        : `<div style="padding: 40px; text-align: center; color: var(--ink-muted);">
             No projects available for this department yet.
           </div>`}
    </div>

    <!-- Recent Requests Section -->
    <div class="projects-section-title" style="margin-top: 60px;">Recent Requests to ${faculty.name}</div>
    <div class="requests-faculty-list">
      ${renderFacultyRequests(faculty.name)}
    </div>`;
}

/** Render requests sent specifically to this faculty. */
function renderFacultyRequests(facultyName) {
  const relevant = state.requests.filter(r => r.facultyName === facultyName);
  
  if (relevant.length === 0) {
    return `<div style="padding: 30px; border: 1px dashed var(--border-md); border-radius: 8px; text-align: center; color: var(--ink-muted); font-size: 0.9rem;">
              You haven't sent any requests to ${facultyName} yet.
            </div>`;
  }

  return relevant.map(req => {
    const date = new Date(req.timestamp).toLocaleDateString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' });
    const typeLabel = req.type === 'Meeting' ? '📅 Meeting' : '✉️ Message';
    
    return `
      <div class="history-item request-item status-${req.status}" style="margin-bottom: 12px; border-radius: 8px; background: white; border: 1px solid var(--border); border-left: 4px solid transparent;">
        <style>
          .status-pending { border-left-color: var(--gold) !important; }
          .status-accepted { border-left-color: var(--forest) !important; }
          .status-rejected { border-left-color: var(--terracotta) !important; }
        </style>
        <div class="history-info">
          <div class="history-name" style="font-size:0.95rem;">${typeLabel} <span class="req-status-pill">${req.status}</span></div>
          <div class="history-subject" style="font-size:0.75rem;">Sent on ${date}</div>
          <div class="req-preview" style="font-size:0.8rem; margin-top:8px;">
            ${req.type === 'Meeting' ? `Requested for: ${new Date(req.dateTime).toLocaleString()}` : `Subject: ${req.subject}`}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function buildProjectCardHTML(p, deptKey) {
  const statusLabels = {
    ongoing:   "Ongoing",
    completed: "Completed",
    open:      "Open for Students",
  };

  const isRegistered = state.registeredProjects.has(p.id);

  const tags = (p.tags || [])
    .map((t) => `<span class="proj-tag">${t}</span>`)
    .join("");

  const studentsHTML =
    p.students > 0
      ? `<div class="proj-students">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
             <circle cx="9" cy="7" r="4"/>
             <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
             <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
           </svg>
           ${p.students} student${p.students !== 1 ? "s" : ""}
         </div>`
      : `<div class="proj-students open-slot">Open — join now</div>`;

  let actionButton = "";
  if (isRegistered) {
    actionButton = `
      <div class="proj-action-group">
        <div class="proj-registered-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="12" height="12">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Registered
        </div>
        <button class="btn-unregister" onclick="unregisterFromProject('${p.id}', this)">
          Unregister
        </button>
      </div>`;
  } else if (p.status === "open") {
    actionButton = `
      <button class="btn-register" onclick="registerForProject('${p.id}', this)">
        Register
      </button>`;
  }

  return `
  <div class="project-card proj-${deptKey} ${isRegistered ? 'registered' : ''}">
    <div class="proj-status ${p.status}">${statusLabels[p.status] || p.status}</div>
    <div class="proj-title">${p.title}</div>
    <div class="proj-desc">${p.desc}</div>
    <div class="proj-tags">${tags}</div>
    <div class="proj-meta">
      ${studentsHTML}
      <span>${p.year}</span>
    </div>
    ${actionButton ? `<div class="proj-footer">${actionButton}</div>` : ""}
  </div>`;
}

/** Handle registration button click. */
function registerForProject(projectId, buttonEl) {
  buttonEl.disabled = true;
  buttonEl.innerHTML = `<div class="loading-spinner" style="width:14px;height:14px;border-width:2px;margin:0;"></div>`;
  
  api.registerForProject(projectId)
    .then(() => {
      if (typeof interactions !== 'undefined' && interactions.showToast) {
        interactions.showToast("Successfully registered for project!");
      }

      // Re-render current view
      if (state.currentFacultyId) {
        openFacultyProjects(state.currentFacultyId);
      } else {
        openMyProjects();
      }
    })
    .catch(err => {
      buttonEl.disabled = false;
      buttonEl.textContent = "Register";
      console.error("Registration failed:", err);
    });
}

/** Handle unregistration button click. */
function unregisterFromProject(projectId, buttonEl) {
  if (!confirm("Are you sure you want to unregister from this project?")) return;

  buttonEl.disabled = true;
  buttonEl.innerHTML = `<div class="loading-spinner" style="width:14px;height:14px;border-width:2px;margin:0;"></div>`;
  
  api.unregisterFromProject(projectId)
    .then(() => {
      if (typeof interactions !== 'undefined' && interactions.showToast) {
        interactions.showToast("Successfully unregistered from project.");
      }

      // Re-render current view
      if (state.currentFacultyId) {
        openFacultyProjects(state.currentFacultyId);
      } else {
        openMyProjects();
      }
    })
    .catch(err => {
      buttonEl.disabled = false;
      buttonEl.textContent = "Unregister";
      console.error("Unregistration failed:", err);
    });
}
