const express = require("express");
const {
  getPatients,
  createPatient,
  getPatientById,
  loginPatient,
  getPatientRole,
} = require("../app/Controllers/PatientController");
const {
  loginAdmin,
  getAdmin,
  getAdminRole,
  createAdmin,
} = require("../app/Controllers/AdminController");
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
router.get("/getPatientRole/", getPatientRole);

//Admin Routes
//post
router.post("/loginAdmin", loginAdmin);
router.post("/createAdmin", createAdmin);

//get
router.get("/getAdmin", getAdmin);
router.get("/getAdminRole/", getAdminRole);

//Auth Routes
router.post(
  "/auth",
  (req, res, next) => {
    authenticateTokenWeb(req, res, next);
  },
  (req, res) => {
    res.status(200).json({ message: "Token is valid" });
  }
);

module.exports = router;
