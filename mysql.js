var mysql = require('mysql');
const DATABASE = "money"

exports.client = mysql.createConnection({
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: DATABASE,
})

exports.connectMySQL = () =>
{
    try {
        this.client.connect()
    } catch (e) {
        console.error(e);
    }
}

