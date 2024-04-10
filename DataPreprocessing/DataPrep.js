const { Sequelize, DataTypes } = require('sequelize')
const csv = require('csv-parser')
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false
})

const AirQualityData = sequelize.define('AirQualityData', {
  City: DataTypes.STRING,
  Datetime: DataTypes.DATE,
  'PM2.5': DataTypes.FLOAT,
  PM10: DataTypes.FLOAT,
  NO: DataTypes.FLOAT,
  NO2: DataTypes.FLOAT,
  NOx: DataTypes.FLOAT,
  NH3: DataTypes.FLOAT,
  CO: DataTypes.FLOAT,
  SO2: DataTypes.FLOAT,
  O3: DataTypes.FLOAT,
  Benzene: DataTypes.FLOAT,
  Toluene: DataTypes.FLOAT,
  Xylene: DataTypes.FLOAT,
  AQI: DataTypes.FLOAT,
  AQI_Bucket: DataTypes.STRING
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
        // Process each row before insertion (e.g., type conversion, validation)
        // Example: Convert string date to Date object
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
