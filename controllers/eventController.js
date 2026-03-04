const { Event } = require("../dist/classes/Event");

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

module.exports = { addEvent, getEvents, registerStudent };