import React from 'react';
import Text from '../../ui/Texts/Text';
import GradientLessonListItem from './GradientLessonListItem';
import moment from 'moment';

const handleHomeworks = (homeworks) => {
  let icon = null;
  let topCaption = null;
  let gradientColor = null;
  if (homeworks && homeworks.length) {
    let mark = {
      done: true,
      pastDeadline: false,
    };
    const currentDate = moment();
    for (const homework of homeworks) {
      if (!homework.done) {
        mark.done = false;
      }
      if (moment(homework.deadline) < currentDate) {
        mark.pastDeadline = true;
      }
      if (!mark.done && mark.pastDeadline) {
        break;
      }
    }
    if (mark.done) {
      icon = {
        name: 'check',
        color: 'greenText',
      };
      gradientColor = 'dimmedGreen';
    } else if (mark.pastDeadline) {
      topCaption = {
        text: 'HOMEWORK PAST DEADLINE',
        color: 'starColor',
      };
      icon = {
        name: 'exclamation-thick',
        color: 'redText',
      };
    } else {
      topCaption = {
        text: 'HOMEWORK',
        color: 'starColor',
      };
      icon = {
        name: 'exclamation-thick',
        color: 'starColor',
      };
    }
  }
  return {
    icon,
    topCaption,
    gradientColor,
  };
};

const LessonsSection = (props) => {
  const renderLesson = (lesson) => {
    let {icon, topCaption, gradientColor} = handleHomeworks(lesson.homeworks);

    if (lesson.canceled) {
      topCaption = {
        text: 'LESSON CANCELED',
        color: 'redText',
      };
      gradientColor = 'dimmedRed';
    } else if (!lesson.confirmed) {
      topCaption = {
        text: 'AWAITS CONFIRMATION',
        color: 'yellowText',
      };
      gradientColor = 'dimmedYellow';
    }
    let ratingDescription, rating, personName;
    if (props.studentMode) {
      ratingDescription = lesson.givenLesson.tutorRatingDescription;
      rating = lesson.givenLesson.tutorRating;
      personName = `${lesson.givenLesson.tutor.firstName} ${lesson.givenLesson.tutor.lastName}`;
    }
    else {
      ratingDescription = lesson.takenLesson.studentRatingDescription;
      rating = lesson.takenLesson.studentRating;
      personName = `${lesson.takenLesson.student.firstName} ${lesson.takenLesson.student.lastName}`;
    }
    return (
      <GradientLessonListItem
        key={lesson.id}
        id={lesson.id}
        gradientColor={gradientColor}
        subject={lesson.subject}
        topCaption={topCaption}
        icon={icon}
        confirmed={lesson.confirmed}
        onStarPress={props.onStarPress}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
        canceled={lesson.canceled}
        past={props.past}
        studentMode={props.studentMode}
        ratingDescription={ratingDescription}
        personName={personName}
        rating={rating}
        date={lesson.date}
        goToLesson={props.goToLesson}
      />
    );
  };

  return (
    <>
      <Text header style={{margin: 10}}>
        {props.title}
      </Text>
      {props.lessons && props.lessons.length ? (
        props.lessons.map((lesson) => renderLesson(lesson))
      ) : (
        <Text tiny style={{alignSelf: 'center', marginBottom: 10}} dimmed>
          Nothing to show here
        </Text>
      )}
    </>
  );
};

export default LessonsSection;
