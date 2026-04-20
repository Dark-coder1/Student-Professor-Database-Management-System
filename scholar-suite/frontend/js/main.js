/**
 * main.js — App entry point.
 * Fetches initial data, wires up all event listeners, and boots the UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ── Initial data load ──────────────────────────────────────
  showGridLoading();

  api
    .getFaculty()
    .then(({ data }) => {
      state.allFaculty = data;
      renderCards();
      renderRecentlyViewed();
    })
    .catch((err) => {
      document.getElementById("facultyGrid").innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h3>Could not load faculty</h3>
          <p>${err.message}</p>
        </div>`;
      document.getElementById("resultCount").textContent = "Error";
    });

  // ── Navbar events ──────────────────────────────────────────

  // Brand click → back to directory
  document.getElementById("navBrand").addEventListener("click", closeProjects);

  // Search
  document
    .getElementById("searchInput")
    .addEventListener("input", onSearchInput);

  // Department filter button
  document
    .getElementById("filterBtn")
    .addEventListener("click", toggleFilterDropdown);

  // Department checkboxes
  document
    .querySelectorAll("#filterDropdown input[type=checkbox]")
    .forEach((cb) => cb.addEventListener("change", onDeptCheckboxChange));

  // Bookmark toggle
  document
    .getElementById("bookmarkToggle")
    .addEventListener("click", toggleBookmarkView);

  // My Projects button
  document
    .getElementById("myProjectsBtn")
    .addEventListener("click", openMyProjects);

  // History Sidebar Events
  document.getElementById("historyToggle").addEventListener("click", openHistory);
  document.getElementById("historyClose").addEventListener("click", closeHistory);
  document.getElementById("clearHistoryBtn").addEventListener("click", clearRecentlyViewed);

  // Requests Sidebar Events
  document.getElementById("requestsToggle").addEventListener("click", openRequests);
  document.getElementById("requestsClose").addEventListener("click", closeRequests);

  // Auth Events
  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);

  // ── Initial setup ──────────────────────────────────────────
  checkAuth();
  
  // ── Projects page events ───────────────────────────────────

  document.getElementById("backBtn").addEventListener("click", closeProjects);

  // Keyboard: Escape closes things
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjects();
      closeHistory();
    }
  });
});

/** Open the history sidebar. */
function openHistory() {
  document.getElementById("historySidebar").classList.add("open");
  // Create and show overlay if it doesn't exist
  let overlay = document.getElementById("historyOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "historyOverlay";
    overlay.className = "history-sidebar-overlay";
    overlay.addEventListener("click", closeHistory);
    document.body.appendChild(overlay);
  }
  setTimeout(() => overlay.classList.add("active"), 10);
}

/** Close the history sidebar. */
function closeHistory() {
  document.getElementById("historySidebar").classList.remove("open");
  const overlay = document.getElementById("historyOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    setTimeout(() => overlay.remove(), 300);
  }
}

/** Open the requests sidebar. */
function openRequests() {
  renderRequestHistory();
  document.getElementById("requestsSidebar").classList.add("open");
  // Use history overlay logic
  let overlay = document.getElementById("historyOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "historyOverlay";
    overlay.className = "history-sidebar-overlay";
    overlay.addEventListener("click", closeRequests);
    document.body.appendChild(overlay);
  } else {
    // If already there, ensure it closes requests
    overlay.onclick = closeRequests;
  }
  setTimeout(() => overlay.classList.add("active"), 10);
}

/** Close the requests sidebar. */
function closeRequests() {
  document.getElementById("requestsSidebar").classList.remove("open");
  const overlay = document.getElementById("historyOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    setTimeout(() => overlay.remove(), 300);
  }
}

/** Check authentication status and update UI. */
function checkAuth() {
  const loginScreen = document.getElementById("loginScreen");
  if (state.isLoggedIn) {
    loginScreen.classList.remove("active");
    document.body.classList.remove("auth-required");
    updateUserUI();
  } else {
    loginScreen.classList.add("active");
    document.body.classList.add("auth-required");
  }
}

/** Handle login form submission. */
function handleLogin(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById("userNameInput").value;
  state.userName = nameInput || "User";
  state.isLoggedIn = true;
  
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", state.userName);
  
  if (typeof interactions !== 'undefined') {
    interactions.showToast(`Welcome back, ${state.userName.split(' ')[0]}!`, "success");
  }
  
  checkAuth();
}

/** Handle logout. */
function handleLogout() {
  if (!confirm("Are you sure you want to log out?")) return;
  
  state.isLoggedIn = false;
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  
  checkAuth();
  
  if (typeof interactions !== 'undefined') {
    interactions.showToast("Logged out successfully.", "success");
  }
}

/** Update the student profile pill with the actual user data. */
function updateUserUI() {
  const nameDisplay = document.getElementById("studentNameDisplay");
  const avatarDisplay = document.getElementById("studentAvatar");
  
  if (nameDisplay) nameDisplay.textContent = state.userName;
  
  if (avatarDisplay) {
    const names = state.userName.trim().split(' ');
    const initials = names.length > 1 
      ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
      : names[0].substring(0, 2).toUpperCase();
    avatarDisplay.textContent = initials;
  }
}
