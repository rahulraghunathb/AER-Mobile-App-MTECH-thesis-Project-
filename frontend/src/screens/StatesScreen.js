import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const StatesScreen = () => {
  const [uniqueStates, setUniqueStates] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const readAirQualityData = async () => {
      try {
        const data = require('./air_quality_data.json')
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Unique States</Text>
      {uniqueStates.map((state, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleStatePress(state)}
          style={styles.stateContainer}
        >
          <Text style={styles.stateText}>{state}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  stateContainer: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10
  },
  stateText: {
    fontSize: 18
  }
})

export default StatesScreen
