/*Elmo Tiitola 2018
luo animaation jota voidaan käyttää halutessa muissa ohjelman osissa.*/

'use strict';

import React, {Component} from 'react';
import {Animated} from 'react-native';


export default class FadeView extends Component {
    state = {
      Animation: new Animated.Value(0)
    }
  
    componentDidMount() {
      Animated.timing(
        this.state.Animation,
        {
          toValue:1,
          duration:1000,
        }
      ).start();   
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