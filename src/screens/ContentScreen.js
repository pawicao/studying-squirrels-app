import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LessonsScreen from './common/LessonsScreen';
import TutorsScreen from './student/TutorsScreen';
import MyAccountScreen from './common/MyAccountScreen';
import SocialScreen from './common/SocialScreen';
import CalendarScreen from './common/CalendarScreen';
import {BottomTabNavigator, routes} from '../components/ui/BottomTabNavigator';
import * as actions from '../store/actions';
import {connect} from 'react-redux';

import { LogBox } from 'react-native';
import MySubjectsScreen from './tutor/MySubjectsScreen';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Tab = createBottomTabNavigator();

class ContentScreen extends Component {

  render() {
    return (
      <BottomTabNavigator>
        <Tab.Screen name={routes.lessons} component={LessonsScreen} />
        {this.props.studentMode ? <Tab.Screen name={routes.tutors} component={TutorsScreen}/> : <Tab.Screen name={routes.subjects} component={MySubjectsScreen}/>}
        <Tab.Screen name={routes.social} component={SocialScreen/*options={{ tabBarBadge: 9 }}*/} />
        <Tab.Screen name={routes.calendar} component={CalendarScreen}/>
        <Tab.Screen name={routes.myAccount} component={MyAccountScreen} initialParams={{changeMode: this.props.changeMode}} />
      </BottomTabNavigator>
    )

    let navigatorContent;
    if (this.props.studentMode) {
      navigatorContent = (
        <BottomTabNavigator>
          <Tab.Screen name={routes.lessons} component={LessonsScreen} />
          <Tab.Screen name={routes.tutors} component={TutorsScreen}/>
          <Tab.Screen name={routes.social} component={SocialScreen/*options={{ tabBarBadge: 9 }}*/} />
          <Tab.Screen name={routes.calendar} component={CalendarScreen}/>
          <Tab.Screen name={routes.myAccount} component={MyAccountScreen} initialParams={{changeMode: this.props.changeMode}} />
        </BottomTabNavigator>
      );
    } else {
      navigatorContent = (
        <BottomTabNavigator >
          <Tab.Screen name={routes.lessons} component={LessonsScreen}/>
          <Tab.Screen name={routes.social} component={SocialScreen} />
          <Tab.Screen name={routes.calendar} component={CalendarScreen}/>
          <Tab.Screen name={routes.myAccount} component={MyAccountScreen} initialParams={{changeMode: this.props.changeMode}} />
        </BottomTabNavigator>
      );
    }
    return navigatorContent;
  }
}

const mapStateToProps = state => ({
  studentMode: state.mode.studentMode
});

const mapDispatchToProps = dispatch => ({
  changeMode: () => dispatch(actions.changeMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentScreen);

