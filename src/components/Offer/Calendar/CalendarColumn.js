import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../../ui/Texts/Text';
import moment from 'moment';
import {PrimaryButton} from '../../ui/Buttons/PrimaryButton';
import {dayOfWeek} from '../../../utilities/time';
import {useTheme} from '@react-navigation/native';

const CalendarColumn = (props) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
        {props.tutorMode
          ? dayOfWeek[props.day]
          : moment(props.day).format('MMM D')}
      </Text>
      <ScrollView>
        {props.hours.map((hour) => {
          let styles = {
            backgroundColor: colors.primary,
            opacity: 1.0,
          };
          if (props.tutorMode && props.chosen.indexOf(hour) < 0) {
            styles = {
              backgroundColor: colors.dimmedPrimary,
              opacity: 0.8,
            };
          }
          return (
            <PrimaryButton
              key={props.day + ' ' + hour}
              buttonStyle={{
                borderRadius: 10,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10,
                marginVertical: 5,
                marginHorizontal: 10,
                ...styles,
              }}
              title={hour.slice(0, -3)}
              onPress={() => props.onPress(props.day, hour)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CalendarColumn;
