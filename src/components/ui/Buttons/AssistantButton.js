import React from 'react';
import * as styles from '../../../styles/styles';
import { Image, TouchableOpacity, View } from "react-native";
import icon from '../../../assets/icons/icon_mini_white.png';
import Text from '../Texts/Text';

export const AssistantButton = (props) => {
  return (
    <View style={styles.generalStyles.buttonAssistantWrapper}>
      <TouchableOpacity
        style={styles.generalStyles.buttonAssistant}
        onPress={props.onPress}
        activeOpacity={0.5}>
        <Image
          source={icon}
          style={{
            resizeMode: 'contain',
            height: 38,
          }}
        />
      </TouchableOpacity>
      <Text
        style={styles.generalStyles.buttonAssistantText}
        tiny
      >
        Need help?
      </Text>
    </View>
  );
};
