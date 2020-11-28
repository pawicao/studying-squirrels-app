import React from 'react';
import Text from '../ui/Texts/Text';
import RatingListItem from './RatingListItem';
import moment from 'moment';

const RatingsList = (props) => {
  return (
    <>
      <Text header style={{padding: 15}}>
        Ratings ({props.subjectName ? props.subjectName : props.ratings.length})
      </Text>
      {props.ratings.map((rating, index) => (
        <RatingListItem
          key={index}
          icon={rating.subjectIcon}
          ratingDescription={rating.ratingDescription}
          title={rating.subject}
          subtitle={
            rating.issuerName + ', ' + moment(rating.date).format('d MMM y')
          }
          rating={rating.rating}
        />
      ))}
      {!props.ratings.length && (
        <Text style={{alignSelf: 'center'}} dimmed>
          No ratings given yet.
        </Text>
      )}
    </>
  );
};

export default RatingsList;
