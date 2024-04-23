// import { readFileSync } from 'fs'
const fs = require('fs')

// Function to read air quality data from the JSON file
function readAirQualityDataFromFile() {
  const data = fs.readFileSync('air_quality_data.json', 'utf8')
  return JSON.parse(data)
}

console.log(readAirQualityDataFromFile())

// Function to get unique states from the data
function getUniqueStates(data) {
  return [...new Set(data.map((station) => station.state))]
}

// Function to generate buttons for each unique state
function generateStateButtons(states) {
  const buttonsContainer = document.getElementById('buttons-container')
  buttonsContainer.innerHTML = ''

  states.forEach((state) => {
    const button = document.createElement('button')
    button.textContent = state
    button.addEventListener('click', () => {
      showDataByState(state)
    })
    buttonsContainer.appendChild(button)
  })
}

// Function to show data for a specific state
function showDataByState(state) {
  const dataContainer = document.getElementById('data-container')
  const filteredData = airQualityData.filter(
    (station) => station.state === state
  )

  let html = `<h2>${state}</h2><ul>`
  filteredData.forEach((station) => {
    html += `<li>Station: ${station.station}<br>`
    html += `City: ${station.city}<br>`
    html += `Last Update: ${station.last_update}<br>`
    html += `Pollutant ID: ${station.pollutant_id}<br>`
    html += `Pollutant Min: ${station.pollutant_min}<br>`
    html += `Pollutant Max: ${station.pollutant_max}<br>`
    html += `Pollutant Avg: ${station.pollutant_avg}<br></li>`
  })
  html += '</ul>'

  dataContainer.innerHTML = html
}

// Read air quality data from file
const airQualityData = readAirQualityDataFromFile()

// Get unique states
const uniqueStates = getUniqueStates(airQualityData)

// Generate buttons for unique states
generateStateButtons(uniqueStates)
