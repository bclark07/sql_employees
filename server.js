var mysql = require("mysql");
const { prompt } = require("inquirer"); //deconstructs inquirer because only use prompt and don't have to type inquirer.prompt
// const util = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password1",
  database: "employee_tracker"
});

//this is telling to wait until connection is made
connection.connect(function(err) {
  if (err) throw err;
  WhatToDo();
  connection.end();
});

// const db = require("./db"); //defaults to pull index file
// console.table([2], ["one", "two"]); //displaying a formatted table in the console
// alternative console-table-printer node package
// const VIEW_EMPLOYEES_BY_DEPARTMENT = "VIEW_EMPLOYEES_BY_DEPARTMENT";
// const VIEW_EMPLOYEES_BY_MANAGER = "VIEW_EMPLOYEES_BY_MANAGER";
// const UPDATE_EMPLOYEE_ROLES = "UPDATE_EMPLOYEE_ROLES";
// const BUDGET = "BUDGET";

const Add = require("./lib/create");
const Update = require("./lib/update");
const Remove = require("./lib/remove");

async function WhatToDo() {
  // const {choice}  = if want to pull choices out into own object and pass in

  // inquirer
  const answers = await prompt({
    name: "choice",
    type: "list", //list vs. rawlist?
    message: "What would you like to do?",
    choices: [
      //have an additional choice to select the employee, role, or department you want to update
      "Add an employee, role, or department record",
      "Update an employee, role, or department record",
      "Delete an employee, role, or department record",
      "Exit"
    ]
  }).then(async function(answers) {
    switch (
      answers.choice //stores answers into name
    ) {
      case "Add an employee, role, or department record":
        const add = await prompt([
          {
            name: "WhoAdd",
            type: "list",
            message: "Choose a role to add",
            choices: ["Add an employee", "Add a role", "Add a department"]
          }
        ]).then(async function(add) {
          console.log(Add(add.WhoAdd));
        });
        // WhatToDo();
        // return add;
        break;
      case "Update an employee, role, or department record":
        class Server extends Update {
          constructor() {
            const change = await prompt([
              {
                name: "WhoUpdate",
                type: "list",
                message: "What would you like to update?",
                choices: ["An employee", "A role", "A department"]
              }
            ]).then(function(change) {
            super(change);
            });
          }
        }
        // .then(async function(change) {
        //     console.log(Update(change.WhoUpdate));
        //   });
        // WhatToDo();
        // return change;

        const something = new Update(change);
        // rectangle.printInfo();
        console.log(something);
        break;

      case "Delete an employee, role, or department record":
        const remove = await prompt([
          {
            name: "WhoDelete",
            message: "What would you like to delete?",
            type: "list",
            choices: ["An employee", "A role", "A department"]
          }
        ]).then(async function(remove) {
          console.log(Remove(remove.WhoDelete));
        });
        // WhatToDo();
        // return remove;
        break;
      case "Exit":
        connection.end();
    }
  });
}

// .then(function(answer) { //take this out
// switch (choice) {
//   case VIEW_EMPLOYEES:
//       return viewEmployees() => {}; //"Add a new employee":
//     // CreateEmployee().then(function(res, err) {
//     //   WhatToDo();
//     // });
//     // break;

//   case ADD_EMPLOYEE: //"Update an employee, role, or department record":
//     return () => {};
//add function here
// WhatToDo();
// break;

// case VIEW_DEPARTMENTS:
//     return () => {};

//     case
//     default:
//         return () => {}

//   case "Delete an employee, role, or department record":
//     //add function here
//     WhatToDo();
//     break;

//   case "Exit":
//     connection.end();
// }
//       };
//   }

//   //if use function keyword syntax will be pulled to the top of the file when file is run
//   async function viewEmployees() {
//       const employees = await db.findAllEmployees();
//       console.log("\n");
//       console.table(employees);
//       loadMainPrompts();

//   }

//   async function viewDepartments() {
//       const departments = await db.findAllDepartments();
//       console.log("\n");
//       console.table(departments);
//       loadMainPrompts();
//   }

//   const employee = prompt()

// const {roleId} = await prompt([
//     {
//         type: "list",
//         name: "roleID",
//         something: "";
//         something: "";
//         employee.role_id = roleID

//     }

//     const managerChoices = employees.map(({ id, first_name, last_name})=> ({ name: `${first_name} ${last_name}`,
// value: id}));

// managerChoices.unshift({name: "None", value: null});
// })

//   loadMainPrompts(); //need this here?
