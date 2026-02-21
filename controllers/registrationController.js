const pool = require("../db/dbConnection");

const registerStudent = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    const sid = Number(studentId);
    const eid = Number(eventId);

    // Check if student already registered to any event
    const existing = await pool.query(`SELECT * FROM registrations WHERE studentid = $1`, [sid]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Student already registered to an event" });
    }

    // Check event capacity
    const ev = await pool.query(
      `SELECT numofparticipantsregistered, maxparticipants FROM events WHERE eventid = $1`,
      [eid]
    );
    if (ev.rows.length === 0) return res.status(404).json({ error: "Event not found" });
    const { numofparticipantsregistered, maxparticipants } = ev.rows[0];
    if (numofparticipantsregistered >= maxparticipants) return res.status(400).json({ error: "Event is full" });

    // Insert registration
    await pool.query(`INSERT INTO registrations (studentid, eventid) VALUES ($1, $2)`, [sid, eid]);

    // Update event count
    await pool.query(
      `UPDATE events SET numofparticipantsregistered = numofparticipantsregistered + 1 WHERE eventid = $1`,
      [eid]
    );

    res.json({ message: "Student registered to event" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register student" });
  }
};

module.exports = { registerStudent };
