/*Elmo Tiitola 2018
luo vastapäivään pyörivän animaation jota voidaan käyttää halutessa muissa ohjelman osissa.*/

'use strict';

import React, {Component} from 'react';
import {Animated} from 'react-native';

export default class CounterSpinView extends Component {

    state = {
        Animation: new Animated.Value(0)
    }

    runAnimation() {

        this.state.Animation.setValue(0);
        Animated.timing(
            this.state.Animation,
            {
                toValue:1,
                duration:30000,
            }
        ).start(() => this.runAnimation());
    }

    componentDidMount() {
        this.runAnimation();
    }

    render() {

        const interpolateRotation = this.state.Animation.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '-1080deg'],
        })
        const animatedStyle = {
            transform: [
                {rotate: interpolateRotation}
            ]
        }

        return (
            <Animated.View style={[animatedStyle]}>
                {this.props.children}         
            </Animated.View>
        );      
    }
}