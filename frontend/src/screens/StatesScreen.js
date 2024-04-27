import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'

const StatesScreen = () => {
  const [uniqueStates, setUniqueStates] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const readAirQualityData = async () => {
      try {
        const data = require('./airQualityData.json')
        const states = [...new Set(data.map((station) => station.state))]
        setUniqueStates(states)
      } catch (error) {
        console.error('Error reading air quality data:', error)
      }
    }

    readAirQualityData()
  }, [])

  const handleStatePress = (state) => {
    navigation.navigate('StateDetail', { state })
  }

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Select a state</Text>
        {uniqueStates.map((state, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleStatePress(state)}
            style={styles.stateContainer}
          >
            <Text style={styles.stateText}>{state.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Footer activeOption="earth" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1B5004'
  },
  stateContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10
  },
  stateText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default StatesScreen
