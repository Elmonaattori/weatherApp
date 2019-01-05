/*Elmo Tiitola 2018
Päivittäisen sääennustuksen näkymä.*/

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, Image} from 'react-native';

import FadeView from './FadeView'
import SmallWeatherView from './SmallWeatherView'


export default class DailyData extends Component {

    static navigationOptions = {
        tabBarLabel: 'Sääennuste',
        tabBarIcon: () => (
            <Image source= {require("./tabBarIcons/kalenteri.png")} style ={{height: 30, width: 30}}/>
        )
    }
       
    constructor(props) {

        super(props);
        this.state = {
            weekdays: ['Su','Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
            isLoading: true,
            weatherData: null,
            activeCity: this.props.screenProps.activeCity,
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


    //Haetaan data rajapinnasta.
    FetchData() {

        return fetch(this.state.domain)
        .then ( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
                isLoading: false,
                weatherData: responseJson.daily.data,
            })
        })
        .catch((error) => {
            console.log(error)
        });   
    }

    setCoordinates() {
           
        this.setState({
            lat: this.state.Cities[this.props.screenProps.activeCity].lat,
            long: this.state.Cities[this.props.screenProps.activeCity].long
        },
        () => this.setDomain()
        )
    }

    setDomain() {
        
        this.setState({
            domain: 'https://api.darksky.net/forecast/36a637f9f860a60b2c91386b08f525c7/' + this.state.lat + ',' + this.state.long
        },
        () => this.FetchData())
    }

    componentDidMount () {
        
        this.setState({     
        },
        () => this.setCoordinates())
    }  

    componentDidUpdate(prevProps) {

        if (prevProps.screenProps.activeCity !== this.props.screenProps.activeCity) {
            this.setState({activeCity: this.props.screenProps.activeCity, isLoading:true},
            this.forceUpdate(), this.componentDidMount())   
        }
    }
  
    returnData(activeCity) {
        this.setState({activeCity: activeCity, isLoading:true});
        this.componentDidMount()
        this.forceUpdate()
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

            return(
                <View style = {{backgroundColor: 'rgb(190, 80, 50)', flex:1}}>
                    <FadeView>                
                        <ScrollView style={{flexGrow: 1}}> 
                            {this.state.weatherData.map((day, i) => {
                                var a = new Date(day.time*1000)
                                var weekday = a.getDay()
                        
                                if (day.icon === 'rain' || day.icon === 'cloudy' || day.icon === 'fog' || day.icon === 'wind') {
                                    return (
                                        <View key={i} style={styles.cloudydayitem}>
                                            <View style={styles.timeContainer}>
                                                <Text style={styles.textStyle}>
                                                    {this.state.weekdays[weekday]}
                                                </Text>                              
                                            </View>                           
                                            <View style={{flexDirection: 'row'}}>
                                                <View>
                                                    <SmallWeatherView>{day.icon}</SmallWeatherView>
                                                </View>
                                                <View style = {styles.infoContainer}>
                                                     <Text style={styles.textStyle}>
                                                        {((day.temperatureHigh - 32)/1.8).toFixed(0) + ' °C'}
                                                    </Text>
                                                    <Text style={styles.smallTextStyle}>
                                                        {day.windSpeed + ' m/s'}
                                                    </Text>
                                                </View>
                                            </View>                                                                   
                                        </View>
                                    ) 
                                }

                                else if (day.icon === 'clear-day'  || day.icon === 'partly-cloudy-day' ) {
                                    return(
                                        <View key={i} style={styles.cleardayitem}>
                                            <View style={styles.timeContainer}>
                                                <Text style={styles.textStyle}>
                                                    {this.state.weekdays[weekday]}
                                                </Text>                             
                                            </View>                          
                                            <View style={{flexDirection: 'row'}}>                            
                                                <View>
                                                    <SmallWeatherView>{day.icon}</SmallWeatherView>
                                                </View>                              
                                                <View style = {styles.infoContainer}>
                                                    <Text style={styles.textStyle}>
                                                        {((day.temperatureHigh - 32)/1.8).toFixed(0) + ' °C'}
                                                    </Text>                              
                                                    <Text style={styles.smallTextStyle}>
                                                        {day.windSpeed + ' m/s'}
                                                    </Text>                             
                                                </View>                               
                                            </View>                                                  
                                        </View>
                                    ) 
                                }
                                
                                else if (day.icon === 'partly-cloudy-night' || day.icon === 'clear-night') {
                                    return(
                                        <View key={i} style={styles.cleardayitem}>                         
                                            <View style={styles.timeContainer}>
                                                <Text style={styles.textStyle}>
                                                    {this.state.weekdays[weekday]}
                                                </Text>              
                                            </View>                                 
                                            <View style={{flexDirection: 'row'}}>                                 
                                                <View>
                                                    <SmallWeatherView>{'clear-day'}</SmallWeatherView>
                                                </View>                               
                                                <View style = {styles.infoContainer}>
                                                    <Text style={styles.textStyle}>
                                                        {((day.temperatureHigh - 32)/1.8).toFixed(0) + ' °C'}
                                                    </Text>
                                
                                                    <Text style={styles.smallTextStyle}>
                                                        {day.windSpeed + ' m/s'}
                                                    </Text>                              
                                                </View>                         
                                            </View>                                      
                                        </View> 
                                    )
                                }
                                
                                else if (day.icon === 'snow' || day.icon === 'sleet') {
                                    return( 
                                        <View key={i} style={styles.snowitem}>                            
                                            <View style={styles.timeContainer}>
                                                <Text style={styles.textStyle}>
                                                    {this.state.weekdays[weekday]}
                                                </Text>                       
                                            </View>                
                                            <View style={{flexDirection: 'row'}}>           
                                                <View>
                                                    <SmallWeatherView>{day.icon}</SmallWeatherView>
                                                </View>
                                                <View style = {styles.infoContainer}>
                                                    <Text style={styles.textStyle}>
                                                        {((day.temperatureHigh - 32)/1.8).toFixed(0) + ' °C'}
                                                    </Text>
                                                    <Text style={styles.smallTextStyle}>
                                                        {day.windSpeed + ' m/s'}
                                                    </Text>                             
                                                </View>                               
                                            </View> 
                                        </View>
                                    )
                                }                                    
                            })}              
                        </ScrollView>
                    </FadeView>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({

    snowitem: {  
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 10,
        margin: 0,
        backgroundColor: 'rgb(225,225,225)'     
      },
    nightitem: {    
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 10,
        margin: 0,
        backgroundColor: 'rgb(0,0,0)'        
      },
    cleardayitem: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 10,
        margin: 0,
        backgroundColor: 'rgb(30,105,155)'     
      },
    cloudydayitem: {    
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 10,
        margin: 0,
        backgroundColor: 'rgb(110,120,130)'     
      },
    item: { 
      height: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 10,
      margin: 0,
      borderColor: 'rgba(255,255,255, 0.5)',
      borderWidth: 0,
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingTop: 5,  
    },
    timeContainer: {
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-between',
        paddingTop: 5,  
    }, 
    textStyle: {
      marginHorizontal: 20,               
      color: 'rgba(255, 255, 255, 1)', 
      textAlign: 'center',           
      fontFamily: 'Avenir',
      fontSize: 30,
    },
    smallTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontFamily: 'Avenir',
        fontSize: 20
    },
    topBarView: {
        flex:1,
        backgroundColor: 'rgb(190, 80, 50)',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(255,255,255)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarText: {
        paddingTop:50,
        paddingBottom:20,
        fontSize: 30,
        color: 'rgb(255,255,255)',
        fontFamily: 'Avenir'
    },
});
