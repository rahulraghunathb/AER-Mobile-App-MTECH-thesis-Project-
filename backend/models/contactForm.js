const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const ContactForm = sequelize.define(
  'ContactForm',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    message: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'contact_form'
  }
)

module.exports = ContactForm
