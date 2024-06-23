const mysql = require('mysql')

const connectDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A9846@khil#",
  database: "user-details",
});

connectDb.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:",err.message);
    return;
  }
  console.log("Database connection established successfully");
});

module.exports = connectDb;