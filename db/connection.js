const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password1",
  database: "employee_tracker",
});

//this is telling to wait until connection is made
connection.connect(function (err) {
  if (err) throw err;
  WhatToDo();
  connection.end();
});

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;
