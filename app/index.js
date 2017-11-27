import React, { Component } from 'react';
import {View , Text , StyleSheet , Picker , AppState} from 'react-native';
import PushController from './pushController.js'
import PushNotification from 'react-native-push-notification'
const styles = StyleSheet.create({
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
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    picker:{
        width:100,
    },
  });

export default class App extends Component{
    constructor(){
        super();
        this.state={
            seconds:5
        }
        this.handleAppStateChange = this.handleAppStateChange.bind(this)
    }
    componentDidMount(){
        AppState.addEventListener('change',this.handleAppStateChange)
    }
    componentWillUnmount(){
        AppState.removeEventListener('change',this.handleAppStateChange)
    }
    handleAppStateChange(appstate){
        if(appstate == 'background'){
            // yaha condition laga dena ke kab notification aega or us ke callback function mai niche wala code rakh dena 
            PushNotification.localNotification({
                title: "hahaha",
                message: "demo",
                playSound: true,
                soundName: 'default'
              });
        }
    }

    render(){
        return(
                <View style={styles.container}>
                    <Text style={styles.welcome}>Pick your time</Text>
                    <Picker
                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds)=>{this.setState({seconds:seconds})}}
                    >
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='10' value={10} />
                        <Picker.Item label='15' value={15} />
                    </Picker>
                    <PushController />
                </View>
        )
    }
}