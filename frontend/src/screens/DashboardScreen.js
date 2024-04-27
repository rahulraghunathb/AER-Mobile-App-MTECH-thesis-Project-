import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { SelectList } from 'react_native_simple_dropdown_select_list'
import AQIVisualizer from '../components/AQIVisualizer'
import SensorCard from '../components/SensorCard'

// Example data for chart
const exampleData = {
  daily: [
    {
      label: 'Mon',
      data: [
        { key: '1', value: 10 },
        { key: '2', value: 20 },
        { key: '3', value: 5 },
        { key: '4', value: 8 },
        { key: '5', value: 15 },
        { key: '6', value: 120 }
      ]
    },
    {
      label: 'Tue',
      data: [
        { key: '1', value: 15 },
        { key: '2', value: 18 },
        { key: '3', value: 7 },
        { key: '4', value: 9 },
        { key: '5', value: 17 },
        { key: '6', value: 140 }
      ]
    },
    {
      label: 'Wed',
      data: [
        { key: '1', value: 12 },
        { key: '2', value: 22 },
        { key: '3', value: 6 },
        { key: '4', value: 10 },
        { key: '5', value: 18 },
        { key: '6', value: 130 }
      ]
    },
    {
      label: 'Thu',
      data: [
        { key: '1', value: 8 },
        { key: '2', value: 25 },
        { key: '3', value: 9 },
        { key: '4', value: 11 },
        { key: '5', value: 20 },
        { key: '6', value: 160 }
      ]
    },
    {
      label: 'Fri',
      data: [
        { key: '1', value: 18 },
        { key: '2', value: 28 },
        { key: '3', value: 12 },
        { key: '4', value: 15 },
        { key: '5', value: 22 },
        { key: '6', value: 200 }
      ]
    },
    {
      label: 'Sat',
      data: [
        { key: '1', value: 20 },
        { key: '2', value: 30 },
        { key: '3', value: 14 },
        { key: '4', value: 18 },
        { key: '5', value: 25 },
        { key: '6', value: 220 }
      ]
    },
    {
      label: 'Sun',
      data: [
        { key: '1', value: 14 },
        { key: '2', value: 24 },
        { key: '3', value: 11 },
        { key: '4', value: 14 },
        { key: '5', value: 18 },
        { key: '6', value: 170 }
      ]
    }
  ],
  weekly: [
    {
      label: 'Week 1',
      data: [
        { key: '1', value: 100 },
        { key: '2', value: 200 },
        { key: '3', value: 50 },
        { key: '4', value: 80 },
        { key: '5', value: 150 },
        { key: '6', value: 80 }
      ]
    },
    {
      label: 'Week 2',
      data: [
        { key: '1', value: 120 },
        { key: '2', value: 180 },
        { key: '3', value: 70 },
        { key: '4', value: 100 },
        { key: '5', value: 160 },
        { key: '6', value: 139 }
      ]
    },
    {
      label: 'Week 3',
      data: [
        { key: '1', value: 150 },
        { key: '2', value: 220 },
        { key: '3', value: 80 },
        { key: '4', value: 110 },
        { key: '5', value: 180 },
        { key: '6', value: 154 }
      ]
    },
    {
      label: 'Week 4',
      data: [
        { key: '1', value: 180 },
        { key: '2', value: 250 },
        { key: '3', value: 90 },
        { key: '4', value: 120 },
        { key: '5', value: 200 },
        { key: '6', value: 140 }
      ]
    }
  ],
  monthly: [
    {
      label: 'Jan',
      data: [
        { key: '1', value: 800 },
        { key: '2', value: 1000 },
        { key: '3', value: 400 },
        { key: '4', value: 600 },
        { key: '5', value: 900 },
        { key: '6', value: 150 }
      ]
    },
    {
      label: 'Feb',
      data: [
        { key: '1', value: 850 },
        { key: '2', value: 1100 },
        { key: '3', value: 450 },
        { key: '4', value: 650 },
        { key: '5', value: 1000 },
        { key: '6', value: 200 }
      ]
    },
    {
      label: 'Mar',
      data: [
        { key: '1', value: 900 },
        { key: '2', value: 1200 },
        { key: '3', value: 500 },
        { key: '4', value: 700 },
        { key: '5', value: 1100 },
        { key: '6', value: 172 }
      ]
    },
    {
      label: 'Apr',
      data: [
        { key: '1', value: 950 },
        { key: '2', value: 1300 },
        { key: '3', value: 550 },
        { key: '4', value: 750 },
        { key: '5', value: 1200 },
        { key: '6', value: 190 }
      ]
    },
    {
      label: 'May',
      data: [
        { key: '1', value: 90 },
        { key: '2', value: 200 },
        { key: '3', value: 200 },
        { key: '4', value: 70 },
        { key: '5', value: 100 },
        { key: '6', value: 112 }
      ]
    },
    {
      label: 'Jun',
      data: [
        { key: '1', value: 50 },
        { key: '2', value: 130 },
        { key: '3', value: 50 },
        { key: '4', value: 70 },
        { key: '5', value: 120 },
        { key: '6', value: 90 }
      ]
    }
  ]
}

