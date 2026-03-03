const { Event } = require("../dist/classes/Event");
const pool = require("../db/dbConnection");

const addEvent = async (req, res) => {
  try {
    const { eventname, eventdate, maxparticipants } = req.body;
    const event = new Event(eventname, eventdate, Number(maxparticipants));
    const id = await event.addEvent();
    res.json({ eventid: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add event" });
  }
};

const getEvents = async (req, res) => {
  try {
    const event = new Event();
    const events = await event.getEvents();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

const getEvent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const event = new Event();
    const result = await event.getEventById(id);
    if (!result) return res.status(404).json({ error: "Event not found" });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { eventname, eventdate, maxparticipants } = req.body;
    const result = await pool.query(
      `UPDATE events SET eventname=$1, eventdate=$2, maxparticipants=$3 WHERE eventid=$4 RETURNING eventid`,
      [eventname, eventdate, Number(maxparticipants), id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json({ eventid: result.rows[0].eventid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
};

const registerStudent = async (req, res) => {
  try {
    const { studentId, eventId } = req.body;
    await Event.registerStudent(Number(studentId), Number(eventId));
    res.json({ message: "Student registered to event" });
  } catch (err) {
    console.error(err);
    const status = err.message === "Event not found" ? 404 : 400;
    res.status(status).json({ error: err.message || "Failed to register student" });
  }
};

module.exports = { addEvent, getEvents, getEvent, updateEvent, registerStudent };