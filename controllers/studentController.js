const { Student } = require("../dist/classes/Student");
const pool = require("../db/dbConnection");

const addStudent = async (req, res) => {
  try {
    const { firstname, lastname, department } = req.body;
    const student = new Student(firstname, lastname, department);
    const id = await student.addStudent();
    res.json({ studentid: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add student" });
  }
};

const getStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await pool.query(
      `SELECT studentid, firstname, lastname, department FROM students WHERE studentid = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Student not found" });
    // return keys as the DB provides (studentID) — controllers respond with DB row
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { firstname, lastname, department } = req.body;
    const result = await pool.query(
      `UPDATE students SET firstname=$1, lastname=$2, department=$3 WHERE studentid=$4 RETURNING studentid`,
      [firstname, lastname, department, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Student not found" });
    res.json({ studentid: result.rows[0].studentid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update student" });
  }
};

module.exports = { addStudent, getStudent, updateStudent };
