/* eslint-disable no-spaced-func */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable keyword-spacing */
/* eslint-disable prettier/prettier */
import { 
    createAppContainer, 
     StackActions, 
    NavigationActions 
  } from 'react-navigation';
  import React , {Component } from 'react';
  import {
      StyleSheet,
      TextInput,
      Image,
      ImageBackground,
      KeyboardAvoidingView,
      Button,
      Text,
      TouchableOpacity,
      View,
    } from 'react-native';
  class Login extends Component{
  
    
    static navigationOptions = {
      title: 'Login',
      header : null
     };
     constructor(props) {
   
      super(props);
      this.state = {
        email : '',
        password: ''
    
      }
    
   
    }
    
    LoginMethod(){
        if(this.state.email!=""&& this.state.password!=""){
  
       if(this.state.email == "admin" && this.state.password == "admin"){
          return this.props.navigation.navigate('HomeScreen');
       }else{
         return(
            alert("Incorrect Username and Password")
         );
       }
    
    }else{
        return alert("Enter Username and Password")
    }
      
    }    
    
   render(){
    
      return(
         
        <KeyboardAvoidingView style={styles.keyboardViewContainer}>
          <ImageBackground source={require('../image/baclgroundImage.jpg')} 
          style={styles.view_input}>
          
       
          <Image style = {styles.logo} source= {require('../image/emergency.png')} />
          
  <TextInput style = {styles.input} 
                blurOnSubmit = {false} 
                onSubmitEditing={ () => this.passwordInput.focus() } 
                autoCapitalize="none"
                 
                 autoCorrect={false} 
                 keyboardType='email-address' 
                 returnKeyType="next" 
                 placeholder='Enter Username' 
                // onChangeText = {email => this.setState({email})}
                 onChangeText={email => this.setState({email :email})}
                 placeholderTextColor='rgba(225,225,225,0.7)'/>
  
  
  <TextInput style = {styles.input} 
                 autoCapitalize="none" 
                 secureTextEntry={true}
                 ref ={(input)=>{this.passwordInput = input;}}
                 autoCorrect={false} 
                 
                 returnKeyType="next" 
                 placeholder='Enter Password' 
                // onChangeText = {password => this.setState({password})}
                onChangeText={password => this.setState({password :password})}
                 placeholderTextColor='rgba(225,225,225,0.7)'/>
  
        <View style = {styles.view_button}>
        <TouchableOpacity
           onPress = {this.LoginMethod.bind(this)}
           //style = {styles.buttonStyle}
           //onPress = {() => this.props.navigation.navigate('HomeScreen',  { transition: 'vertical' })}
         >
           <Text style = {styles.buttonTextStyle}>Login</Text>
         </TouchableOpacity>
          </View>
  
        
         
          </ImageBackground>
          </KeyboardAvoidingView>
         
          
      );
   
  }
  }
  const styles = StyleSheet.create({
    
       TextStyle:{
         color : '#fff',
         fontWeight: '700',
         alignSelf : 'center',
         
         
       },
       buttonTextStyle:{
        color : '#fff',
        alignSelf : 'center',
        fontWeight : '700',
        fontSize:16
        
        
      },
       buttonStyle:{
        color: '#fff',
        textAlign: 'center',
        backgroundColor : '#8BC83C',
        alignSelf : 'stretch',
        flex :1
  
    },
        view_input:{
        
        
         width: '100%',
         height: '100%',
         flex: 1,
        // flexDirection: 'column',
         justifyContent: 'center',
        
        alignItems: 'center',
         position : 'absolute',
         resizeMode :'center'
    
       },
       input:{
        height: 40,
        width:280,
        backgroundColor: 'rgba(225,225,225,0.3)',
        marginBottom: 10,
        borderRadius : 10,
        padding: 10,
        color: '#fff'
    },
    logo:{
    width:300,
    height:100
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
    },
    keyboardViewContainer: {
      width: '100%', 
      alignItems: 'center',
      height : '100%'
    },
   
    view_button:{
      alignItems: 'stretch',
      backgroundColor: '#EE2E2E',
      opacity:0.7,
      padding: 10,
      marginTop:10,
      width:150,
      borderRadius:10,
      borderWidth: 1,
      borderColor:'transparent'
    },
    
    view_button1:{
      backgroundColor: 'transparent',
      marginTop:15
    }
    });
  export default Login;
  