/* eslint-disable react-native/no-inline-styles */
/* eslint-disable consistent-this */
/* eslint-disable no-alert */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet,
    Text, 
    View, 
    Image, 
    TouchableHighlight,
    TouchableOpacity,
    PermissionsAndroid,Platform } from 'react-native';
import Voice from 'react-native-voice';
import Geolocation from '@react-native-community/geolocation';

class Emergency extends Component {
    state = {
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
        currentLongitude: 'unknown',//Initial Longitude
        currentLatitude: 'unknown',//Initial Latitude

      };
    
      constructor(props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
      }
      componentDidMount = () => {
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location',
                }
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                that.callLocation(that);
              } else {
                alert('Permission Denied');
              }
            } catch (err) {
              alert('err',err);
              console.warn(err);
            }
          }
          requestLocationPermission();
        }
       }
       callLocation(that){
        //alert("callLocation Called");
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
             },
             (error) => console.log(error.message),
             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
          that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
              console.log(position);
              const currentLongitude = JSON.stringify(position.coords.longitude);
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
             that.setState({ currentLongitude:currentLongitude });
             //Setting state Longitude to re re-render the Longitude Text
             that.setState({ currentLatitude:currentLatitude });
             //Setting state Latitude to re re-render the Longitude Text
          });
       }
       componentWillUnmount = () => {
          Geolocation.clearWatch(this.watchID);
       }
      
    


  onSpeechStart = e => {

    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {

    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = e => {
   
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = e => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };
  EmergencyBtn(){
      return alert("Emergency Request Sent!")
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style = {styles.boldText}>
             Emergency Service
          </Text>
          <Text style = {styles.instructions}>
          Location
       </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:7}}>
            Longitude: {this.state.currentLongitude}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:5}}>
            Latitude: {this.state.currentLatitude}
          </Text>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
       <Text style={styles.stat}>Results</Text>
       {this.state.partialResults.map((result, index) => {
        return (
          <Text key={`partial-result-${index}`} style={styles.stat}>
            {result}
          </Text>
        );
      })}
       
      
        <TouchableOpacity onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('../image/button.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress = {this.EmergencyBtn.bind(this)}
        style = {styles.sendBtn}>
            <Text style = {styles.sendText}> Send Emergency </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    marginTop:15
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: 'red',
    marginTop:15
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  boldText: {
    fontSize: 30,
    color: 'red',
 },
 sendBtn:{
    
    height:35,
    width: '90%',
    borderWidth:1,
    borderRadius:5,
    borderColor:'red',
    marginTop : 10,
    marginRight : 20,
    marginLeft : 20,
   // justifyContent:'center',
    alignItems:'center',
   

   
 },
 sendText:{
   
    justifyContent:'center',
    fontSize:20,
    color:'red',
    paddingTop : 2,
    // paddingBottom : 10,
    fontWeight:'500',

 },
});

export default Emergency;