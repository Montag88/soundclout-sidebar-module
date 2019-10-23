var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soundclout'
})

connection.connect( () => {
    console.log('database is connected')
});




module.exports = connection;