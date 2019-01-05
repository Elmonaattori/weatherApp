/*Elmo Tiitola 2018
Täällä luodaan kaupunkivalitsinnäkymä.*/

'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';


export default class CityView extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgb(190, 80, 50)',    
    },
    headerTitleStyle: {
      fontFamily: 'Avenir',
      fontSize: 30
    },
    title: 'KAUPUNKI',
    headerTintColor: 'rgb(255,255,255)',          
  }

  //Kun valitsin avataan, asetetaan nykyinen valinta näkyville.
  componentDidMount() {
    const {navigation} = this.props;
        this.setState({activeCity: navigation.getParam('CityId', this.state.activeCity)}, this.forceUpdate())      
  }

  constructor(props) {

    super(props);
    this.state = {
      Cities: [
        {'name': 'Tampere', 'lat': '61,4898', 'long': '23,7840'},
        {'name': 'Helsinki', 'lat': '60,1654', 'long': '24,9474'},
        {'name': 'Hikiä', 'lat': '60,7600', 'long': '24,9144'},
        {'name': 'Rovaniemi', 'lat': '66,5005', 'long': '25,7291'},
        {'name': 'Oulu', 'lat': '65,0132', 'long': '25,4755'},
        {'name': 'Lahti', 'lat': '60,9827', 'long': '25,6561'},
        {'name': 'Oitti', 'lat': '60,7872', 'long': '25,0263'},
        {'name': 'Jyväskylä', 'lat': '62,2420', 'long': '25,7469'},
        {'name': 'Riihimäki', 'lat': '60,7382', 'long': '24,7731'},
        {'name': 'Turku', 'lat': '60,4519', 'long': '22,2666'},
        {'name': 'Joensuu', 'lat': '62,6021', 'long': '29,7629'},
        {'name': 'Hannover', 'lat': '52.3670', 'long': '9.7170'},
        {'name' : 'Berliini', 'lat': '52.5171', 'long': '13.4061'}
      ],
      activeCity: this.props.screenProps.activeCity,
    }
  }
  

  render() {    
    return(
      <View style = {{backgroundColor: 'rgb(190, 80, 50)', alignItems: 'center', flex:1 }}>           
        <ScrollView style={{flexGrow:6}}> 
        {
          this.state.Cities.map((item, i) => (
            //Nykyisellä valinnalla eri ulkomuoto kuin muilla.
            <TouchableOpacity
              style={[     
              styles.item,
              i === this.state.activeCity ? styles.activeItem : []
              ]}
              onPress={() => {this.props.screenProps.SetActiveCity(i), this.props.navigation.goBack()}}
              key={i}>
                <Text style={[
                  styles.textStyle,
                  i === this.state.activeCity ? styles.activeTextStyle : []
                  ]}>
                  {item.name}
                </Text>
            </TouchableOpacity>
          ))
        }
        </ScrollView>
      </View>
    )
  }
}
    
const styles = StyleSheet.create({

  item: {
    width: 300,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    margin: 7,
    borderColor: 'rgba(255,255,255, 0.5)',
    borderWidth: 1,
    backgroundColor: 'rgb(180, 100, 60)',
    borderRadius: 20
  },

  activeItem: {
    borderColor: 'rgb(255,0,0)',
    borderWidth:3,
    backgroundColor: 'rgb(200, 100, 60)',
  },

  textStyle: {
    marginHorizontal: 20,              
    color: 'rgba(255, 255, 255, 1)', 
    textAlign: 'center',              
    fontFamily: 'Avenir',
    fontSize: 18,
  },

  activeTextStyle: {
    fontSize : 22,
  },

  topBarView: {
    flex:1,
    backgroundColor: 'rgb(255, 80, 50)',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBarText: {
    paddingTop: 50,
    paddingBottom: 20,
      fontSize: 30,
      color: 'rgb(255,255,255)',
      fontFamily: 'Avenir'
  }
});
