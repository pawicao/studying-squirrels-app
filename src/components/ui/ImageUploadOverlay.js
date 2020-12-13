import React from 'react';
import {Overlay} from 'react-native-elements';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from './Texts/Text';
import {useTheme} from '@react-navigation/native';

const ImageUploadOverlay = (props) => {
  const {colors} = useTheme();
  return (
    <Overlay
      overlayStyle={{backgroundColor: colors.background}}
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}>
      <View>
        <TouchableOpacity
          onPress={() => {
            props.onBackdropPress();
            props.addImage(true);
          }}
          style={{padding: 30, alignItems: 'center'}}>
          <Icon name="camera" size={64} color={colors.primary} />
          <Text>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.onBackdropPress();
            props.addImage(false);
          }}
          style={{padding: 30, alignItems: 'center'}}>
          <Icon name="file" size={64} color={colors.primary} />
          <Text>Choose from a gallery</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default ImageUploadOverlay;
