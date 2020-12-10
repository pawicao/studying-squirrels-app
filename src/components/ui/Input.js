import React, {useState} from 'react';
import FloatingLabelInput from 'react-native-floating-label-input/src/index';
import {useTheme} from '@react-navigation/native';

export const EmailInput = (props) => (
  <Input
    {...props}
    keyboardType="email-address"
    autoCompleteType="email"
    autoCapitalize="none"
  />
);

export const PostalCodeInput = (props) => (
  <Input {...props} autoCompleteType="postal-code" keyboardType="numeric" />
);

export const PhoneInput = (props) => (
  <Input {...props} autoCompleteType="tel" keyboardType="phone-pad" />
);

export const NameInput = (props) => (
  <Input {...props} autoCompleteType="name" />
);

export const StreetInput = (props) => (
  <Input {...props} autoCompleteType="street-address" />
);

export const PasswordInput = (props) => (
  <Input
    {...props}
    showPasswordContainerStyles={{
      opacity: 0.3,
      marginBottom: -10,
      marginRight: -5,
    }}
    isPassword={true}
    autoCapitalize="none"
    autoCompleteType="password"
  />
);

export const Input = (props) => {
  const {colors, dark} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  let borderColor = isFocused ? colors.primary : colors.dimmedText;
  return (
    <FloatingLabelInput
      containerStyles={{
        ...props.containerStyle,
        marginHorizontal: 15,
        borderWidth: 0,
        borderBottomWidth: 2,
        marginVertical: 5,
        borderRadius: 0,
        borderColor: borderColor,
      }}
      customLabelStyles={{
        colorFocused: isFocused ? colors.primary : colors.dimmedText,
        colorBlurred: colors.dimmedText,
      }}
      inputStyles={{
        ...props.inputStyles,
        color: colors.text,
        marginBottom: -9,
        marginLeft: -5,
      }}
      darkTheme={!dark}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      {...props}
    />
  );
};
