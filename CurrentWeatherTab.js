/*Elmo Tiitola 2018
Nykyisen säätilan näkymä, tämä näkymä avautuu ohjelman käynnistyessä.*/

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';

import FadeView from './FadeView'
import WeatherView from './weatherView'


export default class Current extends Component {

    constructor(props) {

        super(props);
        this.state = {
            weekdays: ['Su','Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
            isLoading: true,
            weatherData: null,
            activeCity: this.props.screenProps.activeCity,
            activeCityName: 'Tampere',
            domain: 'https://api.darksky.net/forecast/0230978c7c59666187b0ce0f49a95f68/61.4898,23.7840',
            lat: '61.4898',
            long: '23.7840',
            Cities: [
                {'name': 'Tampere', 'lat': '61.4898', 'long': '23.7840'},
                {'name': 'Helsinki', 'lat': '60.1654', 'long': '24.9474'},
                {'name': 'Hikia', 'lat': '60.7600', 'long': '24.9144'},
                {'name': 'Rovaniemi', 'lat': '66.5005', 'long': '25.7291'},
                {'name': 'Oulu', 'lat': '65.0132', 'long': '25.4755'},
                {'name': 'Lahti', 'lat': '60.9827', 'long': '25.6561'},
                {'name': 'Oitti', 'lat': '60.7872', 'long': '25.0263'},
                {'name': 'Jyväskylä', 'lat': '62.2420', 'long': '25.7469'},
                {'name': 'Riihimäki', 'lat': '60.7382', 'long': '24.7731'},
                {'name': 'Turku', 'lat': '60.4519', 'long': '22.2666'},
                {'name': 'Joensuu', 'lat': '62.6021', 'long': '29.7629'},
                {'name': 'Hannover', 'lat': '52.3670', 'long': '9.7170'}, 
                {'name' : 'Berliini', 'lat': '52.5171', 'long': '13.4061'}
              ],   
            iconSource: './weatherIcons/rain.png'       
        }
    }

    static navigationOptions = {

        headerStyle: {
          backgroundColor: 'rgb(190, 80, 50)',      
        },
        headerTitleStyle: {
          fontFamily: 'Avenir',
         fontSize: 30
        },
        title: 'SÄÄ NYT',
        headerTintColor: 'rgb(255,255,255)' ,
        tabBarLabel: 'Sää nyt',
        tabBarIcon: () => (
            <Image source= {require("./tabBarIcons/nyt.png")} style ={{height: 30, width: 30}}/>
        )  
    }
    
    //Datan haku rajapinnasta ja sen tallennus weatherData-muuttujaan.
    FetchData() {

        return fetch(this.state.domain)
        .then ( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
                isLoading: false,
                weatherData: responseJson,
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    setCoordinates() {
        
        this.setState({
            lat: this.state.Cities[this.state.activeCity].lat,
            long: this.state.Cities[this.state.activeCity].long
        },
        () => this.setDomain()

        )
    }

    setDomain() {
        
        this.setState({
            domain: 'https://api.darksky.net/forecast/36a637f9f860a60b2c91386b08f525c7/' + this.state.lat + ',' + this.state.long + '?lang=fi'
        },
        () => this.FetchData())
    }



    componentDidMount () {
      
        const {navigation} = this.props

        this.setState({      
        },
        () => this.setCoordinates())
    }  
    
    //Kun näkymä käynnistyy, säädetään stateen muuttujat oikeiksi.
    componentDidUpdate(prevProps) {

        if (prevProps.screenProps.activeCity !== this.props.screenProps.activeCity) {
            this.setState({activeCity: this.props.screenProps.activeCity, isLoading:true },
            this.forceUpdate(), this.componentDidMount())      
        }
    }

    render () {
        
        if (this.state.isLoading) {
            return (
                <View style = {{flex:1, backgroundColor: 'rgb(190, 80, 50)', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )     
        }

        else if (!this.state.isLoading) {

            var a = new Date(this.state.weatherData.currently.time*1000)
            var weekday = this.state.weekdays[a.getDay()]
            var hour = ((a.getHours()<10?'0':'') + a.getHours());
            
            var minutes = ((a.getMinutes()<10?'0':'') + a.getMinutes());         
            var time = hour + ':' + minutes

            var b = new Date(this.state.weatherData.daily.data[0].sunriseTime*1000)
            var sunrisehour = ((b.getHours()<10?'0':'') + b.getHours());
            var sunriseminutes = ((b.getMinutes()<10?'0':'') + b.getMinutes());         
            var sunrisetime = sunrisehour + ':' + sunriseminutes


            var c = new Date(this.state.weatherData.daily.data[0].sunsetTime*1000)
            var sunsethour = ((c.getHours()<10?'0':'') + c.getHours());
            var sunsetminutes = ((c.getMinutes()<10?'0':'') + c.getMinutes());         
            var sunsettime = sunsethour + ':' + sunsetminutes
            
            return(
      
                <View style = {{flex:1, backgroundColor: 'rgb(190, 80, 50)', paddingHorizontal: 40}}>
                    <FadeView style= {{flex:1}}>
                        <Text style = {styles.cityText}>{this.state.Cities[this.state.activeCity].name}</Text>                
                        <View style= {styles.weatherBox}>
                            <View style = {styles.smallWeatherBox}>
                                <WeatherView>{this.state.weatherData.currently.icon}</WeatherView>
                                <Text style= {styles.bigText}>{((this.state.weatherData.currently.temperature-32)/1.8).toFixed(0) + '°C'}</Text>
                            </View>
                            <Text style ={styles.bigText}>
                                {weekday + '   ' + time}
                            </Text>
                            <Text style ={styles.bigText}>
                                {this.state.weatherData.currently.summary}
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <View style={styles.smallInfoContainer}>
                                <View style ={styles.evenSmallerInfoContainer}>
                                    <Image source={require('./weatherIcons/tuulipieni.png')} style = {{height: 40, width: 40}}/>
                                    <Text style = {styles.smallText}>{this.state.weatherData.currently.windSpeed + ' m/s'}</Text>    
                                </View>
                                <View style ={styles.evenSmallerInfoContainer}>
                                    <Image source={require('./weatherIcons/vesipisara.png')} style = {{height: 30, width: 30}}/>
                                    <Text style = {styles.smallText}> {((this.state.weatherData.currently.precipProbability)*100).toFixed(0) + ' %'}</Text>              
                                </View>    
                            </View>
                            <View style={styles.smallInfoContainer}>
                                <View style ={styles.evenSmallerInfoContainer}>
                                    <Image source={require('./weatherIcons/auringonnousu.png')} style = {{height: 30, width: 30}}/>
                                    <Text style = {styles.smallText}>{sunrisetime}</Text>  
                                </View>
                                <View style ={styles.evenSmallerInfoContainer}>
                                    <Image source={require('./weatherIcons/auringonlasku.png')} style = {{height: 30, width: 30}}/>
                                    <Text style = {styles.smallText}>{sunsettime} </Text>  
                                </View>
                            </View>
                        </View>
                    </FadeView>     
                </View>
            ) 
        }
    }
}
    

const styles = StyleSheet.create({

    topBarText: {
        alignSelf: 'center',
        paddingTop:50,
        paddingBottom:20,
        fontSize: 30,
        color: 'rgb(255,255,255)',
        fontFamily: 'Avenir'
    },
    bigText: {
        paddingTop: 0,
        fontSize: 30,
        color: 'rgba(255,255,255, 0.75)',
        fontFamily: 'Avenir'
    },
    smallText: {
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'rgba(255,255,255, 0.8)',
        fontFamily: 'Avenir'
    },
    weatherBox: {
        flex:2,
        paddingTop:20,
        alignSelf: 'stretch', 
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 70,
    },
    smallWeatherBox: { 
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    infoContainer: {  
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',    
    },
    smallInfoContainer: {
        flex: 1,
        flexDirection: 'column',  
    },
    evenSmallerInfoContainer: {
        flex:1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',   
    },
    cityText: {
        fontSize: 30,
        color: 'rgba(255,255,255, 0.75)',
        fontFamily: 'Avenir',
        alignItems: 'center'
    },
})

