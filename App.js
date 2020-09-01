import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';


import Splash from './src/pages/Splash';
// import FacebookLogin from './src/pages/FacebookLogin';
// import Registration from './src/pages/Registration';
import HomePage from './src/pages/HomePage';
// import Signin from './src/pages/Signin';
import Profile from './src/pages/Profile';
import ClientList from './src/pages/ClientList';
import LoginScreen from './src/pages/LoginScreen'


const SplashStack = createSwitchNavigator (
  {
    // Splash,
    LoginScreen
    // FacebookLogin,
    // Registration,
    // Signin
  },
  {
    initialRouteName: 'LoginScreen',
  }
)

SplashStack.navigationOptions = {
  headerShown: false,
};

const MainNavigator = createStackNavigator (
  {
    SplashStack,
    HomePage,
    Profile,
    ClientList,
  },
  {
    initialRouteName: "SplashStack"
  }
);

const App = createAppContainer(MainNavigator);

export default App