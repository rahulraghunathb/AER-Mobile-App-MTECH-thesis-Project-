import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Ionicons } from '@expo/vector-icons'
import RenderMap from '../components/RenderMap'

const StateDetailScreen = () => {
  const route = useRoute()
  const { state } = route.params

  const data = require('./airQualityData.json')

  // Extracting coordinates from data
  const coordinates = data
    .filter((item) => item.state === state)
    .map((item) => ({
      latitude: item.latitude,
      longitude: item.longitude
    }))

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Air quality in {state.toUpperCase()}</Text>

        <View style={styles.mapContainer}>
          <RenderMap
            latitude={parseFloat(coordinates[0].latitude)}
            longitude={parseFloat(coordinates[0].longitude)}
            markers={coordinates}
          />
        </View>

        <View style={styles.dataContainer}>
          {data
            .filter((item) => item.state === state)
            .map((item, index) => (
              <View key={index} style={styles.dataItem}>
                <View style={styles.row}>
                  <Ionicons
                    name="ios-navigate"
                    size={25}
                    color="red"
                    style={styles.icon}
                  />
                  <Text style={styles.heading}>City: {item.city}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name="md-pin"
                    size={25}
                    color="#581845"
                    style={styles.icon}
                  />
                  <Text style={styles.heading}>Station: {item.station}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name="md-cloud"
                    size={25}
                    color="#89D5F4"
                    style={styles.icon}
                  />
                  <Text style={styles.heading}>
                    Pollutant ID: {item.pollutant_id}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Ionicons
                    name="md-time"
                    size={25}
                    color="#15191A"
                    style={styles.icon}
                  />
                  <Text style={styles.heading}>
                    Last Update: {item.last_update}
                  </Text>
                </View>
                <Text style={styles.heading}>
                  Pollutant Min: {item.pollutant_min}
                </Text>
                <Text style={styles.heading}>
                  Pollutant Max: {item.pollutant_max}
                </Text>
                <Text style={styles.heading}>
                  Pollutant Avg: {item.pollutant_avg}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#500431'
  },
  dataContainer: {
    width: '100%',
    marginBottom: 80
  },
  dataItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 17.5,
    marginBottom: 12.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  icon: {
    marginRight: 5
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#624928'
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginBottom: 30
  }
})

export default StateDetailScreen
