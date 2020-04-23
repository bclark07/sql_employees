const { prompt } = require("inquirer"); //deconstructs inquirer because only use prompt and don't have to type inquirer.prompt
const db = require("./db"); //defaults to pull index file

// console.table([2], ["one", "two"]); //displaying a formatted table in the console
// alternative console-table-printer node package like this:
require("console.table");

async function WhatToDo() {
  //loadMainPrompts in example

  // reference 44:30 in video if want to add const variables that are stored as values in choices array with questions object
  // deconstruct choice out of the object becasue don't need anything else - choice from line 22
  const { choice } = await prompt({
    //response instead of answers in example
    name: "choice",
    type: "list", //list vs. rawlist?
    message: "What would you like to do?",
    choices: [
      //have an additional choice to select the employee, role, or department you want to update
      "View an employee, role, or department record",
      "Add an employee, role, or department record",
      "Update an employee record",
      // "Update an employee, role, or department record",
      // "Delete an employee, role, or department record",
      "Exit",
    ],
  });
  //.then(async function(answers) {
  switch (
    choice //stores answers into name, used to be answer.choice
  ) {
    case "View an employee, role, or department record":
      console.log("view");
      const view = await prompt([
        {
          name: "WhoView",
          type: "list",
          message: "Choose a table to view",
          choices: ["View an employee", "View a role", "View a department"],
        },
      ]).then(async function (view) {
        // switch statement for view options
        switch (
          view.WhoView //stores answers into name, used to be answer.choice
        ) {
          case "View an employee":
            console.log("vemployee");
            return viewEmployee();
          case "View a role":
            console.log("vrole");
            return viewRole();
          case "View a department":
            console.log("vdepartment");
            return viewDepartment();
        }
      });
      break;
    case "Add an employee, role, or department record":
      console.log("add");
      const add = await prompt([
        {
          name: "WhoAdd",
          type: "list",
          message: "Choose a role to add",
          choices: ["Add an employee", "Add a role", "Add a department"],
        },
      ]).then(async function (add) {
        // switch statement for add options
        switch (
          add.WhoAdd //stores answers into name, used to be answer.choice
        ) {
          case "Add an employee":
            console.log("employee");
            return addEmployee();
          case "Add a role":
            console.log("role");
            return addRole();
          case "Add a department":
            console.log("department");
            return addDepartment();
        }
      });
      break;
    // case "Update an employee, role, or department record":
    case "Update an employee record":
      console.log("update");
      return updateEmployee();
    // const change = await prompt([
    //   {
    //     name: "WhoUpdate",
    //     type: "list",
    //     message: "What would you like to update?",
    //     choices: ["An employee", "A role", "A department"],
    //   },
    // ]).then(async function (change) {

    //   console.log(WhoUpdate);
    // });
    // break;

    // case "Delete an employee, role, or department record":
    //   console.log("delete");
    //   const remove = await prompt([
    //     {
    //       name: "WhoDelete",
    //       message: "What would you like to delete?",
    //       type: "list",
    //       choices: ["An employee", "A role", "A department"],
    //     },
    //   ]).then(async function (remove) {
    //     console.log(Remove(remove.WhoDelete));
    //   });
    //   break;
    case "Exit":
      console.log("exit");
      db.connection.end();
  }
}

// async function viewEmployees() {
//   const employees = await db.findAllEmployees();
//   console.log("\n");
//   console.table(employees);
//   WhatToDo();
// }

//view calls
async function viewEmployee() {
  const employees = await db.viewEmployees();
  console.log("\n");
  console.table(employees);
  WhatToDo();
}

async function viewRole() {
  const roles = await db.viewRoles();
  console.log("\n");
  console.table(roles);
  WhatToDo();
}

async function viewDepartment() {
  const departments = await db.viewDepartments();
  console.log("\n");
  console.table(departments);
  WhatToDo();
}

//add calls
async function addEmployee() {
  const employees = await db.viewEmployees();
  const roles = await db.viewRoles();
  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices,
    },
  ]);

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  //shifts array so zero spot has value of null
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Who is the employee's mnager?",
      choices: managerChoices,
    },
  ]);

  employee.manager_id = managerId;

  console.log("newperson");
  console.log(employee);
  await db.addEmployees(employee);

  WhatToDo();
}

async function addRole() {
  const departments = await db.viewDepartments();
  const role = await prompt([
    {
      name: "title",
      message: "What is the title of the new role?",
    },
    {
      name: "salary",
      message: "What is the salary of the new role?",
    },
  ]);

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { deptId } = await prompt([
    {
      type: "list",
      name: "deptId",
      message: "Which department is the role within?",
      choices: departmentChoices,
    },
  ]);

  role.department_id = deptId;

  console.log("newrole");
  console.log(role);
  await db.addRoles(role);

  WhatToDo();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the new department?",
    },
  ]);
  console.log("newdept");
  console.log(department.name);
  await db.addDepartments(department);
  WhatToDo();
}

//update function

async function updateEmployee() {
  const employees = await db.viewEmployees();
  const roles = await db.viewRoles();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  // for updating anything
  // const { employeeId, updateId } = await prompt([
  //   {
  //     type: "list",
  //     name: "employeeId",
  //     message: "Who is the employee you would like to update?",
  //     choices: employeeChoices,
  //   },
  //   {
  //     type: "list",
  //     name: "updateId",
  //     message: "What would you like to update?",
  //     choices: ["first name", "last name", "role", "manager"],
  //   },
  // ]);

  //if just updating role
  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role would you like to update?",
      choices: employeeChoices,
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "What is the employee's new role?",
      choices: roleChoices,
    },
  ]);

  console.log(employeeId);

  //need to retrieve employeeId record from employees, need to update with new info

  console.log("newupdate");
  console.log(employeeId, roleId);
  await db.updateEmployees(employeeId, roleId);

  WhatToDo();
}

WhatToDo();
