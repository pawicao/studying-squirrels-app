import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import HomeworkIconSet from './HomeworkIconSet';
import LessonHomeworkHeaderInfo from '../ui/LessonHomeworkHeaderInfo';
import Text from '../ui/Texts/Text';
import moment from 'moment';
import {pickIcon} from '../../utilities/functions';

const HomeworkHeader = ({
  deadline,
  lessonDate,
  handedInDate,
  hideBottom,
  done,
  subject,
  person,
  onIconPress,
}) => {
  const {colors} = useTheme();
  const personInitials = person.firstName[0] + person.lastName[0];
  const momentHandedInDate = handedInDate ? moment(handedInDate) : null;
  const momentDeadline = moment(deadline);
  const iconData = pickIcon(done, moment(), deadline);
  return (
    <View
      style={{
        borderBottomColor: colors.veryDimmedBorderColor,
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Icon
          size={60}
          name={iconData.name}
          color={colors[iconData.color]}
          style={{width: 60}}
        />
        <LessonHomeworkHeaderInfo
          date={lessonDate}
          subjectName={subject.name}
        />
        <HomeworkIconSet
          onPress={onIconPress}
          subjectIcon={subject.icon}
          personPhoto={person.photoPath}
          personInitials={personInitials}
        />
      </View>
      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>HOMEWORK</Text>
      {hideBottom ? null : (
        <>
          <Text style={{alignSelf: 'center'}}>
            <Icon name="clock-alert-outline" />{' '}
            {momentDeadline.format('DD MMM YYYY HH:mm')}
          </Text>
          {momentHandedInDate && (
            <Text style={{alignSelf: 'center'}}>
              <Icon name="clock-check" />{' '}
              {momentHandedInDate.format('DD MMM YYYY HH:mm')}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default HomeworkHeader;
