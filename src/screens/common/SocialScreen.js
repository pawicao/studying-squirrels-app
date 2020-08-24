import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MessagesScreen from './Social/MessagesScreen';
import ContactsScreen from './Social/ContactsScreen';

const Tab = createMaterialTopTabNavigator();

export default class SocialScreen extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Messages' component={MessagesScreen} />
        <Tab.Screen name='Contacts' component={ContactsScreen} />
      </Tab.Navigator>
    );
  }
}
