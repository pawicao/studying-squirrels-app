import React from 'react';
import Text from '../ui/Texts/Text';
import HomeworkListItem from './HomeworkListItem';
import moment from 'moment';
import {View} from "react-native";

const MAX_LENGTH = 70;

const HomeworksList = (props) => {
  const now = moment();
  return (
    <>
      <View style={{flexDirection: 'row'}}>
      <Text header style={{paddingLeft: 15, paddingRight: 10, paddingTop: 10}}>
        {props.title}
      </Text>
        {props.addHomeworkIcon}
      </View>
      {props.homeworks && props.homeworks.length ? (
        props.homeworks.map((homework) => (
          <HomeworkListItem
            key={homework.id}
            onPress={() => props.onPress(homework.id)}
            icon={
              homework.done
                ? {name: 'check', color: 'greenText'}
                : now > moment(homework.deadline)
                ? {name: 'exclamation-thick', color: 'redText'}
                : {name: 'progress-clock', color: 'primary'}
            }
            subtitle={
              homework.textContent
                ? homework.textContent.slice(0, MAX_LENGTH) + '...'
                : 'No task content to display for this homework'
            }
            deadline={homework.deadline}
            handedIn={homework.handedIn}
          />
        ))
      ) : (
        <Text style={{fontStyle: 'italic', paddingHorizontal: 20, paddingTop: 15}}>
          There are no homeworks associated with this lesson
        </Text>
      )}
    </>
  );
};

export default HomeworksList;
