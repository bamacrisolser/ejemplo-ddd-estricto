import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_PORT, DATABASE, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  pool: {
    max: 15,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

export default sequelize;
