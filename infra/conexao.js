const mysql = require('mysql2');

// Configura a conexao com o BD
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
});

module.exports = conexao;