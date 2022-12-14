import React from 'react';
import {View} from 'react-native';
import Text from './Texts/Text';
import {Input} from './Input';
import HorizontalWrapper from './Buttons/HorizontalWrapper';
import {SideButton} from './Buttons/SideButton';
import {PrimaryButton} from './Buttons/PrimaryButton';
import {Overlay} from 'react-native-elements';
import Spinner from './Spinner';
import {useTheme} from '@react-navigation/native';
// TODO: componentDidUpdate - refresh data fetch if props exist?
const MAX_LENGTH = 200;

const ConfirmationOverlay = (props) => {
  const {colors} = useTheme();
  return (
    <Overlay
      overlayStyle={{backgroundColor: colors.background}}
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}>
      <View style={{alignItems: 'center', maxHeight: '60%', paddingBottom: 5}}>
        <Text dimmed tiny>
          {props.children}
        </Text>
        <Input
          multiline
          maxLength={MAX_LENGTH}
          value={props.inputValue}
          onChangeText={props.onChangeText}
        />
        <Text style={{marginVertical: 5}} dimmed tiny>
          {props.inputValue.length} / {MAX_LENGTH}
        </Text>
        <HorizontalWrapper>
          <SideButton
            onPress={props.onBackdropPress}
            title="Back"
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
          {props.loading ? (
            <Spinner style={{paddingHorizontal: 20, paddingVertical: 10}} />
          ) : (
            <PrimaryButton
              title="Confirm"
              onPress={props.onConfirm}
              containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
            />
          )}
        </HorizontalWrapper>
      </View>
    </Overlay>
  );
};

export default ConfirmationOverlay;
