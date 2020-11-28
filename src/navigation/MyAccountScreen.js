import React, {Component} from 'react';
import MyAccountMainScreen from '../screens/common/MyAccount/MyAccountMainScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/common/mutual/ProfileScreen';

const Stack = createStackNavigator();

export default class MyAccountScreen extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyAccountMain" component={MyAccountMainScreen} />
        <Stack.Screen name="MyAccountProfile" component={ProfileScreen} />
      </Stack.Navigator>
    );
  }
}
