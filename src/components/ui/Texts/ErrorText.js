import React from 'react';
import Text from './Text';

const ErrorText = (props) => {
  return (
    <Text {...props} tiny style={{marginTop: 10, color: 'red'}}>
      {props.children}
    </Text>
  );
};

export default ErrorText;
