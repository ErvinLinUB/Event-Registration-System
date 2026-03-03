import { EventDef } from "./EventDef";
import pool from "../db/dbconnection";

export class Event extends EventDef {
  constructor(eventname?: string, eventdate?: string, maxparticipants?: number) {
    super();
    if (eventname) this.setEventName(eventname);
    if (eventdate) this.setEventDate(eventdate);
    if (maxparticipants !== undefined) {
      this.setNumOfParticipantsRegistered(0);
      this.setMaxParticipants(maxparticipants);
    }
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
      `INSERT INTO events (eventname, eventdate, numofparticipantsregistered, maxparticipants) VALUES ($1, $2, $3, $4) RETURNING eventid`,
      [this.eventname, this.eventdate, this.numofparticipantsregistered, this.maxparticipants]
    );
    this.setEventId(result.rows[0].eventid);
    return this.getEventId();
  }

  async getEvents(): Promise<any[]> {
    const result = await pool.query(
      `SELECT eventid, eventname, eventdate, numofparticipantsregistered, maxparticipants FROM events`
    );
    return result.rows;
  }

  async getEventById(id: number): Promise<any> {
    const result = await pool.query(
      `SELECT eventid, eventname, eventdate, numofparticipantsregistered, maxparticipants FROM events WHERE eventid = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async registerStudent(studentId: number, eventId: number): Promise<void> {
    const existing = await pool.query(
      `SELECT * FROM registrations WHERE studentid = $1`,
      [studentId]
    );
    if (existing.rows.length > 0) throw new Error("Student already registered to an event");

    const ev = await pool.query(
      `SELECT numofparticipantsregistered, maxparticipants FROM events WHERE eventid = $1`,
      [eventId]
    );
    if (ev.rows.length === 0) throw new Error("Event not found");
    const { numofparticipantsregistered, maxparticipants } = ev.rows[0];
    if (numofparticipantsregistered >= maxparticipants) throw new Error("Event is full");

    await pool.query(
      `INSERT INTO registrations (studentid, eventid) VALUES ($1, $2)`,
      [studentId, eventId]
    );
    await pool.query(
      `UPDATE events SET numofparticipantsregistered = numofparticipantsregistered + 1 WHERE eventid = $1`,
      [eventId]
    );
  }
}