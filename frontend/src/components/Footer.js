// Footer.js
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'

const Footer = ({ activeOption }) => {
  const navigation = useNavigation()

  const options = [
    { name: 'phone-portrait', text: 'Add Device', route: 'AddDevice' },
    { name: 'home-outline', text: 'Home', route: 'Home' },
    { name: 'book-outline', text: 'Blog', route: 'Blog' },
    { name: 'mail-outline', text: 'Contact Us', route: 'ContactUs' }
  ]

  const handleOptionPress = (route) => {
    navigation.navigate(route)
  }

  return (
    <View style={styles.footer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.footerOption}
          onPress={() => handleOptionPress(option.route)}
        >
          <Icon
            name={activeOption === option.name ? option.name : `${option.name}`}
            size={20}
            color={activeOption === option.name ? '#ff0000' : '#fff'}
            style={activeOption === option.name ? styles.activeIcon : null}
          />
          <Text
            style={[
              styles.footerText,
              activeOption === option.name ? styles.activeText : null
            ]}
          >
            {option.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#111307',
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around'
  },
  footerOption: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerText: {
    color: '#F2F4E1',
    fontSize: 16,
    marginVertical: 2,
    marginLeft: 3
  },
  activeIcon: {
    fontWeight: 'bold'
  },
  activeText: {
    color: '#ff0000',
    fontWeight: 'bold'
  }
})

export default Footer
