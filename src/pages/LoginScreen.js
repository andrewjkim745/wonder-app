import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { login, signUp, subscribeToAuthChanges } from '../services/ApiConfig'

class LoginScreen extends Component {

    state = {
      authMode: 'login'
    }
  
    componentDidMount() {
      subscribeToAuthChanges(this.onAuthStateChanged)
    }
  
    onAuthStateChanged = (user) => {
      if (user !== null) {
        this.props.navigation.navigate('App');
      }
    }
  
    switchAuthMode = () => {
      this.setState(prevState => ({
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }));
    }
  
    render() {
      return (
        <AuthForm
          login={login}
          signup={signUp}
          authMode={this.state.authMode}
          switchAuthMode={this.switchAuthMode}
        />
      );
    }
  }
  
  
  export default LoginScreen;
