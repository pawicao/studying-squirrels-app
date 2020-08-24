import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';

export const routes = {
  lessons: 'Lessons',
  tutors: 'Tutors',
  social: 'Social',
  calendar: 'Calendar',
  myAccount: 'My account',
  subjects: 'My subjects'
};

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = (props) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={routes.lessons}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          switch (route.name) {
            case routes.lessons: {
              iconName = focused ? 'book-open-page-variant' : 'book-open-variant';
              break;
            }
            case routes.tutors: {
              iconName = focused ? 'map-marker-radius' : 'map-marker-radius-outline';
              break;
            }
            case routes.calendar: {
              iconName = focused ? 'calendar-month' : 'calendar-month-outline';
              break;
            }
            case routes.myAccount: {
              iconName = focused ? 'cog' : 'cog-outline';
              break;
            }
            case routes.subjects: {
              iconName = focused ? 'glasses' : 'glasses';
              break;
            }
            case routes.social: {
              iconName = focused ? 'account-group' : 'account-group-outline';
              break;
            }
          }
          return <Icon name={iconName} size={30} color={color}/>;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        style: {
          borderTopColor: colors.dimmedBorderColor,
          height: 55
        }
      }}
    >
      {props.children}
    </Tab.Navigator>
  );
};
