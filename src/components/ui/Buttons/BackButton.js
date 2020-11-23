import React from 'react';
import {Button} from 'react-native-elements';
import * as styles from '../../../styles/styles';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const BackButton = (props) => {
  const {colors} = useTheme();

  return (
    <Button
      {...props}
      buttonStyle={[
        styles.generalStyles.buttonPrimary,
      ]}
      icon={<Icon name="chevron-left" size={25} color={colors.dimmedText} style={{marginBottom: -2}} />}
      type="clear"
      titleStyle={{color: colors.dimmedText}}
    />
  );
};
