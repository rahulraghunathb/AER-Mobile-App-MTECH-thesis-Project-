import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const AQIVisualizer = ({ aqi }) => {
  // Define AQI ranges and corresponding colors
  const aqiRanges = [
    { min: 0, max: 50, label: 'Good', color: '#009966' },
    { min: 51, max: 100, label: 'Moderate', color: '#FFDE33' },
    {
      min: 101,
      max: 150,
      label: 'Unhealthy for Sensitive',
      color: '#FF9933'
    },
    { min: 151, max: 200, label: 'Unhealthy', color: '#CC0033' },
    { min: 201, max: 300, label: 'Very Unhealthy', color: '#660099' },
    { min: 301, max: 500, label: 'Hazardous', color: '#7E0023' }
  ]

  // Calculate the position of the arrow based on AQI value
  const calculateArrowPosition = () => {
    const maxValue = aqiRanges[aqiRanges.length - 1].max
    const value = Math.min(Math.max(aqi, aqiRanges[0].min), maxValue)
    return (value / maxValue) * 100
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        {aqiRanges.map(({ label }, index) => (
          <View key={`label-${index}`} style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.bar}>
        {aqiRanges.map((range, index) => (
          <View
            key={`bar-${index}`}
            style={[styles.barSection, { backgroundColor: range.color }]}
          />
        ))}
      </View>
      <View style={styles.valuesContainer}>
        {aqiRanges.map((range, index) => (
          <View key={`value-${index}`} style={styles.valueContainer}>
            <Text style={styles.value}>
              {index === 0 ? range.min : range.max}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={[
          styles.arrowContainer,
          { left: `${calculateArrowPosition()}%` }
        ]}
      >
        <View style={styles.arrowUp} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingVertical: 2
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  labelContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  bar: {
    flexDirection: 'row',
    height: 13
  },
  barSection: {
    flex: 1
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10
  },
  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-start' // Align value text to the start
  },
  value: {
    color: 'black',
    fontSize: 12
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 10, // Adjust as needed
    transform: [{ translateX: -6 }] // Center the arrow
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black'
  }
})

export default AQIVisualizer
