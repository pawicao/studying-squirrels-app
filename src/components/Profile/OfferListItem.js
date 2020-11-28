import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from '../ui/Texts/Text';

const OfferListItem = (props) => {
  const {colors} = useTheme();
  return (
    <ListItem
      {...props}
      topDivider
      containerStyle={{
        backgroundColor: colors.background,
        borderColor: colors.dimmedBorderColor,
      }}
      titleStyle={{color: colors.text}}
      title={props.offeredSubject.subject.name}
      onPress={props.onPress && (() => props.onPress(props.offeredSubject))}
      leftIcon={
        <Icon
          color={colors.primary}
          size={25}
          name={props.offeredSubject.subject.icon}
        />
      }
      rightElement={
        <>
          <Text header dimmed>
            {props.offeredSubject.price.toString().replace('.', ',')} zł
          </Text>
          {props.onPress && (
            <Icon size={25} name="chevron-right" color={colors.dimmedText} />
          )}
        </>
      }
    />
  );
};

export default OfferListItem;
