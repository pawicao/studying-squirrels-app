import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from '../ui/Texts/Text';
import {useTheme} from '@react-navigation/native';

const OfferHeader = (props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        props.style,
      ]}>
      <Icon
        size={60}
        name={props.subject.icon}
        color={colors.primary}
        style={{paddingHorizontal: 15}}
      />
      <View style={{flexGrow: 1, paddingRight: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text header>{props.subject.name}</Text>
          <Text>{props.price.toString().replace('.', ',')} zł</Text>
        </View>
        <Text dimmed>Choose a date for the lesson</Text>
      </View>
    </View>
  );
};

export default OfferHeader;
