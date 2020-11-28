import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/common/mutual/ProfileScreen';
import TutorsScreen from '../screens/student/Tutors/TutorsScreen';
import OfferScreen from '../screens/student/Tutors/OfferScreen';

const Stack = createStackNavigator();

export default class TutorsScreenWrapper extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TutorsMain" component={TutorsScreen} />
        <Stack.Screen name="TutorProfile" component={ProfileScreen} />
        <Stack.Screen name="OfferScreen" component={OfferScreen} />
      </Stack.Navigator>
    );
  }
}
