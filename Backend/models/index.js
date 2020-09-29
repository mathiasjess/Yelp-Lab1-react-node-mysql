var mysql = require('mysql')
const createTablesquery = require('./init')

const { sql_host, sql_port, sql_user, sql_password, sql_database, sql_connectionLimit } = require('../config');

const pool = mysql.createPool({
    connectionLimit: sql_connectionLimit,
    host: sql_host,
    port: sql_port,
    user: sql_user,
    password: sql_password,
    database: sql_database,
    multipleStatements: true
});

// connect to database

pool.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database successfully")
});



module.exports = pool;

