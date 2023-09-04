// Setup: 
// npm init --y
// npm install --save express dotenv cors
//
// Start:  >npm start
//          npm run dev

const express = require("express");
const cors = require("cors");

const app = express();
const RegistrationRouter = require("./routes/registration.route");

// Swagger
const swaggerUi = require("swagger-ui-express"),
      swaggerDocument = require('./swagger.json');  

/* Loading the environment variables from the .env file. */
require("dotenv").config();

/* get port from .env file */
const port = process.env.PORT || 5000;
const data_file = process.env.REGISTRATION_DATA_FILE || "";

/* Allowing the frontend to access the backend. */
app.use(cors());

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
app.use(express.json());

/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get("/", (req, res) => {
  res.send("Ski-Service Server is running");
});

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
app.use("/api", RegistrationRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
