import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SensorCard = ({ title, value, unit, iconName }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={30} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.textContainer2}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '45%',
    elevation: 5
  },
  iconContainer: {
    marginRight: 15
  },
  textContainer: {
    flexDirection: 'column'
  },
  textContainer2: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 24
  },
  unit: {
    fontSize: 16
  }
})

export default SensorCard
