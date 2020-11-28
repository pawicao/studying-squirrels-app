import React from 'react';
import {Text as RNText} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Text = (props) => {
  const {colors, font} = useTheme();
  return (
    <RNText
      {...props}
      style={{
        color: props.primary
          ? colors.primary
          : props.dimmed
          ? colors.dimmedText
          : colors.text,
        ...props.style,
        fontSize: props.tiny ? font.tiny : props.header ? font.header : null,
      }}>
      {props.children}
    </RNText>
  );
};

export default Text;
