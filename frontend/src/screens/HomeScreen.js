import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput,
  Image,
  ScrollView
} from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigation } from '@react-navigation/native'
import img from '../assests/device-img.png'

const HomeScreen = () => {
  const [scaleValue] = useState(new Animated.Value(1))
  const [searchText, setSearchText] = useState('')
  const [filteredCards, setFilteredCards] = useState([])

  const navigation = useNavigation()

  const cards = [
    '1B345',
    '2C578',
    '3D478',
    '4F980',
    '5P345',
    '6L578',
    '7G478',
    '8F080'
  ]

  const handleCardPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true
    }).start()
  }

  const handleCardPress = (deviceNumber) => {
    navigation.navigate('Dashboard', { deviceNumber }) // Navigate to the Dashboard screen
  }

  const handleSearch = () => {
    if (searchText.trim() === '') {
      // If search input is empty, reset filteredCards to the original cards array
      setFilteredCards(cards)
    } else {
      // Otherwise, filter cards based on searchText
      const filtered = cards.filter((card) =>
        card.includes(searchText.toUpperCase())
      )
      setFilteredCards(filtered)
    }
  }

  const renderCard = (deviceNumber) => (
    <TouchableOpacity
      key={deviceNumber}
      onPressIn={handleCardPressIn}
      onPress={() => handleCardPress(deviceNumber)}
    >
      <Image source={img} style={styles.image} />
      <Text style={styles.imageText}>DeviceID: {deviceNumber}</Text>
    </TouchableOpacity>
  )

  // Changed to renderCards based on searchText
  const renderCards = () => {
    const cardsToRender = searchText ? filteredCards : cards
    return cardsToRender.map((deviceNumber) => renderCard(deviceNumber))
  }

  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.insideContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Device ID"
              value={searchText}
              onChangeText={(text) => setSearchText(text.toUpperCase())}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>{renderCards()}</View>
        </View>
      </ScrollView>
      <Footer activeOption="home-outline" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column'

    // paddingVertical: 20,
    // paddingHorizontal: 15
  },
  insideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
    marginHorizontal: 13
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#3B7C0F',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingLeft: 10,
    color: '#111307'
  },
  searchButton: {
    backgroundColor: '#359740',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  searchButtonText: {
    color: '#f2f4e1',
    fontSize: 16,
    fontWeight: 'bold'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 90
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover'
  },
  imageText: {
    fontSize: 12,
    fontWeight: '700'
  }
})

export default HomeScreen
