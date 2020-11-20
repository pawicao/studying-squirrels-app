import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {generalStyles} from '../../styles/styles';
import {extractHalves, roundHalf} from '../../utilities/functions';
import {useTheme} from '@react-navigation/native';

export const Rating = (props) => {
  const {colors} = useTheme();
  let stars = extractHalves(roundHalf(props.rating));
  let halfStar = stars.half ? (
    <Icon name="star-half" size={props.size} color={colors.starColor} />
  ) : null;
  let fullStars = [];
  for (let i = 0; i < stars.full; ++i) {
    fullStars.push(
      <Icon key={i} name="star" size={props.size} color={colors.starColor} />,
    );
  }
  return (
    <View style={[generalStyles.row, {justifyContent: 'flex-end'}]}>
      {fullStars}
      {halfStar}
    </View>
  );
};
