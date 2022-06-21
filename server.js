const inquirer = require('inquirer');

const db = require('./db/connection.js');

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
                    'Update an employee role',
                    'Finished'
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
            } else if (response.decision === 'Add a department') {
                addDepartment();
            } else if (response.decision === 'Add a role') {
                addRole();
            } else if (response.decision === 'Add an employee') {
                addEmployee();
            } else if (response.decision === 'Finished') {
                console.log("Goodbye!")
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
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    LEFT JOIN employee m
    ON employee.manager_id = m.id`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return startApp();
        }
        console.table(result);
        startApp();
    });
}

const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?'
            }
        ])
        .then(departmentResponse => {
            let response = departmentResponse;
            const sql = `INSERT INTO department (name)
        VALUES (?)`;
            db.query(sql, response.department, (err) => {
                if (err) {
                    console.log(err)
                    return startApp();
                }
                console.log("Added " + response.department + " to the database");
                startApp();
            });
        });
}

const addRole = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, departmentArray) => {
        if (err) throw err;
        const departmentChoices = departmentArray.map(department => ({ name: department.name, value: department.id }));
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'What is the name of the role?'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: departmentChoices
                }
            ])
            .then(roleResponse => {
                let response = [roleResponse.role, roleResponse.salary, roleResponse.department];

                const roleSql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;

                db.query(roleSql, response, (err) => {
                    if (err) {
                        console.log(err)
                        return startApp();
                    }
                    console.log("Added " + response[0] + " to the database");
                    startApp();
                })
            })
    })
}

const addEmployee = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, roleArray) => {
        if (err) throw err;
        const roleChoices = roleArray.map(role => ({ name: role.title, value: role.id }));
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleChoices
                }
            ])
            .then(employeeResponse => {
                let response = [employeeResponse.firstName, employeeResponse.lastName, employeeResponse.role];

                const managerSql = `SELECT * FROM employee WHERE id BETWEEN 1 AND 3`;
                db.query(managerSql, (err, managerArray) => {
                    if (err) throw err;
                    const managerChoices = managerArray.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id }))
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'manager',
                                message: "Who is the employee's manager?",
                                choices: managerChoices
                            }
                        ])
                        .then(managerResponse => {
                            let managerID = managerResponse.manager;
                            response.push(managerID);

                            const employeeSql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (? ,?, ?, ?)`;

                            db.query(employeeSql, response, (err) => {
                                if (err) {
                                    console.log(err)
                                    return startApp();
                                }
                                console.log("Added " + response[0] + " " + response[1] + " to the database");
                                startApp();
                            });
                        });
                });
            });
    });
}

startApp()
