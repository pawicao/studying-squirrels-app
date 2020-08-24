import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {generalStyles} from '../../styles/styles';
import {extractHalves, roundHalf} from '../../utilities/functions';

const STAR_COLOR = '#FFBF00';

export const Rating = (props) => {
  let stars = extractHalves(roundHalf(props.rating));
  let halfStar = stars.half ? <Icon name='star-half' size={props.size} color={STAR_COLOR} /> : null;
  let fullStars = [];
  for(let i = 0; i < stars.full; ++i) {
    fullStars.push(<Icon key={i} name='star' size={props.size} color={STAR_COLOR} />)
  }
  return (
    <View style={[generalStyles.row, {justifyContent: 'flex-end'}]}>
      {fullStars}
      {halfStar}
    </View>
  );
};
