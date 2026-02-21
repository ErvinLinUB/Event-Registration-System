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
        this.setEventName(eventname);
        this.setEventDate(eventdate);
        this.setNumOfParticipantsRegistered(0);
        this.setMaxParticipants(maxparticipants);
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
        const result = await dbconnection_1.default.query(`INSERT INTO events (eventname, eventdate, numofparticipantsregistered, maxparticipants)
       VALUES ($1, $2, $3, $4) RETURNING eventid`, [this.eventname, this.eventdate, this.numofparticipantsregistered, this.maxparticipants]);
        this.setEventId(result.rows[0].eventid);
        return this.getEventId();
    }
}
exports.Event = Event;
