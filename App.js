import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
// import LoadingScreen from './src/screens/LoadingScreen'
import Splash from './src/pages/Splash'



const AppStack = createStackNavigator({
  // Screens & Tabs to be added
  Home: HomeScreen
});

// Auth Screen
const AuthStack = AuthScreen

// App Container
const App = createSwitchNavigator(
  {
    Splash: Splash,
    App: AppStack,
    Auth: AuthStack
  }, 
  {
    initialRouteName: "Splash"
  }
)

export default createAppContainer(App)