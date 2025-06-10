import mysql, { ConnectionOptions, Pool } from 'mysql2/promise';

const DATABASE = "money"

require('dotenv').config();

const access: ConnectionOptions = {
    user: process.env.BDD_USERNAME,
    password: process.env.BDD_PASSWORD,
    host: process.env.BDD_HOST,
    database: DATABASE,
}

const connexion: Pool = mysql.createPool(access);

export default connexion;

