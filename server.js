import inquirer from 'inquirer';

import db from './db/connection.js';

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
            }
        });
}

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            startApp();
        }
        console.table(result);
        startApp();
    })
}

startApp()
