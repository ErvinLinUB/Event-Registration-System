"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const StudentDef_1 = require("./StudentDef");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
class Student extends StudentDef_1.StudentDef {
    constructor(firstname, lastname, department) {
        super();
        if (firstname) this.setFirstName(firstname);
        if (lastname) this.setLastName(lastname);
        if (department) this.setDepartment(department);
    }
    getStudentId() { return this.studentid; }
    getFirstName() { return this.firstname; }
    getLastName() { return this.lastname; }
    getDepartment() { return this.department; }
    setStudentId(id) { this.studentid = id; }
    setFirstName(firstname) { this.firstname = firstname; }
    setLastName(lastname) { this.lastname = lastname; }
    setDepartment(department) { this.department = department; }
    async addStudent() {
        const result = await dbconnection_1.default.query(
            `INSERT INTO students (firstname, lastname, department) VALUES ($1, $2, $3) RETURNING studentid`,
            [this.firstname, this.lastname, this.department]
        );
        this.setStudentId(result.rows[0].studentid);
        return this.getStudentId();
    }
    async getStudents() {
        const result = await dbconnection_1.default.query(
            `SELECT studentid, firstname, lastname, department FROM students`
        );
        return result.rows;
    }
    async getStudentById(id) {
        const result = await dbconnection_1.default.query(
            `SELECT studentid, firstname, lastname, department FROM students WHERE studentid = $1`,
            [id]
        );
        return result.rows[0] || null;
    }
}
exports.Student = Student;