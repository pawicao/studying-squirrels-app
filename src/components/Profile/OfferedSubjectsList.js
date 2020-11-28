import React from 'react';
import Text from '../ui/Texts/Text';
import OfferListItem from './OfferListItem';

const OfferedSubjectsList = (props) => {
  return (
    <>
      <Text header style={{padding: 15}}>
        Offered subjects
      </Text>
      {props.offeredSubjects.map((offeredSubject) => (
        <OfferListItem
          key={offeredSubject.id}
          offeredSubject={offeredSubject}
          onPress={props.onPress}
        />
      ))}
      {!props.offeredSubjects.length && (
        <Text style={{alignSelf: 'center'}} dimmed>
          This tutor doesn't offer any lessons yet.
        </Text>
      )}
    </>
  );
};

export default OfferedSubjectsList;
