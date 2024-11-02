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
  logout,
  updateAdmin,
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
router.post("/updateAdmin", updateAdmin);

//get
router.get("/getAdmin", getAdmin);
router.get("/getAdminRole/", getAdminRole);


router.post("/logout", logout);

//Auth Routes
router.post("/auth", authenticateTokenWeb);

module.exports = router;
