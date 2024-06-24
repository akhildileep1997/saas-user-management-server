const mysql = require("mysql");
require("dotenv").config();


const connectDb = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connectDb.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Database connection established successfully");
});

module.exports = connectDb;
