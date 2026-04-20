const express = require("express");
const router = express.Router();
const departmentProjects = require("../data/departmentProjects");
const supabase = require("../db/supabase");

// Normalize department name to match our departmentProjects keys
function normalizeDepartment(dept) {
  if (!dept) return null;
  
  // Direct match
  if (departmentProjects[dept]) return dept;
  
  // Trim and match
  const trimmed = dept.trim();
  if (departmentProjects[trimmed]) return trimmed;
  
  // Try to find partial match
  const deptLower = dept.toLowerCase();
  for (const key of Object.keys(departmentProjects)) {
    if (key.toLowerCase().includes(deptLower) || deptLower.includes(key.toLowerCase())) {
      return key;
    }
  }
  
  return null;
}

// GET /api/projects — all projects across all departments
router.get("/", async (req, res) => {
  try {
    const all = [];
    Object.entries(departmentProjects).forEach(([dept, projs]) => {
      if (Array.isArray(projs)) {
        projs.forEach((p) => {
          if (p && typeof p === 'object') {
            all.push({
              ...p,
              department: dept,
            });
          }
        });
      }
    });

    // Optional filter by status
    const { status } = req.query;
    const result = status 
      ? all.filter((p) => p && p.status === status) 
      : all;

    res.json({ count: result.length, data: result || [] });
  } catch (err) {
    console.error("Error in GET /api/projects:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/faculty/:id — all projects for a specific faculty member (by their department)
router.get("/faculty/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Fetch faculty from Supabase
    const { data: member, error } = await supabase
      .from("faculty")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !member) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    // Normalize the department name
    const normalizedDept = normalizeDepartment(member.department);
    
    // Get projects for this faculty member's department
    let deptProjects = [];
    if (normalizedDept) {
      deptProjects = departmentProjects[normalizedDept] || [];
    }
    
    // Ensure we return an array
    if (!Array.isArray(deptProjects)) {
      deptProjects = [];
    }

    res.json({
      faculty: {
        id: member.id,
        name: member.name,
        email: member.email,
        department: member.department,
        office_address: member.office_address,
        cabin: (member.cabin_number || member.cabin || member.office_address || "").toString().trim(),
      },
      count: deptProjects.length,
      data: deptProjects,
    });
  } catch (err) {
    console.error("Error in GET /api/projects/faculty/:id:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/projects/:projectId — single project by its id string
router.get("/:projectId", (req, res) => {
  try {
    const { projectId } = req.params;
    
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    
    for (const projs of Object.values(departmentProjects)) {
      if (Array.isArray(projs)) {
        const found = projs.find((p) => p && p.id === projectId);
        if (found) return res.json(found);
      }
    }
    
    res.status(404).json({ error: "Project not found" });
  } catch (err) {
    console.error("Error in GET /api/projects/:projectId:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
