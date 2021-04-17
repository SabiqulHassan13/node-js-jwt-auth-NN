const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Show auth-form
router.get("/login", authController.showLogin);
router.get("/register", authController.showRegister);

// process auth
router.post("/login", authController.processLogin);
router.post("/register", authController.processRegister);

// process logout
router.post("/logout", authController.processLogout);

module.exports = router;
