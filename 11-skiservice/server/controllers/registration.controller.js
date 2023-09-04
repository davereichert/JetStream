const registrationmodel = require("../models/registration.model");
const datastore = require("../data/datastore");

/**
 * It's an async function that uses the registration model 
 * to find all registration and then returns a status of 200 
 * with the registrations in the response body.
 */
const getRegistrations = async (req, res) => {
  try {
//  const { first_name, last_name, email, password } = req.body;   
    res.status(200).json(datastore.getRegistrationData());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * It creates a new registration and saves it
 */
const addRegistration = async (req, res) => {
  try {
    added = datastore.saveRegistrationData(req.body);
    res.status(201).json(added);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

/**
 * It delete registration
 */
 const deleteRegistration = async (req, res) => {
  try {
    const data = datastore.deleteRegistrationData(req.params.id);
    res.status(204).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getRegistrations:getRegistrations,
  addRegistration:addRegistration,
  deleteRegistration:deleteRegistration,
};
