import { db } from "../config/db.js";

import dotenv from "dotenv";
dotenv.config();

export const addDoctor = async (req, res) => {
  try {
    const { name, specialization, status } = req.body;

    console.log("name, specialization, status ", name, specialization, status);

    await db.query(
      "INSERT INTO doctors (name, specialization, status) VALUES (?,?,?)",
      [name, specialization, status || "active"]
    );

    res.json({ message: "Doctor added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDoctors = async (req, res) => {
  try {
    const { id, status } = req.params;

    let newstatus = status == "active" ? "inactive" : "active";
    await db.query("UPDATE doctors SET status = ? WHERE id = ?", [
      newstatus,
      id,
    ]);

    res.json({ message: "Doctor updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    const query = "SELECT * FROM doctors WHERE status='active'";

    if (specialization) {
      query =
        "SELECT * FROM doctors WHERE specialization=? AND status='active'";
    }

    const [doctor] = await db.query(
      query,
      specialization ? [specialization] : []
    );
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDoctorsAdmin = async (req, res) => {
  try {
    const { specialization } = req.query;
    const query = "SELECT * FROM doctors";

    if (specialization) {
      query =
        "SELECT * FROM doctors WHERE specialization=? AND status='active'";
    }

    const [doctor] = await db.query(
      query,
      specialization ? [specialization] : []
    );
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getDoctor = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.json({ message: "invalid doctor id!" });
    }
    const query = "SELECT * FROM doctors WHERE id=? AND status='active'";
    const doctor = await db.query(query, id ? [id] : []);
    res.json(doctor[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setOfficeHours = async (req, res) => {
  const { id, weekday, start_time, end_time } = req.body;

  console.log("id, weekday, start_time, end_time",id, weekday, start_time, end_time);
  

  try {
    const [existing] = await db.query(
      "SELECT * FROM office_hours WHERE doctor_id=? AND weekday=?",
      [doctor_id, weekday]
    );

    if (existing.length) {
      // Update existing
      await db.query(
        "UPDATE office_hours SET start_time=?, end_time=? WHERE doctor_id=? AND weekday=?",
        [start_time, end_time, doctor_id, weekday]
      );
    } else {
      // Insert new
      await db.query(
        "INSERT INTO office_hours (doctor_id, weekday, start_time, end_time) VALUES (?,?,?,?)",
        [doctor_id, weekday, start_time, end_time]
      );
    }

    res.json({ message: "Office hours saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all office hours for a doctor
export const getOfficeHours = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM office_hours WHERE doctor_id=? ORDER BY weekday ASC",
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------------------------------------------------

export const addOverride = async (req, res) => {
  try {
    let { doctor_id, date, start_time, end_time, is_closed } = req.body;

    console.log(date, "date-----------");

    // ✅ Fix: Only strip time if frontend sends ISO format
    if (typeof date === "string" && date.includes("T")) {
      date = date.split("T")[0]; // remove time part if accidentally sent
    }

    console.log("Using date:", date);

    const [existing] = await db.query(
      "SELECT * FROM overrides WHERE doctor_id=? AND date=?",
      [doctor_id, date]
    );

    console.log(...existing, "existing---existing");

    if (existing.length) {
      await db.query("DELETE FROM overrides WHERE doctor_id=? AND date=?", [
        doctor_id,
        date,
      ]);
    }
    await db.query(
      "INSERT INTO overrides (doctor_id, date, start_time, end_time, is_closed) VALUES (?,?,?,?,?)",
      [doctor_id, date, start_time, end_time, is_closed]
    );
    res.json({ message: "Override saved successfully" });

  } catch (err) {
    console.error("Error in addOverride:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get overrides for a specific doctor
export const getOverrides = async (req, res) => {
  const { doctor_id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM overrides WHERE doctor_id=? ORDER BY date DESC",
      [doctor_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
