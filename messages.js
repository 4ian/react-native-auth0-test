
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Messages extends Component {
  render() {
    return (
      <View>
        <Text>Your messages:</Text>
        {
          this.props.messages.map((message, id) => (
            <Text key={id}>{message.sender + ': '+ message.text}</Text>
          ))
        }
      </View>
    )
  }
}
