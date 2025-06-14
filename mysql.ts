import mysql, { ConnectionOptions, Pool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const access: ConnectionOptions = {
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
}

const connection: Pool = mysql.createPool(access);

export default connection;
