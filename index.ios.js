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

import Messages from './messages'
import Users from './users'

import Auth0Lock from 'react-native-lock';
const lock = new Auth0Lock({
  clientId: 'QEPHvV5T4gt47udbPC0Qb9e8GpVT0bx4',
  domain: '4ian.eu.auth0.com',
  closable: true,
});
const serverBaseUrl = 'http://localhost:3000';

export default class TestAuth0 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  login() {
    lock.show({}, (err, profile, auth0Token) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        profile,
        token: auth0Token.idToken,
      }, () => {
        fetch(serverBaseUrl + '/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.state.token,
          },
          body: JSON.stringify({})
        })
        .then((response) => response.json())
        .then(this.fetchMyMessages)
        .then(this.fetchAllUsers);
      });
    });
  }

  fetchMyMessages = () => {
    return fetch(serverBaseUrl + '/user/me/messages', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        messages: responseJson,
      })
    });
  }

  fetchAllUsers = () => {
    return fetch(serverBaseUrl + '/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        users: responseJson,
      })
    });
  }

  refresh = () => {
    return this.fetchMyMessages()
      .then(this.fetchAllUsers);
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
        {
          this.state.messages && (
            <Messages messages={this.state.messages}></Messages>
          )
        }
        {
          this.state.users && (
            <Users users={this.state.users}></Users>
          )
        }
        <TouchableOpacity onPress={() => this.login()}>
          <Text>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.refresh()}>
          <Text>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    flex: 1,
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
