/*Elmo Tiitola 2018
Luo nykyisen säätilan näkymään sopivan sääsymbolin. Sääsymboli voidaan hakea tarvittaessa
jostain muusta ohjelman osasta käyttämällä oikeaa säätilan nimeä. esim. 'rain'.*/

'use-strict';

import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native'

import BlinkView from './BlinkView'
import FloatView from './FloatView'
import SizeChangeView from './SizeChangeView'
import SpinView from './SpinView'
import CounterSpinView from './CounterSpinView'


export default class WeatherView extends Component {

    render({children} = this.props) {

        if (children === 'rain') {

            return (
                <ImageBackground source={require('./weatherIcons/pilvi.png')} style={{height:150, width: 150}}>
                    <BlinkView>
                        <Image source = {require('./weatherIcons/sade.png')} style= {{height:110, width:110}}></Image>
                    </BlinkView>
                </ImageBackground>
            )
        }

        else if (children  === 'cloudy') {

            return (
                <ImageBackground source={require('./weatherIcons/pilvi.png')} style={{height:150, width: 150}}>
                    <SizeChangeView>
                        <Image source = {require('./weatherIcons/pilvi.png')} style= {{height:110, width:110}}></Image>
                    </SizeChangeView>
                </ImageBackground>
            )
        }

        else if (children  === 'clear-day') {

            return( 
                <SpinView>
                    <Image source = {require('./weatherIcons/aurinko.png')} style= {{height:150, width:150}}></Image>
                </SpinView>
            )
        }

        else if (children  === 'clear-night') {

            return (
                <SpinView>
                    <Image source = {require('./weatherIcons/kuu.png')} style= {{height:110, width:110}}></Image>
                </SpinView>
            )
        }

        else if (children  === 'fog') {

            return (
                <BlinkView>
                    <Image source = {require('./weatherIcons/sumu.png')} style= {{height:150, width:150}}></Image>
                </BlinkView>
            )
        }

        else if (children  === 'partly-cloudy-day') {

            return( 
                <SpinView>
                    <ImageBackground style={{flex:1}} source ={require('./weatherIcons/aurinko.png')} style={{height:135, width:135, alignItems: 'center', justifyContent: 'center'}}>
                        <CounterSpinView>
                            <Image source = {require('./weatherIcons/pilvi.png')} style= {{height:150, width:150}}></Image>
                        </CounterSpinView>
                    </ImageBackground>
                </SpinView>
            )
        }

        else if (children  === 'partly-cloudy-night') {

            return( 
                <SpinView>
                    <ImageBackground style={{flex:1}} source ={require('./weatherIcons/kuu.png')} style={{height:90, width:90, alignItems: 'center', justifyContent: 'center'}}>
                        <CounterSpinView>
                            <FloatView>
                                <Image source = {require('./weatherIcons/pilvi.png')} style= {{height:150, width:150}}></Image>
                            </FloatView>
                        </CounterSpinView>
                    </ImageBackground>
                </SpinView>
            )
        }

        else if (children  === 'sleet') {

            return(
                <ImageBackground source={require('./weatherIcons/lumi.png')} style={{height:150, width: 150}}>
                    <BlinkView>
                        <Image source = {require('./weatherIcons/sade.png')} style= {{height:110, width:110}}></Image>
                    </BlinkView>
                </ImageBackground>
            )
        }

        else if (children  === 'snow') {

            return(
                <SpinView>
                    <Image source = {require('./weatherIcons/lumi.png')} style= {{height:150, width:150}}></Image>
                </SpinView>
            )
        }

        else if (children  === 'wind') {

            return(
                <FloatView>
                    <Image source = {require('./weatherIcons/tuuli.png')} style= {{height:150, width:150}}></Image>
                </FloatView>
            )
        }

        else {
            return null
        }
    }
}