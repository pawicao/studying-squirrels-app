import React from 'react';
import Squirrel from '../../assets/icons/icon_mini.png';
import {Image, TouchableWithoutFeedback, View} from 'react-native';
import Text from './Texts/Text';
import {useTheme} from '@react-navigation/native';

const NoDataView = (props) => {
  const {colors} = useTheme();
  const content = (
    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Image source={Squirrel} style={{tintColor: colors.dimmedText}} />
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 10,
          marginHorizontal: 30,
        }}
        header>
        {props.title ? props.title : "There's nothing to show here!"}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 10,
          marginHorizontal: 37,
        }}>
        {props.subtitle}
      </Text>
      {props.onReload && <Text tiny>Tap to refresh!</Text>}
    </View>
  );
  return props.onReload ? (
    <TouchableWithoutFeedback onPress={props.onReload}>
      {content}
    </TouchableWithoutFeedback>
  ) : (
    content
  );
};

export default NoDataView;
