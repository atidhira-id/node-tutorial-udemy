const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "section10db",
  password: "atidhira123",
});

module.exports = pool.promise();
