import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MySubjectsScreen from '../screens/tutor/Subjects/MySubjectsScreen';
import SubjectScreen from '../screens/tutor/Subjects/SubjectScreen';

const Stack = createStackNavigator();

export default class SubjectScreenWrapper extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SubjectsMain" component={MySubjectsScreen} />
        <Stack.Screen name="SubjectsDetails" component={SubjectScreen} />
      </Stack.Navigator>
    );
  }
}
