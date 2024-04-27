import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <View style={styles.backArrow}>
        <Icon
          name="ios-arrow-back"
          size={30}
          color="#333"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logoText.png')}
          style={styles.logo}
          // onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    width: '100%',
    position: 'relative',
    top: 0,
    zIndex: 1,
    marginTop: 0
  },
  backArrow: {
    marginRight: 10
  },
  arrowText: {
    color: '#333',
    fontSize: 20
  },
  logoContainer: {
    flex: 1,
    marginLeft: 90
  },
  logo: {
    width: 160,
    height: 70,
    resizeMode: 'contain'
  }
})

export default Header
