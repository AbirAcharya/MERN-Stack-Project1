// 1. MUST BE THE ABSOLUTE FIRST LINE so your database can read the .env file!


const express = require('express');
const app = require("./src/app");
const connectDB = require("./src/db/db");

// 2. Initialize database connection now that env variables are loaded
connectDB();

app.listen(5000, () => {
    console.log("Server is running on port 5000.");
});