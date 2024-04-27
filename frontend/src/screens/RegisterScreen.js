import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [registrationError, setRegistrationError] = useState('')

  const navigation = useNavigation()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    // Example: Password should be at least 6 characters
    return password.length >= 6
  }

  const handleRegistration = async () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address')
      clearErrors()
      return
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 6 characters')
      clearErrors()
      return
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      clearErrors()
      return
    }

    clearErrors()

    try {
      // const response = await fetch('http://10.145.98.235:8000/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email, password })
      // })

      // if (response.ok) {
      //   const data = await response.json()
      //   console.log(data) // Log the server response
      //   navigation.navigate('Login')
      // } else {
      //   console.error('Registration failed:', response.status)
      //   if (response.status === 400) {
      //     setRegistrationError('Email is already in use')
      //   }
      // }
      navigation.navigate('Login')
    } catch (error) {
      console.error('Error during registration:', error)
      setRegistrationError('Failed to register user')
    }
  }

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setRegistrationError('')
  }

  const handleLogin = () => {
    console.log('Navigate to login screen')
    navigation.navigate('Login')
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* App Logo */}
        <Image
          source={require('../../assets/logoText.png')}
          style={styles.logo}
        />

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Create an Account</Text>

        {/* Email Input */}
        <Input
          placeholder="Email Address"
          label="Email Address"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={{ type: 'material', name: 'email' }}
          inputStyle={styles.input}
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <Input
          placeholder="Password"
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
          leftIcon={{ type: 'material', name: 'lock' }}
          rightIcon={{
            type: 'material',
            name: showPassword ? 'visibility-off' : 'visibility',
            onPress: () => setShowPassword(!showPassword)
          }}
          inputStyle={styles.input}
        />

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Confirm Password Input */}
        <Input
          placeholder="Confirm Password"
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={!showPassword}
          leftIcon={{ type: 'material', name: 'lock' }}
          rightIcon={{
            type: 'material',
            name: showPassword ? 'visibility-off' : 'visibility',
            onPress: () => setShowPassword(!showPassword)
          }}
          inputStyle={styles.input}
        />

        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        {/* Register Button */}
        <Button
          title="Register"
          onPress={handleRegistration}
          buttonStyle={styles.customButton}
          titleStyle={styles.customButtonText}
        />

        {/* Login Link */}
        <Text style={styles.loginLink} onPress={handleLogin}>
          Already have an account? Login here
        </Text>

        {/* Registration Error */}
        {registrationError ? (
          <Text style={styles.errorText}>{registrationError}</Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF' // Background color
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain'
    // marginBottom: 20
  },
  welcomeText: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  input: {
    color: '#111307' // Text color
  },
  customButton: {
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#359740', // Button background color
    borderWidth: 1,
    borderColor: '#f2f4e1', // Button border color
    fontSize: 13,
    height: 45,
    paddingVertical: 0,
    paddingHorizontal: 11,
    textAlign: 'center',
    width: '100%',
    minWidth: 300
  },
  customButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#f2f4e1' // Button text color
  },
  loginLink: {
    marginTop: 10,
    color: '#3498db',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  errorText: {
    color: '#ff0000',
    fontWeight: 'bold'
  },
  input: {
    color: '#111307' // Text color
  },
  showPasswordIcon: {
    marginRight: 10
  }
})

export default RegisterScreen
