import React from 'react';
import Text from '../ui/Texts/Text';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {ClickableRating} from '../ui/ClickableRating';
import HorizontalWrapper from '../ui/Buttons/HorizontalWrapper';
import {SideButton} from '../ui/Buttons/SideButton';
import {PrimaryButton} from '../ui/Buttons/PrimaryButton';
import {View} from 'react-native';

const LessonActionView = (props) => {
  const {colors} = useTheme();
  if (props.canceled) {
    return (
      <Text
        style={{
          color: colors.redText,
          fontWeight: 'bold',
          marginVertical: 10,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        THIS LESSON HAS BEEN CANCELED
      </Text>
    );
  }
  if (moment() > moment(props.date)) {
    return (
      <ClickableRating
        rating={props.oldRating}
        style={{alignSelf: 'center', paddingVertical: 15}}
        onStarPress={props.onStarPress}
      />
    );
  }
  return (
    <View>
      <Text
        tiny
        style={{
          color: props.confirmed ? colors.greenText : colors.starColor,
          marginBottom: 5,
          marginTop: 15,
          alignSelf: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {props.confirmed
          ? 'THIS LESSON HAS BEEN CONFIRMED BY THE TUTOR'
          : "THIS LESSON IS WAITING FOR THE TUTOR'S CONFIRMATION"}
      </Text>
      <HorizontalWrapper>
        <SideButton
          title="Cancel"
          onPress={props.onCancel}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
        {!props.studentMode && !props.confirmed && (
          <PrimaryButton
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
            title="Confirm"
            onPress={props.onConfirm}
          />
        )}
      </HorizontalWrapper>
    </View>
  );
};

export default LessonActionView;
