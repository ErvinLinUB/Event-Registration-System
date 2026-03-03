import { StudentDef } from "./StudentDef";
import pool from "../db/dbconnection";

export class Student extends StudentDef {
  constructor(firstname?: string, lastname?: string, department?: string) {
    super();
    if (firstname) this.setFirstName(firstname);
    if (lastname) this.setLastName(lastname);
    if (department) this.setDepartment(department);
  }

  getStudentId(): number { return this.studentid; }
  getFirstName(): string { return this.firstname; }
  getLastName(): string { return this.lastname; }
  getDepartment(): string { return this.department; }

  setStudentId(id: number): void { this.studentid = id; }
  setFirstName(firstname: string): void { this.firstname = firstname; }
  setLastName(lastname: string): void { this.lastname = lastname; }
  setDepartment(department: string): void { this.department = department; }

  async addStudent(): Promise<number> {
    const result = await pool.query(
      `INSERT INTO students (firstname, lastname, department) VALUES ($1, $2, $3) RETURNING studentid`,
      [this.firstname, this.lastname, this.department]
    );
    this.setStudentId(result.rows[0].studentid);
    return this.getStudentId();
  }

  async getStudents(): Promise<any[]> {
    const result = await pool.query(
      `SELECT studentid, firstname, lastname, department FROM students`
    );
    return result.rows;
  }

  async getStudentById(id: number): Promise<any> {
    const result = await pool.query(
      `SELECT studentid, firstname, lastname, department FROM students WHERE studentid = $1`,
      [id]
    );
    return result.rows[0] || null;
  }
}