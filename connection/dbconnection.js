//Connect to the DB

require("dotenv").config();
const mysql = require("mysql");

var con = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT,
});


con.connect((err) => {
  if (err) {
    console.log("Data base connection Failed " + err);
  } else {
    console.log("Connected to local MySql database");
  }
});

module.exports = con
