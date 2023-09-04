const express = require("express");

const {
  getRegistrations,
  addRegistration,
  deleteRegistration,
} = require("../controllers/registration.controller");

const router = express.Router();

/* Creating a route for the get registrations request. */
router.get("/registrations", getRegistrations);

/* Creating a route for the add registration request. */
router.post("/registration", addRegistration);

/* Creating a route for the add registration request. */
router.delete("/registration/:id", deleteRegistration);

module.exports = router;
