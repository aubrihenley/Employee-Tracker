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
      choices: ['View Departments', 'View Roles', 'End']
    }])
    .then((response) => {
      console.log(response.spaghetti)
      if (response.todo === 'View Departments') {
        //write a function and call it here(for now we are writing it below)
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
        })
        //call wrapped inquirer function to provide prompts again.
      }

    })
}
//create db.query and call the function after the if/if-else statements