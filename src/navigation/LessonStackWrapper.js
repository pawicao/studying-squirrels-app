import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LessonsNavigationScreen from './LessonsNavigationScreen';
import LessonScreen from '../screens/common/Lessons/LessonScreen';
import ProfileScreen from '../screens/common/mutual/ProfileScreen';
import OfferScreen from "../screens/student/Tutors/OfferScreen";

const Stack = createStackNavigator();

export default class LessonStackWrapper extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="LessonMain" component={LessonsNavigationScreen} />
        <Stack.Screen name="LessonDetails" component={LessonScreen} />
        <Stack.Screen name="ProfileDetails" component={ProfileScreen} />
        <Stack.Screen name="OfferScreen" component={OfferScreen} />
      </Stack.Navigator>
    );
  }
}
