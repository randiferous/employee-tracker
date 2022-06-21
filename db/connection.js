const mysql = require('mysql2');

// mysql -u root -p
// source db/....
// USE company

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'randiferous93',
        database: 'company'
    },
);

module.exports = db;