import React from 'react';
import {Text as RNText} from 'react-native';
import {useTheme} from '@react-navigation/native';

const JumboText = (props) => {
  const {colors, font} = useTheme();
  return (
    <RNText
      {...props}
      style={{
        ...props.style,
        color: colors.text,
        fontSize: font.jumbo,
        fontWeight: '100',
      }}>
      {props.children}
    </RNText>
  );
};

export default JumboText;
