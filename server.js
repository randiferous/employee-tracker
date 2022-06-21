const inquirer = require('inquirer');

const db = require ('./db/connection.js');

const cTable = require('console.table');

const startApp = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'decision',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ]
            }
        ])
        .then(decisionResponse => {
            let response = decisionResponse;
            if (response.decision === 'View all departments') {
                viewDepartments();
            } else if (response.decision === 'View all roles') {
                viewRoles();
            } else if (response.decision === 'View all employees') {
                viewEmployees();
            }
        });
};

const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log("error")
            return startApp();
        }
        console.table(result);
        startApp();
    });
};

const viewRoles = () => {
    const sql = `SELECT role .*, department.name
    AS department_name
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return startApp();
        }
        console.table(result);
        startApp();
    });
};

const viewEmployees = () => {
    const sql = `SELECT employee.*,
    role.title AS role_title,
    role.salary AS role_salary,
    department.name AS department_name,
    CONCAT(employee.first_name, ' ', employee.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee manager
    ON employee.manager_id = employee.id`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return startApp();
        }
        console.table(result);
        startApp();
    });
}

startApp()
