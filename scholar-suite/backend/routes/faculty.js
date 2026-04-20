const express = require("express");
const router = express.Router();
const supabase = require("../db/supabase");

// Generate random free timings (1-2 slots per week, 1-2 hours each, 9 AM to 6 PM)
function generateFreeTimings() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM to 5 PM (slots ending by 6 PM)
  const timeDurations = [1, 2]; // 1 or 2 hour slots
  
  // Randomly select 1 or 2 days
  const slotsCount = Math.random() > 0.5 ? 1 : 2;
  const selectedDays = [];
  
  // Pick random unique days
  while (selectedDays.length < slotsCount) {
    const randomDay = days[Math.floor(Math.random() * days.length)];
    if (!selectedDays.includes(randomDay)) {
      selectedDays.push(randomDay);
    }
  }
  
  // Generate time slots for each day
  const slots = [];
  selectedDays.forEach(day => {
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    const duration = timeDurations[Math.floor(Math.random() * timeDurations.length)];
    const startHour = randomHour;
    const endHour = startHour + duration;
    
    // Format time with AM/PM
    const formatTime = (hour) => {
      if (hour < 12) {
        return { hour: hour === 0 ? 12 : hour, period: "AM" };
      } else if (hour === 12) {
        return { hour: 12, period: "PM" };
      } else {
        return { hour: hour - 12, period: "PM" };
      }
    };
    
    const startTime = formatTime(startHour);
    const endTime = formatTime(endHour);
    
    slots.push(`${day} ${startTime.hour} ${startTime.period}–${endTime.hour} ${endTime.period}`);
  });
  
  return slots;
}

// Generate a random 10-digit Indian mobile number (starting with 6, 7, 8, or 9)
function generateIndianPhoneNumber() {
  // First digit must be 6, 7, 8, or 9
  const firstDigit = [6, 7, 8, 9][Math.floor(Math.random() * 4)];
  // Generate remaining 9 random digits
  const remainingDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join("");
  const fullNumber = firstDigit + remainingDigits;
  // Format as +91 XXXXX XXXXX (Indian format)
  return `+91 ${fullNumber.substring(0, 5)} ${fullNumber.substring(5)}`;
}

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
    cabin: (row.cabin_number || row.cabin || row.office_address || "").toString().trim(),
    photo: photoUrl,
    emoji: "👤",
    title: row.title || "",
    phone: row.phone || generateIndianPhoneNumber(),
    free: row.free && row.free.length > 0 ? row.free : generateFreeTimings(),
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
