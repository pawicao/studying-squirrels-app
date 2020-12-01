import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LessonsScreen from '../screens/common/Lessons/LessonsScreen';
import HomeworksScreen from '../screens/common/Lessons/HomeworksScreen';

const Tab = createMaterialTopTabNavigator();

export default class LessonsNavigationScreen extends Component {
  render() {
    return (
      <Tab.Navigator lazy>
        <Tab.Screen name="Lessons" component={LessonsScreen} />
        <Tab.Screen name="Homeworks" component={HomeworksScreen} />
      </Tab.Navigator>
    );
  }
}
