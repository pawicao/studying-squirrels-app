import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyAccountScreen from '../../navigation/MyAccountScreen';
import SocialScreen from '../../navigation/SocialScreen';
import {
  BottomTabNavigator,
  routes,
} from '../../components/ui/BottomTabNavigator';
import {connect} from 'react-redux';
import {LogBox} from 'react-native';
import TutorsScreenWrapper from '../../navigation/TutorsScreenWrapper';
import LessonStackWrapper from '../../navigation/LessonStackWrapper';
import SubjectScreenWrapper from '../../navigation/SubjectScreenWrapper';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();

class ContentScreen extends Component {
  render() {
    return (
      <BottomTabNavigator>
        <Tab.Screen
          name={routes.lessons}
          options={{unmountOnBlur: true}}
          component={LessonStackWrapper}
        />
        {this.props.studentMode ? (
          <Tab.Screen
            name={routes.tutors}
            options={{unmountOnBlur: true}}
            component={TutorsScreenWrapper}
          />
        ) : (
          <Tab.Screen
            name={routes.subjects}
            options={{unmountOnBlur: true}}
            component={SubjectScreenWrapper}
          />
        )}
        <Tab.Screen
          name={routes.social}
          options={{unmountOnBlur: true}}
          component={SocialScreen /*options={{ tabBarBadge: 9 }}*/}
        />
        {/*        <Tab.Screen name={routes.calendar} component={CalendarScreen} />*/}
        <Tab.Screen
          options={{unmountOnBlur: true}}
          name={routes.myAccount}
          component={MyAccountScreen}
        />
      </BottomTabNavigator>
    );
  }
}

const mapStateToProps = (state) => ({
  studentMode: state.mode.studentMode,
});

export default connect(mapStateToProps, null)(ContentScreen);
