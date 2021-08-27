const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql2 = require('mysql2');
require('dotenv').config()

const db = mysql2.createConnection({
  host: 'localhost',
  // MySQL Username
  user: 'root',
  // TODO: Add MySQL Password
  password: process.env.DB_PASS,
  database: 'employee_db'
});

db.connect(function (err) {
  if (err) throw err;
  console.log('Connected to employee_db.');
  startQs();
});


//wrap inquirer in its own function to keep running the prompts as needed within the prompts.
function startQs() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'todo',
      message: "What would you like to do?",
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Information',
        'Exit'
      ]
    }])
    .then(function (response) {
        // console.log(response.todo)
        switch (response.todo) {
          case 'View Departments':
            //write a function and call it here(for now we are writing it below)
            viewDpt();
            break;

          case 'View Roles':
            //write a function and call it here(for now we are writing it below)
            viewRoles();
            break;

          case 'View Employees':
            //write a function and call it here(for now we are writing it below)
            viewEmployees();
            break;

          case 'Add Departments':
            //write a function and call it here(for now we are writing it below)
            addDpt();
            break;

          case 'Add Roles':
            //write a function and call it here(for now we are writing it below)
            addRoles();
            break;

          case 'Add Employee':
            //write a function and call it here(for now we are writing it below)
            addEmployee();
            break;

          case 'Update Employee Information':
            //write a function and call it here(for now we are writing it below)
            update();
            break;

          case 'Exit':
            //write a function and call it here(for now we are writing it below)
            exit();
            break;
        };

        //create db.query and call the function after the if/if-else statements
        function viewDpt() {
          db.query('SELECT * FROM department', function (err, results) {
            console.table(results)
          })
        };

        function viewRoles() {
          db.query('Select * FROM roles', function (err, results) {
            console.table(results)
          })
        };

        function exit() {
          console.log("Good Bye");
        };
      }

      // "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department AS Department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;"