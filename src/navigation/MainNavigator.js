import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/common/Authentication/LoginScreen';
import ContentScreen from '../screens/common/ContentScreen';
import {useDispatch, useSelector} from 'react-redux';
import {studentTheme, tutorTheme} from '../styles/styles';
import * as actions from '../store/actions';
import SignUpScreen from '../screens/common/Authentication/SignUpScreen';
import axios from 'axios';
import {getAuthDataOnly, getStudentMode} from '../utilities/storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const studentMode = useSelector((state) => state.mode.studentMode);
  const tokenStored = useSelector((state) => state.auth.token);
  const [preloaded, setPreloaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getAuthDataOnly()
      .then((res) => {
        if (res) {
          validateAndLoadAuthData(res);
        } else {
          setPreloaded(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (!preloaded && tokenStored != null) {
      setPreloaded(true);
    }
  }, [tokenStored]);

  const validateAndLoadAuthData = (authData) => {
    axios
      .get('/validate', {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          getStudentMode(authData.userId)
            .then((res2) => {
              dispatch(actions.setMode(res2));
              dispatch(actions.loadFromStorage(authData));
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setPreloaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setPreloaded(true);
      });
  };
  if (!preloaded) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#efefef',
        }}>
        <ActivityIndicator size={50} color="#e35f2e" />
      </View>
    );
  }
  return (
    <NavigationContainer theme={studentMode ? studentTheme : tutorTheme}>
      <Stack.Navigator
        initialRouteName={tokenStored ? 'Content' : 'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Content" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
