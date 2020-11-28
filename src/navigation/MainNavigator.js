import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/common/Authentication/LoginScreen';
import ContentScreen from '../screens/common/ContentScreen';
import {useSelector} from 'react-redux';
import {studentTheme, tutorTheme} from '../styles/styles';
import SignUpScreen from '../screens/common/Authentication/SignUpScreen';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const studentMode = useSelector((state) => state.mode.studentMode);
  return (
    <NavigationContainer theme={studentMode ? studentTheme : tutorTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Content" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
