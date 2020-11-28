import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from '../ui/Texts/Text';
import {Rating} from '../ui/Rating';

const MAX_LENGTH = 77;

const RatingListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {colors} = useTheme();
  const ratingDescription =
    expanded || props.ratingDescription.length <= MAX_LENGTH
      ? props.ratingDescription
      : props.ratingDescription.slice(0, MAX_LENGTH) + '...';
  return (
    <>
      <ListItem
        {...props}
        topDivider
        containerStyle={{
          backgroundColor: colors.background,
          borderColor: colors.dimmedBorderColor,
        }}
        titleStyle={{color: colors.text}}
        subtitleStyle={{color: colors.dimmedText}}
        leftIcon={<Icon color={colors.primary} size={35} name={props.icon} />}
        rightElement={<Rating size={18} rating={props.rating} />}
      />
      <Text
        dimmed
        style={{
          paddingHorizontal: 20,
          textAlign: 'justify',
          color: colors.text,
        }}>
        {ratingDescription}
      </Text>
      {props.ratingDescription.length > MAX_LENGTH && (
        <Icon
          style={{alignSelf: 'center'}}
          size={25}
          name={expanded ? 'chevron-up' : 'chevron-down'}
          color={colors.dimmedText}
          onPress={() => setExpanded(!expanded)}
        />
      )}
    </>
  );
};

export default RatingListItem;
