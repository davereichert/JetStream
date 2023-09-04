'use strict';
const fs = require("fs");

var registration_data = [];

const getRegistrationData = () => {
    try {
        // load from json file
        registration_data = loadData();
        
        return registration_data;
    } catch(err) {
        throw err;
    }
}

const saveRegistrationData = (data) => {

    try {
        // load from json file
        registration_data = loadData();

        const addEntry = {
            id : Math.max(...registration_data.map(o => o.id))+1,
            name: data.name,
            email: data.email,
            phone: data.phone,
            priority: data.priority,
            service: data.service,
            pickup_date: data.pickup_date,
            create_date: data.create_date
            // create_date: new Date().toJSON()
        };

        // add new entry
        registration_data.push(addEntry);

        // save into data file
        saveData(registration_data);

        return addEntry;

    } catch(err) {
        throw err;  // new Error(err.message);
    }
}

const deleteRegistrationData = (id) => {
    try {
        // load from json file
        registration_data = loadData();

        let registrationId = parseInt(id);

        // find registration
        const delete_entry = registration_data.find(elem => elem.id === registrationId);

        if(delete_entry) {
            // delete registration
            registration_data = registration_data.filter(elem => elem.id != registrationId);

            // save into data file
            saveData(registration_data);
        }

        return delete_entry;
    } catch(err) {
        throw err;
    }
}

const loadData = () => {
    const data_file = __dirname + "\\" + process.env.REGISTRATION_DATA_FILE || "";
    return JSON.parse(fs.readFileSync(data_file, 'utf-8'));  
}

const saveData = (data) => {
    const data_file = __dirname + "\\" + process.env.REGISTRATION_DATA_FILE || "";
    fs.writeFileSync(data_file, JSON.stringify(data), 'utf8');
}

module.exports = {
    getRegistrationData:getRegistrationData,
    saveRegistrationData:saveRegistrationData,
    deleteRegistrationData, deleteRegistrationData,
    registration_data:registration_data
  };
