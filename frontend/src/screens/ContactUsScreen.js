import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from 'react-native'
import Footer from '../components/Footer'
import Header from '../components/Header'

const ContactUsScreen = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://10.145.98.235:8000/contactForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, message })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data) // Log the server response
        setError('Contact form submitted')

        // Clear the form fields after successful submission
        setFullName('')
        setEmail('')
        setMessage('')
      } else {
        console.error('Failed to submit contact form:', response.status)
        setError('Failed to submit contact form')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setError('Failed to submit contact form')
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>Contact Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your Email Address"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your Message"
          placeholderTextColor="#888"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Footer activeOption="mail-outline" />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  // contentContainer: {
  //   flex: 1,
  //   padding: 16,
  //   marginTop: 100
  // },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111307'
  },
  input: {
    height: 40,
    borderColor: '#b0da95',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#111307',
    width: '100%'
  },
  messageInput: {
    height: 100,
    paddingTop: 10
  },
  button: {
    backgroundColor: '#359740',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#f2f4e1',
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorText: {
    color: '#ff0000',
    fontWeight: 'bold',
    marginTop: 10
  }
})

export default ContactUsScreen
