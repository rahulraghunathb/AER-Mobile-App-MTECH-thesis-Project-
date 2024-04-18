// Define a function to get the user's location and fetch air quality data for the nearest station
async function getNearestStationAirQuality() {
  try {
    const position = await getPosition()
    const userLatitude = position.coords.latitude
    const userLongitude = position.coords.longitude

    let offset = 0
    const limit = 1000
    let totalRecords = 0
    let fetchedRecords = []

    while (offset <= totalRecords) {
      const data = await fetchAirQualityData(offset, limit)
      totalRecords = data.total
      fetchedRecords = fetchedRecords.concat(data.records)
      offset += limit
    }

    const nearestStation = findNearestStation(
      fetchedRecords,
      userLatitude,
      userLongitude
    )

    if (nearestStation) {
      updateHtml(nearestStation)
    } else {
      console.error('No station found.')
    }
  } catch (error) {
    console.error('Error:', error)
    // Handle error scenario
  }
}

// Function to get the user's current position
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// Function to fetch air quality data with given offset and limit
async function fetchAirQualityData(offset, limit) {
  const apiUrl = `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000015b17a4bdbb904cd244381164bbd5672e&format=json&offset=${offset}&limit=${limit}`
  const response = await fetch(apiUrl)
  const data = await response.json()
  return data
}

// Function to find the nearest station among all fetched records
function findNearestStation(records, userLatitude, userLongitude) {
  let nearestStation = null
  let minDistance = Infinity

  records.forEach((station) => {
    const stationLatitude = parseFloat(station.latitude)
    const stationLongitude = parseFloat(station.longitude)
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      stationLatitude,
      stationLongitude
    )
    if (distance < minDistance) {
      minDistance = distance
      nearestStation = station
    }
  })

  return nearestStation
}

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = R * c // in meters
  return distance
}

// Function to update HTML elements with the fetched data
function updateHtml(nearestStation) {
  document.getElementById('nearest-station').textContent =
    nearestStation.station
  document.getElementById('city').textContent = nearestStation.city
  document.getElementById('last-update').textContent =
    nearestStation.last_update
  document.getElementById('pollutant-id').textContent =
    nearestStation.pollutant_id
  document.getElementById('pollutant-min').textContent =
    nearestStation.pollutant_min
  document.getElementById('pollutant-max').textContent =
    nearestStation.pollutant_max
  document.getElementById('pollutant-avg').textContent =
    nearestStation.pollutant_avg
}

// Call the function to get air quality data for the nearest station
getNearestStationAirQuality()
