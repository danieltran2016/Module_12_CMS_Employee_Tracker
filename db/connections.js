const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '25311Tran03221996',
        database: 'employees_db',
    },
    console.log('employees_db database connected')
);
module.exports = db;