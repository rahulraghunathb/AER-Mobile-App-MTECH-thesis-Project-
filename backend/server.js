const express = require('express')
const bcrypt = require('bcrypt')
const sequelize = require('./database')
const User = require('./models/user.model')
const ContactForm = require('./models/contactForm.model')
const cors = require('cors')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ alter: false })
    console.log('"server.js","sequelize()","Connected to DB."')
    app.listen(process.env.APP_PORT, () => {
      console.log(
        `"server.js","sequelize()","App running on port ${process.env.APP_PORT}..."`
      )
    })
  })
  .catch((err) => {
    console.log(
      `"server.js","sequelize()","Unable to connect to the database: ${err.message}"`
    )
  })

// Register a new user
app.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ email, password: hashedPassword })

    console.info('User registered successfully')
    res.status(200).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Failed to login' })
    }

    // Compare passwords
    if (await bcrypt.compare(password, user.password)) {
      console.info('User logged in successfully')
      res.status(200).json({ message: 'User logged in successfully' })
    } else {
      console.info('Failed to log in')
      res.status(401).json({ error: 'Failed to login' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Handle contact form submissions
app.post('/contactForm', async (req, res) => {
  const { fullName, email, message } = req.body

  try {
    await ContactForm.create({ fullName, email, message })

    console.info('Contact form submitted successfully')
    res.status(200).json({ message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({ error: 'Failed to process contact form' })
  }
})
