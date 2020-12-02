import React from 'react';
import {ScrollView} from 'react-native';
import CalendarColumn from './CalendarColumn';
import {useTheme} from '@react-navigation/native';

const Calendar = (props) => {
  const {colors} = useTheme();
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-around',
        paddingTop: 5,
      }}
      style={[
        {borderBottomColor: colors.veryDimmedBorderColor, borderBottomWidth: 1},
        props.style,
      ]}>
      {Object.keys(props.timeslots)
        .sort()
        .map(
          (timeslot) =>
            (props.tutorMode || props.timeslots[timeslot].length > 0) && (
              <CalendarColumn
                onPress={props.onPress}
                key={timeslot}
                day={timeslot}
                hours={
                  props.tutorMode
                    ? props.timeslots[timeslot].all
                    : props.timeslots[timeslot]
                }
                tutorMode={props.tutorMode}
                chosen={props.tutorMode && props.timeslots[timeslot].chosen}
              />
            ),
        )}
    </ScrollView>
  );
};

export default Calendar;
