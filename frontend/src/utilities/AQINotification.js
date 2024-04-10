// AQINotification.js

import React, { useEffect } from 'react'
import { AppState } from 'react-native'
import PushNotification from 'react-native-push-notification'
import BackgroundTimer from 'react-native-background-timer'

const AQINotification = () => {
  useEffect(() => {
    const initializePushNotification = async () => {
      try {
        // Initialize PushNotification library
        await new Promise((resolve, reject) => {
          PushNotification.configure({
            // configure notification settings
            onNotification: function (notification) {
              console.log('NOTIFICATION:', notification)
            },
            requestPermissions: true,
            onRegister: function (token) {
              console.log('TOKEN:', token)
              resolve()
            }
            // Add other configuration options as needed
          })
        })
      } catch (error) {
        console.error('PushNotification initialization error:', error)
      }
    }

    const initializeApp = async () => {
      try {
        await initializePushNotification()
        const timerId = BackgroundTimer.setInterval(
          initializePushNotification,
          15 * 60 * 1000
        ) // 15 minutes in milliseconds

        // Listen to app state changes
        const handleAppStateChange = (nextAppState) => {
          if (nextAppState === 'active') {
            // App is in foreground, restart timer
            BackgroundTimer.clearInterval(timerId)
            BackgroundTimer.setInterval(
              initializePushNotification,
              15 * 60 * 1000
            ) // Restart timer
          }
        }

        AppState.addEventListener('change', handleAppStateChange)

        // Clean up on unmount
        return () => {
          BackgroundTimer.clearInterval(timerId)
          AppState.removeEventListener('change', handleAppStateChange)
        }
      } catch (error) {
        console.error('App initialization error:', error)
      }
    }

    initializeApp()
  }, [])

  return null // No UI component to render
}

export default AQINotification
