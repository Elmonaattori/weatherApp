 /* Elmo Tiitola 2018
Sääohjelma, joka hakee Darksky-rajapinnasta sääennustuksia ennalta valittuihin kaupunkeihin.

Täällä luodaan rakenne appille. Stacknavigator, jossa toisena osana kaupunkivalitsin ja toisena
osana tabbarnavigator. Tabbarnavigator sisältää nykyisen säänäkymän, päiväennusteen ja tuntiennusteen.
*/
 
 'use strict';

import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import {Button, Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import CityView from './CityView';
import DailyData from './DailyData'
import HourlyData from './HourlyData';
import Current from './CurrentWeatherTab'


//Tässä tulee tabnavigator johon lisätään eri näkymät.
export const BottomTab = createBottomTabNavigator ({

  Current: {screen: Current},    
  Daily: {screen: DailyData},
  Hourly: {screen: HourlyData}, 
  },
  {

  //tabbarin asetukset
  tabBarOptions: {
    activeTintColor: 'rgb(255,255,255)',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'rgb(190, 80, 50)'
    }
  },
})


//Stacknavigator tulee tässä.
export const MainStackNavigator = createStackNavigator({

  //Tabbarnavigator
  FirstScreen: {screen: BottomTab,
    navigationOptions: ({navigation }) => ({
      headerRight: <Button title='Kaupunki' onPress={() => navigation.navigate('SecondScreen', {})}/>,
      headerStyle: {
        backgroundColor: 'rgb(190, 80, 50)',    
      },
      headerTitleStyle: {
        fontFamily: 'Avenir',
        fontSize: 30
      },
      title: 'SÄÄ',
      headerTintColor: 'rgb(255,255,255)' 
    }),  
  },
  //Kaupunkivalitsin
  SecondScreen: {screen: CityView}
},
{mode: 'modal'}
)


const AppContainer = createAppContainer(MainStackNavigator)



export default class App extends Component {

  //Luokan rakenteja, täällä this.statessa pidetään tieto nykyisestä kaupunkivalinnasta.
  constructor(props) {

    super(props);
    this.state = {     
        activeCity: 0,    
    }
  }

  componentDidMount() {
    this.render()
  }

  //Jos kaupunki valitaan kaupunkinäkymästä, täällä napataan muutos.
  SetActiveCity = (ActiveCity) => {

    this.setState({activeCity: ActiveCity},
      this.componentDidMount()
    )
  }

  //Renderöidään koko höskä.
  render() {
    return <AppContainer
      screenProps = {{
        activeCity: this.state.activeCity,
        SetActiveCity: this.SetActiveCity
      }}/>
  }
}


