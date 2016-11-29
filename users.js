
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Users extends Component {
  render() {
    const {users} = this.props;
    return (
      <View>
        <Text>All users:</Text>
        {
          Object.keys(users).map(key => {
            const user = users[key];

            return (
              <Text key={key}>{key + ': '+ user.nickname}</Text>
            );
          })
        }
      </View>
    )
  }
}
