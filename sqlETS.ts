import mysql, { ConnectionOptions, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const access: ConnectionOptions = {
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USERNAME,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
}

export const etlSql: Pool = mysql.createPool(access);