const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('blogdb',process.env.USER,process.env.PASSWORD,
{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    pool: {
        idle: 10000
    }
});


module.exports = sequelize;

