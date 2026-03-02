const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

// Transform Supabase row to frontend format
function transformFacultyRow(row) {
  let photoUrl = null;
  if (row.pics) {
    // If pics is already a full URL, use it as-is
    if (row.pics.startsWith("http")) {
      photoUrl = row.pics;
    } else {
      // Otherwise, generate the public URL using Supabase
      const { data } = supabase
        .storage
        .from("photos")
        .getPublicUrl(row.pics);
      photoUrl = data?.publicUrl || null;
    }
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    department: row.department,
    dept: row.department,
    deptLabel: row.department,
    office_address: row.office_address,
    photo: photoUrl,
    emoji: "👤",
    title: row.title || "",
    phone: row.phone || "",
    free: row.free || [],
    busy: row.busy || [],
  };
}

// GET /api/faculty — all faculty, supports ?dept= and ?q= filters
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("faculty").select("*");

    if (error) throw error;

    let result = (data || []).map(transformFacultyRow);
    const { dept, q } = req.query;

    if (dept) {
      const depts = dept.toUpperCase().split(",");
      result = result.filter((f) => depts.includes(f.department.toUpperCase()));
    }

    if (q) {
      const query = q.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          f.department.toLowerCase().includes(query) ||
          f.title.toLowerCase().includes(query)
      );
    }

    res.json({ count: result.length, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/faculty/:id — single faculty member
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data, error } = await supabase
      .from("faculty")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(transformFacultyRow(data));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
