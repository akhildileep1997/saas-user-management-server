const db = require("../connection/db.js");

const userSchema = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    mob BIGINT NOT NULL UNIQUE,
    address VARCHAR(400) NOT NULL,
    companyName VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    password VARCHAR(400) NOT NULL
  )
`;

db.query(userSchema, (error, result) => {
  if (error) {
    console.log("Cannot create table for database:", error.message);
    return;
  } else if (result) {
    console.log("Table created successfully");
  }
});


