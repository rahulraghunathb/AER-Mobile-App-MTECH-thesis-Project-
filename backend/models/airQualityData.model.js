const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const AirQualityData = sequelize.define(
  'AirQualityData',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DeviceID: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    PM25: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    PM10: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    NO: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    NO2: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    NOx: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    NH3: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CO: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    SO2: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    O3: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Benzene: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Toluene: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Xylene: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    AQI: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    AQI_Bucket: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Temp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Humidity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'air_quality_data'
  }
)

module.exports = AirQualityData
