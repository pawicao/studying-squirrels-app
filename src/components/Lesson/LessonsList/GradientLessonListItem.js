import React from 'react';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';
import LessonListItem from './LessonListItem';

const GradientLessonListItem = (props) => {
  const {colors} = useTheme();
  const {gradientColor, wrapperStyle, ...passThroughProps} = props;
  const wrappedComponent = <LessonListItem {...passThroughProps} />;
  return (gradientColor) ? (
    <LinearGradient colors={[colors.background, colors[gradientColor]]}>
      {wrappedComponent}
    </LinearGradient>
  ) : (
    <View style={[{backgroundColor: colors.background}, wrapperStyle]}>
      {wrappedComponent}
    </View>
  );
};

export default GradientLessonListItem;
