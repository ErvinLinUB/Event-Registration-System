"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const EventDef_1 = require("./EventDef");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
class Event extends EventDef_1.EventDef {
    constructor(eventname, eventdate, maxparticipants) {
        super();
        if (eventname) this.setEventName(eventname);
        if (eventdate) this.setEventDate(eventdate);
        if (maxparticipants !== undefined) {
            this.setNumOfParticipantsRegistered(0);
            this.setMaxParticipants(maxparticipants);
        }
    }
    getEventId() { return this.eventid; }
    getEventName() { return this.eventname; }
    getEventDate() { return this.eventdate; }
    getNumOfParticipantsRegistered() { return this.numofparticipantsregistered; }
    getMaxParticipants() { return this.maxparticipants; }
    setEventId(id) { this.eventid = id; }
    setEventName(name) { this.eventname = name; }
    setEventDate(date) { this.eventdate = date; }
    setNumOfParticipantsRegistered(n) { this.numofparticipantsregistered = n; }
    setMaxParticipants(n) { this.maxparticipants = n; }
    async addEvent() {
        const result = await dbconnection_1.default.query(
            `INSERT INTO events (eventname, eventdate, numofparticipantsregistered, maxparticipants) VALUES ($1, $2, $3, $4) RETURNING eventid`,
            [this.eventname, this.eventdate, this.numofparticipantsregistered, this.maxparticipants]
        );
        this.setEventId(result.rows[0].eventid);
        return this.getEventId();
    }
    static async registerStudent(studentId, eventId) {
        const existing = await dbconnection_1.default.query(
            `SELECT * FROM registrations WHERE studentid = $1`,
            [studentId]
        );
        if (existing.rows.length > 0) throw new Error("Student already registered to an event");
        const ev = await dbconnection_1.default.query(
            `SELECT numofparticipantsregistered, maxparticipants FROM events WHERE eventid = $1`,
            [eventId]
        );
        if (ev.rows.length === 0) throw new Error("Event not found");
        const { numofparticipantsregistered, maxparticipants } = ev.rows[0];
        if (numofparticipantsregistered >= maxparticipants) throw new Error("Event is full");
        await dbconnection_1.default.query(
            `INSERT INTO registrations (studentid, eventid) VALUES ($1, $2)`,
            [studentId, eventId]
        );
        await dbconnection_1.default.query(
            `UPDATE events SET numofparticipantsregistered = numofparticipantsregistered + 1 WHERE eventid = $1`,
            [eventId]
        );
    }
}
exports.Event = Event;