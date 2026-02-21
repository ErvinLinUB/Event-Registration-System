import { EventDef } from "./EventDef";
import pool from "../db/dbconnection";

export class Event extends EventDef {
  constructor(eventname: string, eventdate: string, maxparticipants: number) {
    super();
    this.setEventName(eventname);
    this.setEventDate(eventdate);
    this.setNumOfParticipantsRegistered(0);
    this.setMaxParticipants(maxparticipants);
  }

  getEventId(): number { return this.eventid; }
  getEventName(): string { return this.eventname; }
  getEventDate(): string { return this.eventdate; }
  getNumOfParticipantsRegistered(): number { return this.numofparticipantsregistered; }
  getMaxParticipants(): number { return this.maxparticipants; }

  setEventId(id: number): void { this.eventid = id; }
  setEventName(name: string): void { this.eventname = name; }
  setEventDate(date: string): void { this.eventdate = date; }
  setNumOfParticipantsRegistered(n: number): void { this.numofparticipantsregistered = n; }
  setMaxParticipants(n: number): void { this.maxparticipants = n; }

  async addEvent(): Promise<number> {
    const result = await pool.query(
      `INSERT INTO events (eventname, eventdate, numofparticipantsregistered, maxparticipants)
       VALUES ($1, $2, $3, $4) RETURNING eventid`,
      [this.eventname, this.eventdate, this.numofparticipantsregistered, this.maxparticipants]
    );
    this.setEventId(result.rows[0].eventid);
    return this.getEventId();
  }
}
