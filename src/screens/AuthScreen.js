import React, { Component } from 'react'
import AuthForm from '../pages/AuthForm'
import { login, signUp, updateAuth } from '../services/ApiConfig'

class AuthScreen extends Component {

    state = {
      authMode: 'login'
    }
  
    componentDidMount() {
      updateAuth(this.onAuthStateChanged)
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
  
  
  export default AuthScreen;
