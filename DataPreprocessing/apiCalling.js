const fs = require('fs')

// Function to fetch air quality data with given offset and limit
async function fetchAirQualityData(offset, limit) {
  const apiUrl = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000015b17a4bdbb904cd244381164bbd5672e&format=json&offset=${offset}&limit=${limit}`
  const response = await fetch(apiUrl)
  const data = await response.json()
  return data
}

// Function to fetch all air quality data
async function fetchAllAirQualityData() {
  let offset = 0
  const limit = 1000
  let totalRecords = 0
  let allRecords = []

  do {
    const data = await fetchAirQualityData(offset, limit)
    totalRecords = data.total
    allRecords = allRecords.concat(data.records)
    offset += limit
  } while (offset < totalRecords)

  return allRecords
}

// Function to save data to a JSON file
function saveDataToFile(data) {
  fs.writeFile('air_quality_data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to file:', err)
    } else {
      console.log('Data saved to air_quality_data.json')
    }
  })
}

// Fetch all air quality data and save it to a file
async function fetchAndSaveData() {
  try {
    const allData = await fetchAllAirQualityData()
    saveDataToFile(allData)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the function to fetch and save data
fetchAndSaveData()
