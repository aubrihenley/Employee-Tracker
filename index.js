const inquirer = require ('inquirer');
const cTable = require ( 'console.table');
const mysql2 = require('mysql2');



const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
      password: 'myPassword',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  