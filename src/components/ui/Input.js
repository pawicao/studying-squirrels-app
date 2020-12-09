import React, {useState} from 'react';
import {Input as RNEInput} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const EmailInput = (props) => (
  <Input
    {...props}
    autoCapitalize="none"
    autoCompleteType="email"
    keyboardType="email-address"
  />
);

export const PasswordInput = (props) => {
  const {colors} = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Input
      {...props}
      autoCapitalize="none"
      autoCompleteType="password"
      defaultLabelStyle={{
        fontSize: 10,
        fontWeight: 'normal',
        //top: 22,
        //left: 7,
        color: 'background',
      }}
      secureTextEntry={!passwordVisible}
      rightIcon={
        <Icon
          color={passwordVisible ? colors.text : colors.dimmedText}
          onPress={() => setPasswordVisible(!passwordVisible)}
          size={25}
          name={passwordVisible ? 'eye' : 'eye-off'}
          style={{marginBottom: -15}}
        />
      }
    />
  );
};

export const MultilineInput = (props) => <Input {...props} multiline />;

export const PostalCodeInput = (props) => (
  <Input {...props} autoCompleteType="postal-code" alterable keyboardType="numeric" />
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

export const Input = ({
  label,
  autoCompleteType,
  autoCapitalize,
  keyboardType,
  value,
  alterable = false,
  onChangeText,
  multiline,
  rightIcon,
  maxLength,
  secureTextEntry,
  style,
  marginBottom = -10,
  defaultInputContainerStyle = {
    borderBottomWidth: 2,
    marginHorizontal: 5,
    borderBottomColor: 'dimmedText',
    //marginBottom: -37,*/
  },
  defaultLabelStyle = {
    fontSize: 10,
    fontWeight: 'normal',
    //top: 12,
    //left: 7,
    color: 'background',
  },
}) => {
  const {colors} = useTheme();
  const [inputContainerStyle, setInputContainerStyle] = useState({
    ...defaultInputContainerStyle,
    borderBottomColor: colors[defaultInputContainerStyle.borderBottomColor],
    ...style,
  });
  const [labelStyle, setLabelStyle] = useState({
    ...defaultLabelStyle,
    color: colors[defaultLabelStyle.color],
  });
  const [placeholder, setPlaceholder] = useState(label);

  const onFocus = () => {
    setInputContainerStyle({
      ...inputContainerStyle,
      borderBottomColor: colors.primary,
    });
    setLabelStyle({
      ...labelStyle,
      color: colors.primary,
    });
    setPlaceholder('');
  };

  const onBlur = () => {
    setInputContainerStyle({
      ...inputContainerStyle,
      borderBottomColor: colors.dimmedText,
    });
    setLabelStyle({
      ...labelStyle,
      color: value ? colors.dimmedText : colors.background,
    });
    if (!value) {
      setPlaceholder(label);
    }
  };
  const additionalProps = alterable ? {value: value} : {};
  return (
    <RNEInput
      {...additionalProps}
      rightIcon={rightIcon}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      label={label}
      maxLength={maxLength}
      onBlur={onBlur}
      onFocus={onFocus}
      autoCompleteType={autoCompleteType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      labelStyle={labelStyle}
      inputStyle={{
        color: colors.text,
        textAlignVertical: 'bottom',
      }}
      placeholderTextColor={colors.dimmedText}
      placeholder={placeholder}
      inputContainerStyle={inputContainerStyle}
    />
  );
};
