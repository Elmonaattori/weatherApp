/*Elmo Tiitola 2018
luo välkkyvän animaation jota voidaan käyttää halutessa muissa ohjelman osissa.*/

'use strict';

import React, {Component} from 'react';
import {Animated} from 'react-native';


export default class BlinkView extends Component {

    state = {
      Animation: new Animated.Value(0)
    }
  
    FadeIN() {
      Animated.timing(
        this.state.Animation,
        {
          toValue:1,
          duration:1000,
        }
      ).start(() => this.FadeOut());  
    }

    FadeOut() {
      Animated.timing(
        this.state.Animation,
        {
          toValue:0.4,
          duration:1000,
        }
      ).start(() => this.FadeIN()); 
    }

    componentDidMount() {
        this.FadeIN()       
    }
  
    render() {
      
      let { Animation } = this.state;
      return (
        <Animated.View                 
          style={{
            ...this.props.style,
            opacity: Animation,         
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
