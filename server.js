const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const PORT = process.env.PORT || 3000;
const db = require('./db/connections');
const app = express();

// using middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//starting up the server 
db.connect((err) => {
  if (err) throw err;
  app.listen(PORT, () => {});
});

dbquestions();

function dbquestions() {
    inquirer.prompt({
        type: 'list',
        name: 'commands',
        message: 'Choose command',
        choices: [
            'see all departments',
            'see all employees',
            'see all roles',
            'add department',
            'add role',
            'add employee',
            'update employee role'
        ],
    }) .then((answer)=>{
        switch(answer.commands){
            case 'see all departments':
                seeDepartments();
                break;
            case 'see all employees':
                seeEmployees();
                break;
            case 'see all roles':
                seeRoles();
                break;
            case 'add department':
                addDepartment();
                break;
            case 'add role':
                addRole();
                break;
            case 'add employee':
                addEmployee();
                break;
            case 'update employee role':
                updateEmployee();
                break;
        }
    });
}

function seeDepartments() {
    const sql = `SELECT * FROM department;`
    db.query(sql, (err, res)=>{
        if (err) {
            console.log(err);
            return;
        }
        console.log(res);
        dbquestions();
    });
};

function seeRoles() {
    const sql = `   SELECT
	                    role.title,
                        department.department_name,
                        role.salary,
                        role.department_ID    
                    FROM 
                        role
                    JOIN 
                        department 
                    ON 
                        role.department_id = department.id;`
    db.query(sql, (err, res)=>{
        if (err) {
            console.log(err);
            return;
        }
        console.log(res);
        dbquestions();
    });
};

function seeEmployees() {
    const sql = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    employee.manager_id,
    role.salary,
    department.department_name
    
    FROM 
        employee
    INNER JOIN 
     role 
    ON 
     employee.role_id = role.id
    INNER JOIN 
     department 
    ON 
     department.id = role.department_id;`
    db.query(sql, (err, res)=>{
        if (err) {
            console.log(err);
            return;
        }
        console.log(res);
        dbquestions();
    });
};

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'what is the name  of the new department?',
        }
    ]) .then((answer)=> {
        const sql = `INSERT INTO department (department_name) VALUES ('${answer.department}');`
        db.query(sql, (err, res) =>{
            if (err) {
                console.log(err);
                return;
            }
            console.log('added' + answer.department + 'to database');
            dbquestions();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'what is the name of the new role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'what is the salary of the new role?',
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'what is the department ID of the new role?',
        },
    ]).then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES ('${answer.role}',${answer.salary} ,${answer.department_id});`
        db.query(sql, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log('added' + answer.role + 'to database')
            dbquestions();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'what is the first name of the new employee?',
        },
        {
            name: 'last',
            type: 'input',
            message: 'what is the last name of the new employee?',
        },
        {
            name: 'role',
            type: 'input',
            message: 'what is the ID of the new role?',
        },
        {
            name: 'manager',
            type: 'input',
            message: 'what is the ID of the new role manager?',
        },
    ]).then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name,role_id,manager_id)
                    VALUES ('${answer.first}','${answer.last}' ,${answer.role},${answer.manager});`
        db.query(sql, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log('added ' + answer.first +' '+ answer.last + ' to database')
            dbquestions();
        });
    });
};