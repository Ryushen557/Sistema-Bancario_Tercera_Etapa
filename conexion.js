const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.connect(function(error){
    if (error) {
        console.error('Error conectando a la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = pool.promise(); 