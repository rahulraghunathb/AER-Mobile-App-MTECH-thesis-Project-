// index.js or src/index.js

import { AppRegistry } from 'react-native'
import App from './App' // Replace with the path to your main component
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
