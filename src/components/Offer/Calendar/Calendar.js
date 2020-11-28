import React from 'react';
import {ScrollView} from 'react-native';
import CalendarColumn from './CalendarColumn';
import {useTheme} from '@react-navigation/native';

const Calendar = (props) => {
  const {colors} = useTheme();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{flexGrow: 1, justifyContent: 'space-around'}}
      style={[
        {borderBottomColor: colors.veryDimmedBorderColor, borderBottomWidth: 1},
        props.style,
      ]}>
      {Object.keys(props.timeslots)
        .sort()
        .map(
          (timeslot) =>
            props.timeslots[timeslot].length > 0 && (
              <CalendarColumn
                onPress={props.onPress}
                key={timeslot}
                day={timeslot}
                hours={props.timeslots[timeslot]}
              />
            ),
        )}
    </ScrollView>
  );
};

export default Calendar;
