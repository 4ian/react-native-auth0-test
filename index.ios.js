/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: 'QEPHvV5T4gt47udbPC0Qb9e8GpVT0bx4', domain: '4ian.eu.auth0.com'});

export default class TestAuth0 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  login() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(token);
      // Authentication worked!
      this.setState({
        profile,
        token,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.profile && (
            <View>
              <Text style={styles.welcome}>Welcome {this.state.profile.name}</Text>
              <Text>Your email is: {this.state.profile.email}</Text>
            </View>
          )
        }
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableOpacity onPress={() => this.login()}>
          <Text>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
});

AppRegistry.registerComponent('TestAuth0', () => TestAuth0);
