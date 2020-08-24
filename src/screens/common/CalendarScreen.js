import React, { Component } from 'react';

import {Text, View} from 'react-native';
import {generalStyles} from '../../styles/styles';

// import styles from './styles';

export default class CalendarScreen extends Component {
  render() {
    return (
      <View style={generalStyles.container}>
        <Text>Calendar!</Text>
        <Text>OPTIONAL: May be implemented in the future...</Text>
      </View>
    );
  }
}