const DashboardScreen = ({ route }) => {
  const data = [
    { key: '1', value: 'PM2.5' },
    { key: '2', value: 'PM10' },
    { key: '3', value: 'NO' },
    { key: '4', value: 'NH3' },
    { key: '5', value: 'SO2' },
    { key: '6', value: 'AQI' }
  ]

  const [timeframe, setTimeframe] = useState('daily')
  const [selectedKey, setSelectedKey] = useState('6')
  // const { deviceNumber } = route.params

  const handleKeyChange = (key) => {
    setSelectedKey(key)
  }

  const chartData = {
    labels: exampleData[timeframe].map((item) => item.label),
    datasets: [
      {
        data: exampleData[timeframe].map(
          (item) => item.data.find((d) => d.key === selectedKey).value
        )
      }
    ]
  }

  const screenWidth = Dimensions.get('window').width

  const aqi = Math.floor(Math.random() * 501)
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.TextControlContainer}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold'
            }}
          >
            Device Number: 3D478
          </Text>
          <Text style={{ marginTop: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Location:</Text>
            {'  '}
            V3, Vikramshila Complex, IIT Kharagpur, India
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'brown',
              marginVertical: 10
            }}
          >
            Last Updated: 6 hours ago
          </Text>
          <Text style={{ fontSize: 30, fontWeight: '500', marginTop: 18 }}>
            Air Quality Index(AQI IN)
          </Text>

          <Text style={{ fontSize: 100, fontWeight: 'bold', color: 'brown' }}>
            {aqi}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15
            }}
          >
            {/* POOR */}
          </Text>
        </View>

        <View style={styles.AQIVisualizerContainer}>
          <AQIVisualizer aqi={aqi} />
        </View>

        <View style={styles.sensorContainer}>
          <SensorCard
            title="PM2.5"
            value={25}
            unit="µg/m³"
            iconName="ios-cloud"
          />
          <SensorCard
            title="PM10"
            value={35}
            unit="µg/m³"
            iconName="ios-cloud"
          />
          <SensorCard
            title="Temp"
            value={28}
            unit="°C"
            iconName="ios-thermometer"
          />
          <SensorCard
            title="Humidity"
            value={60}
            unit="%"
            iconName="ios-water"
          />
        </View>

        <View style={styles.controlContainer}>
          {/* Buttons to change timeframe */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setTimeframe('daily')}
              style={[
                styles.button,
                timeframe === 'daily' && styles.activeButton
              ]}
            >
              <Text style={styles.buttonText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeframe('weekly')}
              style={[
                styles.button,
                timeframe === 'weekly' && styles.activeButton
              ]}
            >
              <Text style={styles.buttonText}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeframe('monthly')}
              style={[
                styles.button,
                timeframe === 'monthly' && styles.activeButton
              ]}
            >
              <Text style={styles.buttonText}>Monthly</Text>
            </TouchableOpacity>
          </View>

          {/* Dropdown to select value */}
          <View style={styles.dropdownContainer}>
            <SelectList
              data={data}
              whatWithSelected={(value) => handleKeyChange(value)}
              maxHeightList={80}
              placeholder="Select"
              valueToBeSaved="key"
              containerStyle={{
                width: 85,
                height: 45,
                borderColor: 'black'
              }}
              infoFontStyle={{ fontSize: 12, fontWeight: 'bold' }}
            />
          </View>
        </View>

        {/* Line chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: () => `black`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: '4'
              }
            }}
            bezier
            style={styles.chartStyle}
          />
        </View>
      </ScrollView>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 20
  },
  TextControlContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  sensorContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  visualizerContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 4,
    margin: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  chartStyle: {
    borderRadius: 16,
    margin: 10
  },

  activeButton: {
    backgroundColor: 'green'
  },
  controlContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  AQIVisualizerContainer: {
    margin: 10,
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 6,
    borderColor: 'black'
  }
})

export default DashboardScreen
