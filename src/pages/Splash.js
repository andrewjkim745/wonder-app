import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Button, Image} from 'react-native';
import AnimatedSplash from 'react-native-animated-splash-screen'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
// import { Icon } from 'react-native-elements'
import Logo from '../assets/coffee.png'
import Smoke from '../assets/smoke.png'
import firebase from 'react-native-firebase'

const { width, height } = Dimensions.get('window')
// Change class component into function component in order to use hooks for animation
export default class Splash extends Component {

    state = {
        isLoaded: false,
        logoAnim: new Animated.Value(0)
        // experimental change
    }

    componentDidMount() {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? 'Auth' : 'Auth')
        })
        }, 5000)
        this.setState({
            isLoaded: true,
            fadeAnim: new Animated.Value(0),
            fadeSmoke: new Animated.Value(0)
        })
    }

    fadeIn = () => {
        const { fadeAnim, logoAnim } = this.state;
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000
        }).start(),
        Animated.parallel([
            Animated.spring(logoAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
            }).start(),
        ])
    }

    fadeInSmoke = () => {
        const { fadeSmoke } = this.state;
        Animated.timing(fadeSmoke, {
            toValue: 1,
            duration: 1000
        }).start();
    }

    splashColors = {
        splash: [
            'rgb(48, 234, 138)',
            'rgb(51, 204, 51)',
            'rgb(153, 255, 153)'    
        ]
    }

    render() {
        const { isLoaded, logoAnim, fadeSmoke } = this.state
        setTimeout(() => {
            this.fadeIn()
        }, 0)
        setTimeout(() => {
            this.fadeInSmoke()
        }, 1200)
        setTimeout(() => {
            this.props.navigation.navigate('Auth')
        }, 5000)
        return (
            <AnimatedSplash
            translucent={true}
            isLoaded={isLoaded}
            >
                <AnimatedLinearGradient
                customColors={this.splashColors.splash}
                speed={1000}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                    <Animated.View 
                    style={[styles.smoke], { opacity: fadeSmoke}}
                    >
                        <Image
                        source={Smoke}
                        />
                    </Animated.View>
                    <Animated.View
                    style={[styles.animatedImage, {
                        opacity: logoAnim,
                        top: logoAnim.interpolate({
                            inputRange: [0,1],
                            outputRange: [80, 0],
                        })
                     }]}>
                    <Image 
                        source={Logo}
                        />
                    </Animated.View>
                        <Animated.View
                        style={[styles.fadingText,{ opacity: this.state.fadeAnim}]}
                        > 
                        <Text style={styles.welcome}>Welcome Barista!
                        </Text>
                        </Animated.View>
                    </View>
                </View>
                </AnimatedLinearGradient>
            </AnimatedSplash>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#30EA8A',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height
    },
    fadingText: {
        
    },
    animatedImage: {

    },
    smoke: {
    },
    textContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'column',
        width,
        height
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold'
    },
})