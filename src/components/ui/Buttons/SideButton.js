import React from 'react';
import {Button} from 'react-native-elements';
import * as styles from '../../../styles/styles';
import {useTheme} from '@react-navigation/native';

export const SideButton = (props) => {
  const {colors} = useTheme();

  return (
    <Button
      {...props}
      buttonStyle={[
        styles.generalStyles.buttonPrimary,
        {backgroundColor: colors.veryDimmedBorderColor},
      ]}
      type="solid"
      titleStyle={{color: colors.secondaryButtonText}}
    />
  );
};
