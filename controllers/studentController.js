const { Student } = require("../dist/classes/Student");

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

const getStudents = async (req, res) => {
  try {
    const student = new Student();
    const students = await student.getStudents();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

module.exports = { addStudent, getStudents };