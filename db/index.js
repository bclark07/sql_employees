const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    console.log("help");
    //join on 3 different tables, all employee info, role's salary(?), and manager
    return this.connection.query(
      "SELECT*FROM employee;"
      //   "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // findAllEmployees () { //join on 3 different tables, all employee info, role's salary(?), and manager
  // return this.connection.query(
  //     "SELECT * FROM departments;"
  // );
  // }

  // findAllEmployees () { //join on 3 different tables, all employee info, role's salary(?), and manager
  // return this.connection.query(
  //     "SELECT * FROM departments;"
  // );
  // }

  // findAllEmployees () { //join on 3 different tables, all employee info, role's salary(?), and manager
  // return this.connection.query(
  //     "SELECT * FROM departments;"
  // );
  // }
}

module.exports = new DB(connection);
