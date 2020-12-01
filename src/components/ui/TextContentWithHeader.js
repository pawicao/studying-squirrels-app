import React from 'react';
import Text from './Texts/Text';

const TextContentWithHeader = (props) => {
  return (
    <>
      <Text header style={{padding: 15}}>
        {props.title}
      </Text>
      <Text
        style={{
          paddingHorizontal: 20,
          textAlign: 'justify',
          fontStyle: props.children ? null : 'italic',
        }}>
        {props.children ? props.children : props.emptyContentMessage}
      </Text>
    </>
  );
};

export default TextContentWithHeader;
