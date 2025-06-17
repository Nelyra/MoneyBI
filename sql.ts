import mysql, { ConnectionOptions, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// console.log('Connecting to MySQL database...');
// console.log('BDD_HOST:', process.env.BDD_HOST);
// console.log('BDD_USER:', process.env.BDD_USERNAME);
// console.log('BDD_NAME:', process.env.BDD_NAME);
// console.log('BDD_PASSWORD:', process.env.BDD_PASSWORD);

const access: ConnectionOptions = {
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USERNAME,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
}

export const localSql: Pool = mysql.createPool(access);
