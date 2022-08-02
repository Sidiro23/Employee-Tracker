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
db.connect(function(err){
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

//function and query to view all employees in the db

function viewEmployees(){
  let query = 'SELECT * FROM employee';
  db.query(query, function(err,res){
    if (err) throw err;
    console.log(res.length + 'employees found!');
    console.table('All Employees:', res);
    selections();
 })
};

//function and query to view all departments in the db

function viewDepartments(){
  let query = 'SELECT * FROM department';
  db.query(query, function(err,res){
    if (err) throw err;
    console.table('All Departments:, res');
    selections();
  })
};

//function and query to view all roles in the db

function viewRoles(){
  let query = 'SELECT * FROM role';
  db.query(query, function(err,res){
    if (err) throw err;
    console.table('All Roles:', res);
    selections();
 })
};

//function to add an employee to the db

function addEmployee(){
  db.query('Select * FROM role', function(err,res){
    if (err) throw (err);
    inquirer.prompt([
      {
        name:'first_name',
        type:'input',
        message: "What is the employee's first name?"
      },
      {
        name:'last_name',
        type:'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "What is the employee's manager's ID?"
      },
      {
        name: 'role',
        type : 'list',
        choices: function(){
          let roleArray = [];
          for (let i=0; i <res.length; i++){
            roleArray.push(res[i].title);
          }
          return roleArray;
        },
        message: "What is this employee's role?"
      }
    ]).then(function(reply) {
      let role_id;
      for (let r =0; r<res.length; r++){
        if (res[r].title == reply.role){
          role_id = res[r].id;
          console.log(role_id)
        }
      }
      db.query(
        'INSERT INTO employee SET ?',
        {
          first_name:reply.first_name,
          last_name:reply.last_name,
          manager_id: reply.manager_id,
          role_id: role_id,
        },
        function(err){
          if (err) throw err;
          console.log('Employee has been added!');
          selections();
        }
      )
    })
  })
};

//function to add department to db
function addDept(){
  inquirer.prompt([
    {
      name: 'newDepartment',
      type:'input',
      message: 'Which department would you like to add?'
    }
  ]).then(function (reply){
    db.query(
      'INSERT INTO department SET ?',
      {
        name: reply.newDepartment
      }
    );
    let query = 'SELECT * FROM department';
    db.query(query, function(err, res){
      if(err) throw err;
      console.log('Your department has been added!');
      console.table('All Departments:', res);
      selections();
    })
    

    
  })
};

//function to add role to the db
function addRole(){
  db.query('SELECT * FROM department', function(err, res){
    if (err) throw err;

    inquirer.prompt([
      {
        name: 'new_role',
        type: 'input',
        message: 'What new role would you like to add?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?'
      },
      {
        name:'Department',
        type: 'list',
        choices: function(){
          let deptArray = [];
          for (let i=0; i < res.length; i++){
            deptArray.push(res[i].name);
          }
          return deptArray;
        },
      }
    ]).then(function (reply){
      let department_id;
      for (let d=0; d<res.length; d++){
        if (res[d].name == reply.Department){
          department_id = res[d].id;
        }
      }
      db.query(
        'INSERT INTO role SET ?',
        {
          title: reply.new_role,
          salary: reply.salary,
          department_id: department_id
        },
        function (err, res){
          if(err) throw err;
          console.log('New role has been added!');
          console.table('All Roles:', res);
          selections();
        }
      )
    })
  })
};

//update role in db
function updateRole(){

};

//delete an employee
function delEmployee(){};

// terminate app
function exitApp(){
  db.end();
};
