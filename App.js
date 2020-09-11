import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import LoadingScreen from './src/screens/LoadingScreen'


const AppStack = createStackNavigator({
  // Screens & Tabs to be added
  Home: HomeScreen
});

// Auth Screen
const AuthStack = AuthScreen

// App Container
const App = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
  }, 
  {
    initialRouteName: "Loading"
  }
)

export default createAppContainer(App)