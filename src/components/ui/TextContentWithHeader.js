import React from 'react';
import Text from './Texts/Text';

const TextContentWithHeader = (props) => {
  return (
    <>
      <Text header style={{paddingHorizontal: 15, paddingBottom: props.withInput ? 0 : 15, paddingTop: 15}}>
        {props.title}
      </Text>
      {props.withInput ? (
        props.children
      ) : (
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: 'justify',
            fontStyle: props.children ? null : 'italic',
          }}>
          {props.children ? props.children : props.emptyContentMessage}
        </Text>
      )}
    </>
  );
};

export default TextContentWithHeader;
