import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {Avatar} from 'react-native-elements';
import {API_BASEURL} from '@env';
import LessonHomeworkHeaderInfo from '../ui/LessonHomeworkHeaderInfo';

const processPersonData = (mode, lesson) => {
  let personInitials, personPhoto, personId, rating, lessonPersonDetails;
  if (mode) {
    lessonPersonDetails = lesson.givenLesson;
    personInitials =
      lessonPersonDetails.tutor.firstName[0] +
      lessonPersonDetails.tutor.lastName[0];
    personPhoto = lessonPersonDetails.tutor.photoPath;
    personId = lessonPersonDetails.tutor.id;
    rating = {
      value: lessonPersonDetails.tutorRating,
      description: lessonPersonDetails.tutorRatingDescription,
    };
  } else {
    lessonPersonDetails = lesson.takenLesson;
    personInitials =
      lessonPersonDetails.student.firstName[0] +
      lessonPersonDetails.student.lastName[0];
    personPhoto = lessonPersonDetails.student.photoPath;
    personId = lessonPersonDetails.student.id;
    rating = {
      value: lessonPersonDetails.studentRating,
      description: lessonPersonDetails.studentRatingDescription,
    };
  }
  return {
    personInitials,
    personPhoto,
    personId,
    rating,
  };
};

const LessonHeader = (props) => {
  const {colors} = useTheme();
  const {personInitials, personPhoto, personId} = processPersonData(
    props.studentMode,
    props.lesson,
  );
  const photoPath = personPhoto ? API_BASEURL + personPhoto : null;
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.veryDimmedBorderColor,
        borderBottomWidth: 1,
      }}>
      <Icon size={60} name={props.lesson.subject.icon} color={colors.primary} />
      <LessonHomeworkHeaderInfo
        date={props.lesson.date}
        subjectName={props.lesson.subject.name}
      />
      <Avatar
        rounded
        size={80}
        onPress={() => props.goToProfile(personId)}
        source={personPhoto && {uri: photoPath}}
        title={personInitials}
        overlayContainerStyle={{backgroundColor: colors.dimmedBorderColor}}
        placeholderStyle={{backgroundColor: colors.dimmedBorderColor}}
        titleStyle={{color: colors.text}}
      />
    </View>
  );
};

export default LessonHeader;
