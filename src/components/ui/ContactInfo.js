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
      {props.place && (
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon
            name="map-marker"
            size={25}
            color={colors.dimmedText}
            style={{paddingHorizontal: 15}}
          />
          <Text>{`${props.place.street}, ${props.place.postalCode} ${props.place.city.name}`}</Text>
        </View>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(
            `mailto:${props.contactData.email}?subject=Studying Squirrels - contact`,
          );
        }}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon
            name="at"
            size={25}
            color={colors.dimmedText}
            style={{paddingHorizontal: 15}}
          />
          <Text>{props.contactData.email}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL(`tel:${props.contactData.phone}`)}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <Icon
            name="phone"
            size={25}
            color={colors.dimmedText}
            style={{paddingHorizontal: 15}}
          />
          <Text>{props.contactData.phone}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default ContactInfo;
