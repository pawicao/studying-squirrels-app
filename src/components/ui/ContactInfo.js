import React from 'react';
import Text from './Texts/Text';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {Linking, TouchableWithoutFeedback, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const ContactInfo = (props) => {
  const {colors} = useTheme();
  return (
    <>
      <Text header style={{padding: 15}}>
        {props.title}
      </Text>
      <TouchableWithoutFeedback

        onPress={() => {
          Linking.openURL(`mailto:${props.email}?subject=Studying Squirrels - contact`)
        }}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon
            name="at"
            size={25}
            color={colors.dimmedText}
            style={{paddingHorizontal: 15}}
          />
          <Text>{props.email}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => Linking.openURL(`tel:${props.phone}`)}
        >
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon
            name="phone"
            size={25}
            color={colors.dimmedText}
            style={{paddingHorizontal: 15}}
          />
          <Text>{props.phone}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ContactInfo;
