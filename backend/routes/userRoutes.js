const express = require("express");
const { getPatients, createPatient, getPatientById, loginPatient } = require("../app/Controllers/PatientController");
const { loginAdmin, getAdmin } = require("../app/Controllers/AdminController");
const authAdminToken = require("../app/Middleware/authAdminToken");
const authPatientToken = require("../app/Middleware/authPatientToken");
// const { authenticateTokenWeb } = require("../app/Middleware/authjwt");
// const authenticateToken = require("../app/Middleware/authMiddleware");

const router = express.Router();

//Patient Routes
//post
router.post("/createPatient", createPatient);
router.post("/loginPatient", loginPatient);
//get
router.get("/getPatients", getPatients);
router.get("/getPatient/:id", getPatientById);

//Admin Routes
//post
router.post("/loginAdmin", loginAdmin);
//get
router.get("/getAdmin", getAdmin);

// Admin authentication route
router.post("/auth/admin", (req, res, next) => {
  authAdminToken(req, res, next);
}, (req, res) => {
  res.status(200).json({ message: "Admin token is valid" });
});

// Patient authentication route
router.post("/auth/patient", (req, res, next) => {
  authPatientToken(req, res, next);
}, (req, res) => {
  res.status(200).json({ message: "Patient token is valid" });
});

module.exports = router;
