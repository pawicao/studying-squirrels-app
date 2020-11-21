import React from 'react';
import Text from './Text';

const ErrorText = (props) => {
  return (
    <Text {...props} tiny error style={{marginTop: 10}}>
      {props.children}
    </Text>
  );
};

export default ErrorText;
