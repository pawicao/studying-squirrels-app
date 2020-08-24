import React from 'react';
import {ListItem} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const IconListItem = props => {
  const {colors} = useTheme();

  return (
    <ListItem
      {...props}
      bottomDivider
      leftIcon={<Icon name={props.icon.name} size={props.icon.size} color={colors.primary}/>}
      containerStyle={{backgroundColor: colors.background, borderColor: colors.dimmedBorderColor}}
      titleStyle={{color: colors.text}}
      chevron={props.chevron ? {color: colors.dimmedBorderColor} : false}
    />
  );
};
