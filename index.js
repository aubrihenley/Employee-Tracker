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
const startQs = () => {
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
      ],
    },
  ])
    .then(function (response) {
      // console.log(response.todo)
      switch (response.todo) {
        case 'View Departments':
          //write a function and call it here(for now we are writing it below)
          viewDpt();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'Add Departments':
          addDpt();
          break;

        case 'Add Roles':
          addRoles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Information':
          update();
          break;

        case 'Exit':
          exit();
      }
    });
}

//create db.query and call the function after the if/if-else statements
const viewDpt = async() => {
  db.query('SELECT * FROM department', function (err, results) {
    console.table('Departments', results);
    startQs();
  })
};

const viewRoles = async() => {
  db.query("SELECT roles.id, roles.title, roles.salary,  department.name AS Department FROM roles INNER JOIN department ON roles.department_id = department.id",
    function (err, results) {
    console.table('Roles', results);
    startQs();

  })
};

const viewEmployees = async() => {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table('Employees', results);
    startQs();

  })
};

const exit = () => {
  console.log("Good Bye");
};

// "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department AS Department ON department.id = role.department_id LEFT JOIN employee e ON employee.manager_id = e.id;"