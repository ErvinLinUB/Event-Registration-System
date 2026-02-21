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

const getEvent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await pool.query(
      `SELECT eventid, eventname, eventdate, numofparticipantsregistered, maxparticipants
       FROM events WHERE eventid = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(result.rows[0]);
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

module.exports = {
  addEvent,
  getEvent,
  updateEvent
};
