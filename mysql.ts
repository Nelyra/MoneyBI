import * as mysql from 'mysql';
import * as dotenv from 'dotenv';

dotenv.config();

export const client = mysql.createConnection({
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
})

export function connectMySQL()
{
    try {
        this.client.connect()
    } catch (e) {
        console.error(e);
    }
}

