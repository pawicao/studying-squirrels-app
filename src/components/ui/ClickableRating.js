import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {generalStyles} from '../../styles/styles';
import {useTheme} from '@react-navigation/native';

export const ClickableRating = (props) => {
  const {colors} = useTheme();
  let stars = [];
  for (let i = 0; i < 5; ++i) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => props.onStarPress(i + 1)}>
        <Icon
          key={i}
          name="star"
          size={36}
          color={props.rating >= i + 1 ? colors.starColor : colors.dimmedText}
        />
      </TouchableOpacity>,
    );
  }
  return (
    <View
      style={[
        generalStyles.row,
        {alignItems: 'flex-start', justifyContent: 'flex-start'},
        props.style,
      ]}>
      {stars}
    </View>
  );
};
