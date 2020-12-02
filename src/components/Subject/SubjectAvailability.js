import React from 'react';
import Text from '../ui/Texts/Text';
import Calendar from '../Offer/Calendar/Calendar';
import {View} from 'react-native';

const SubjectAvailability = (props) => {
  return (
    <View style={props.style}>
      <Text style={{paddingHorizontal: 10, paddingTop: 30, paddingBottom: 15}}>
        Availability
      </Text>
      <Calendar
        onPress={props.handleHourClick}
        tutorMode={true}
        timeslots={props.timeslots}
      />
    </View>
  );
};

export default SubjectAvailability;
