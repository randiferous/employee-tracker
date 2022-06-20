const inquirer = require("inquirer");

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
        let { response } = { decisionResponse };
        console.log(response);
    });
}

startApp()
