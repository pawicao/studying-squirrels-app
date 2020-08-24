import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {generalStyles} from '../../styles/styles';

// import styles from './styles';

class LessonsScreen extends Component {
  render() {
    return (
      <View style={generalStyles.container}>
        <Text>Lessons!</Text>
      </View>
    );
  }
}

export default LessonsScreen;
