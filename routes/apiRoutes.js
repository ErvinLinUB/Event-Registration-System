const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const eventController = require("../controllers/eventController");

// Student routes
router.post("/student", studentController.addStudent);
router.get("/students", studentController.getStudents);

// Event routes
router.post("/event", eventController.addEvent);
router.get("/events", eventController.getEvents);

// Registration route
router.post("/register", eventController.registerStudent);

module.exports = router;