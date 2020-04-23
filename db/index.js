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
  //view functions
  viewEmployees() {
    return this.connection.query("SELECT * FROM employee;");
  }

  viewRoles() {
    return this.connection.query("SELECT * FROM role;");
  }

  viewDepartments() {
    return this.connection.query("SELECT * FROM department;");
  }

  //add functions
  addEmployees(newperson) {
    return this.connection.query("INSERT INTO employee SET ?", newperson);
  }

  addRoles(newrole) {
    return this.connection.query("INSERT INTO role SET ?", newrole);
  }

  addDepartments(newdepartment) {
    return this.connection.query("INSERT INTO department SET ?", newdepartment);
  }

  //   //update functions
  retrieveEmployees(employeeId) {
    return this.connection.query(
      "SELECT * FROM employee WHERE employee.id = employeeId;"
    );
  }

  updateEmployees() {
    return this.connection.query("SELECT * FROM employee;");
  }

  //   updateRoles() {
  //     return this.connection.query("SELECT * FROM role;");
  //   }

  //   updateDepartments() {
  //     return this.connection.query("SELECT * FROM department;");
  //   }

  //   //remove functions
  //   deleteEmployees() {
  //     return this.connection.query("SELECT * FROM employee;");
  //   }

  //   deleteRoles() {
  //     return this.connection.query("SELECT * FROM role;");
  //   }

  //   deleteDepartments() {
  //     return this.connection.query("SELECT * FROM department;");
  //   }
}

module.exports = new DB(connection);
