import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const IconButton = (props) => {
  const {colors} = useTheme();

  const buttonBorderStyle = {
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 10,
  }

  const styleProps = props.solid
    ? {
        type: 'solid',
        titleStyle: {color: colors.primaryButtonText},
        buttonStyle: [
          buttonBorderStyle,
          {backgroundColor: colors.primary},
        ],
      }
    : {
        type: 'outline',
        titleStyle: {color: colors.primary},
        buttonStyle: buttonBorderStyle,
      };

  return (
    <Button
      {...props}
      {...styleProps}
      icon={
        <Icon
          name={props.icon}
          size={24}
          color={props.solid ? colors.primaryButtonText : colors.primary}
        />
      }
    />
  );
};

export default IconButton;
