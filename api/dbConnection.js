const { createPool } = require("mysql");
require("dotenv").config();
const pool = createPool(
  {
    // connectionLimit : 1000,
    // connectTimeout  : 60 * 60 * 1000,
    // acquireTimeout  : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    host: "localhost",
    user: "root",
    port: 3307,
    password: "",
    database: "mina_shopping",
  },
  (error) => {
    console.log(error);
  }
);

module.exports = pool;
