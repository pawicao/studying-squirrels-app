import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../../ui/Texts/Text';
import moment from 'moment';
import {PrimaryButton} from '../../ui/Buttons/PrimaryButton';

const CalendarColumn = (props) => {
  return (
    <View>
      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
        {moment(props.day).format('MMM D')}
      </Text>
      <ScrollView>
        {props.hours.map((hour) => (
          <PrimaryButton
            key={props.day + ' ' + hour}
            buttonStyle={{
              borderRadius: 10,
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 10,
              paddingRight: 10,
              marginVertical: 5,
            }}
            title={hour.slice(0, -3)}
            onPress={() => props.onPress(props.day, hour)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CalendarColumn;
