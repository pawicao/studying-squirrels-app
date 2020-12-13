import React from 'react';
import Text from './Texts/Text';
import {View} from 'react-native';
import moment from 'moment';

const LessonHomeworkHeaderInfo = ({subjectName, date}) => {
  const momentDate = moment(date);
  return (
    <View style={{alignItems: 'center'}}>
      <Text header style={{fontWeight: 'bold'}}>
        {subjectName}
      </Text>
      <Text style={{textAlign: 'center'}}>
        {momentDate.format('DD MMM YYYY') + '\n' + momentDate.format('HH:mm')}
      </Text>
    </View>
  );
};

export default LessonHomeworkHeaderInfo;
