const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const eventController = require("../controllers/eventController");

// Student routes
router.post("/student", studentController.addStudent);
router.get("/students", studentController.getStudents);
router.get("/student/:id", studentController.getStudent);
router.put("/student/:id", studentController.updateStudent);

// Event routes
router.post("/event", eventController.addEvent);
router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEvent);
router.put("/event/:id", eventController.updateEvent);

// Registration route
router.post("/register", eventController.registerStudent);

module.exports = router;