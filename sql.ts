import mysql, { ConnectionOptions, Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const access: ConnectionOptions = {
    host: process.env.BDD_HOST, 
    user: process.env.BDD_USERNAME,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
}

export const localSql: Pool = mysql.createPool(access);


const etlAccess: ConnectionOptions = {
    host: process.env.BDD_ETL_HOST,
    user: process.env.BDD_ETL_USERNAME,
    password: process.env.BDD_ETL_PASSWORD,
    database: process.env.BDD_ETL_NAME,
}

export const etlSql: Pool = mysql.createPool(etlAccess);