import React from 'react';
import {Text as RNText} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Text = (props) => {
  const {colors, font} = useTheme();
  return (
    <RNText {...props} style={{
      ...props.style,
      color: props.primary ? colors.primary : colors.text,
      fontSize: props.tiny ? font.tiny : null,
    }}>{props.children}</RNText>
  );
};

export default Text;
