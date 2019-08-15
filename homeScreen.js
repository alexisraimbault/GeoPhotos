import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

export default class HomeScreen extends Component {

constructor(props) {
  super(props);
  this.state = {
    latitude : 0,
    longitude : 0,
    error : null
  };
}

static navigationOptions = {
    title: 'Home',
  };

searchPlaces(){
  console.log('fetching nearby places');
  /*return fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=500&key=AIzaSyDD3JpU9AjYVrDwsIWuvm1zrbUNfavYbd0`)
    .then( (response) => response.json() )
    .then( (responseJson) => {
      console.log(responseJson);
    });*/
}

componentDidMount(){
  navigator.geolocation.getCurrentPosition(position =>{
    this.setState({
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
      error : null
    });
    this.searchPlaces();
  },
  error => this.setState({ error : error.message }),
  { enableHighAccuracy : true, timeout : 20000, maximumAge : 2000}
  );

}

  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          style = {styles.map}
          initialRegion = {{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate = {this.state}>
            <View style = {styles.radius}>
              <View style = {styles.marker}/>
            </View>
          </Marker>
        </MapView>
        <TouchableOpacity style={styles.takePictureFolder} onPress={() => navigate('Photo', {})}>
          <Image style={styles.takePictureImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  takePictureImage: {
    width: 70,
    height: 70,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
    backgroundColor:'red'
  },
  takePictureFolder: {
    position: 'absolute',
    top: '80%',
    left: '0%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:3
  },
  radius : {
    height : 50,
    width : 50,
    borderRadius : 50/2,
    overflow : 'hidden',
    backgroundColor : 'rgba(0, 122, 255, 0.1)',
    borderWidth : 1,
    borderColor : 'rgba(0, 122, 255, 0.3)',
    alignItems : 'center',
    justifyContent : 'center'
  },
  marker : {
    height : 20,
    width : 20,
    borderWidth : 3,
    borderColor : 'white',
    borderRadius : 20/2,
    overflow : 'hidden',
    backgroundColor : '#007AFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map : {
    left : 0,
    right : 0,
    top : 0,
    bottom : 0,
    position : 'absolute'
  },
});
