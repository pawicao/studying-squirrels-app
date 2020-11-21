import React from 'react';
import {View} from 'react-native';

const HorizontalWrapper = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      {props.children}
    </View>
  );
};

export default HorizontalWrapper;
