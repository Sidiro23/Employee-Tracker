const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
require('dotenv').config();

//connect to db
const db = mysql.createConnection(
  
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3301
    
  },
  
);
connection.connect(function(err){
  if (err) throw err;
  selections();
})
console.log(`Connected to the employees_db database.`)
//make selections with inquirer
function selections(){
  inquirer.prompt({
    name:'selection',
    type:'list',
    message:'Welcome to our employee database.What would you like to do?',
    choices:[
      'View all employees',
      'View all departments',
      'View all roles',
      'Add an employee',
      'Add a department',
      'Add a role',
      'Update employee role',
      'Delete an employee',
      'Exit'
    ]
  }).then(function(reply){
    switch (reply.action){
      case 'View all employees':
        viewEmployees();
        break;
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Add a department':
        addDept();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Update employee role':
        updateRole();
        break;
      case 'Delete an employee':
        delEmployee();
        break;
      case 'Exit':
        exitApp();
        break;
      default:
        break;                  
    }
  })
};

//function and quiry to view all employees in the database

function viewEmployees(){
  let query = 'SELECT * FROM employee';
  connection.query(query, function(err,res){
    if (err) throw err;
    console.log(res.length + 'employees found!');
    console.table('All Employees:', res);
    selections();
 })
};