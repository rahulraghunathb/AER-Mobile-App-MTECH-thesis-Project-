const { Sequelize, DataTypes } = require('sequelize')
const csv = require('csv-parser')
const fs = require('fs')
const dotenv = require('dotenv')
const AirQualityData = require('../backend/models/airQualityData.model')

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false
})

const csvFilePath = 'final_rahul_data.csv'

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection successful.')

    await sequelize.sync({ alter: true })
    console.log('Database synchronization successful.')

    const rows = []
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        row.Datetime = new Date(row.Timestamp)
        rows.push(row)
      })
      .on('end', async () => {
        try {
          await AirQualityData.bulkCreate(rows)
          console.log('CSV data import complete.')
        } catch (error) {
          console.error(`Error inserting rows: ${error.message}`)
        } finally {
          await sequelize.close()
          console.log('Database connection closed.')
        }
      })
  } catch (error) {
    console.error(`Unable to connect to the database: ${error.message}`)
  }
})()
