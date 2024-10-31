const express = require("express");
const { getPatients, createPatient, getPatientById, loginPatient } = require("../app/Controllers/PatientController");
const { loginAdmin, getAdmin } = require("../app/Controllers/AdminController");
const { authenticateTokenWeb } = require("../app/Middleware/authjwt");
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

router.post("/auth", (req, res, next) => {
  authenticateTokenWeb(req, res, next);
}, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});


module.exports = router;
