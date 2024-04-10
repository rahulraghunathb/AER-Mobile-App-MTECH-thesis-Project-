const { Sequelize } = require('sequelize')
require('dotenv').config()

// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// })

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '2715',
  database: 'aer',
  logging: false
})

module.exports = sequelize
