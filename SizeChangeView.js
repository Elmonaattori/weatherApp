/*Elmo Tiitola 2018
luo kokoa muuttavan animaation jota voidaan käyttää halutessa muissa ohjelman osissa.*/

'use strict';

import React, {Component} from 'react';
import {Animated} from 'react-native';


export default class SizeChangeView extends Component {

    state = {
        Animation: new Animated.Value(0)     
    }

    runAnimationBigger() {
        Animated.timing(
            this.state.Animation,
            {
                toValue:1,
                duration:2000,
            }
        ).start(() => this.runAnimationSmaller());
    }

    runAnimationSmaller() {
        Animated.timing(
            this.state.Animation,
            {
                toValue:0,
                duration:2000,
            }
        ).start(() => this.runAnimationBigger());
    }
    
    componentDidMount() {
        this.runAnimationBigger()
    }

    render() {
        const interpolateSize = this.state.Animation.interpolate({
            inputRange: [0,1],
            outputRange: [1, 1.4],
        })
        const animatedStyle = {
            transform: [
                {scaleX: interpolateSize}
            ]
        }

        return (
            <Animated.View style={[animatedStyle]}>
                {this.props.children}       
            </Animated.View>
        );      
    }
}