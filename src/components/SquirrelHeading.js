import React from 'react';
import {Image, View} from 'react-native';
import icon from '../assets/icons/icon_mini.png';
import Text from './ui/Texts/Text';

const SquirrelHeading = (props) => {
  return (
    <View
      style={[
        props.style,
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        },
      ]}>
      <Image
        source={icon}
        style={{
          resizeMode: 'contain',
          height: 35,
        }}
      />
      <Text header style={{marginTop: 5, marginLeft: 5}}>{props.text}</Text>
    </View>
  );
};

export default SquirrelHeading;
