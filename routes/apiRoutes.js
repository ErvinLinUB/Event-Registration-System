const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const eventController = require("../controllers/eventController");
const registrationController = require("../controllers/registrationController");

// Student routes
router.post("/student", studentController.addStudent);
router.get("/student/:id", studentController.getStudent);
router.put("/student/:id", studentController.updateStudent);

// Event routes
router.post("/event", eventController.addEvent);
router.get("/event/:id", eventController.getEvent);
router.put("/event/:id", eventController.updateEvent);

// Registration route
router.post("/register", registrationController.registerStudent);

module.exports = router;
