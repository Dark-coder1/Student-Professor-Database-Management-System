/**
 * state.js — Single source of truth for UI state.
 * All other modules read from and write to this object.
 */

const state = {
  /** Full faculty list as returned from the API */
  allFaculty: [],

  /** Currently displayed (filtered) faculty */
  filtered: [],

  /** Set of bookmarked faculty IDs */
  bookmarks: new Set(JSON.parse(localStorage.getItem("bookmarks") || "[]")),

  /** Whether the Saved filter is active */
  showBookmarked: false,

  /** Set of active department filter strings e.g. "CSE", "ECE" */
  activeDepts: new Set(),

  /** Set of active campus filter strings e.g. "on-campus", "off-campus" */
  activeCampusFilters: new Set(),

  /** Current search query string */
  searchQuery: "",

  /** ID of the faculty whose projects page is open (null = closed) */
  currentFacultyId: null,

  /** Recently viewed faculty IDs (up to 10) */
  recentlyViewed: JSON.parse(localStorage.getItem("recentlyViewed") || "[]"),

  /** IDs of projects the student has registered for */
  registeredProjects: new Set(JSON.parse(localStorage.getItem("registeredProjects") || "[]")),

  /** Interaction requests sent by the student */
  requests: JSON.parse(localStorage.getItem("requests") || "[]"),

  /** Authentication status */
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

  /** User Profile Data */
  userName: localStorage.getItem("userName") || "Arjun M.",
};
