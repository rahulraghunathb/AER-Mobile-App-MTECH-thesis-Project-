import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'

const StateDetailScreen = () => {
  const route = useRoute()
  const { state } = route.params

  const data = require('./air_quality_data.json')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Data for {state}</Text>
      <View style={styles.dataContainer}>
        {data
          .filter((item) => item.state === state)
          .map((item, index) => (
            <View key={index} style={styles.dataItem}>
              <Text>City: {item.city}</Text>
              <Text>Station: {item.station}</Text>
              <Text>Last Update: {item.last_update}</Text>
              <Text>Pollutant ID: {item.pollutant_id}</Text>
              <Text>Pollutant Min: {item.pollutant_min}</Text>
              <Text>Pollutant Max: {item.pollutant_max}</Text>
              <Text>Pollutant Avg: {item.pollutant_avg}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  dataContainer: {
    marginTop: 10,
    width: '100%'
  },
  dataItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
})

export default StateDetailScreen
