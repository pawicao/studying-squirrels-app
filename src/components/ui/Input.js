import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import FloatingLabelInput from 'react-native-floating-label-input/index';

const Input = (props) => {
  const {colors, dark} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  let labelStyles = {top: '80%'};
  let borderColor;
  if (isFocused) {
    labelStyles = {top: 7, left: 10, fontSize: 10};
    borderColor = colors.primary;
  } else {
    if (props.value !== '') {
      labelStyles = {top: 7, left: 10, fontSize: 10};
    }
    borderColor = colors.dimmedText;
  }

  return (
    <FloatingLabelInput
      {...props}
      isFocused={isFocused}
      showPasswordContainerStyles={{
        opacity: 0.3,
        marginBottom: -15,
        marginRight: -5,
      }}
      containerStyles={{
        ...props.containerStyle,
        marginHorizontal: 15,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: borderColor,
      }}
      customLabelStyles={{
        colorFocused: colors.primary,
        colorBlurred: colors.dimmedText,
      }}
      inputStyles={{color: colors.text, top: '3%', marginLeft: 0}}
      labelStyles={labelStyles}
      darkTheme={!dark}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    />
  );
};

export default Input;
