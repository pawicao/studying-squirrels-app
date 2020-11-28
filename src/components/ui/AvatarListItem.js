import React from 'react';
import {ListItem} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export const AvatarListItem = (props) => {
  const {colors} = useTheme();
  let containerStyle, avatarBackground;
  if (props.white) {
    avatarBackground = colors.card;
    containerStyle = null;
  } else {
    containerStyle = {
      backgroundColor: colors.background,
      borderColor: colors.dimmedBorderColor,
    };
    avatarBackground = colors.dimmedBorderColor;
  }
  let avatar = {
    title: props.title[0],
    titleStyle: {
      color: colors.text,
    },
    overlayContainerStyle: {
      backgroundColor: avatarBackground,
    },
    placeholderStyle: {
      backgroundColor: avatarBackground,
    },
    size: props.avatarSize ? props.avatarSize : 'small',
  };
  if (props.avatarSource) {
    avatar.source = {uri: props.avatarSource};
  }
  let titleStyle = {color: colors.text};
  let subtitleStyle = {color: colors.dimmedText};
  let chevronStyle = {color: colors.dimmedBorderColor};
  if (props.highlighted) {
    containerStyle = {
      ...containerStyle,
      borderColor: colors.primary,
      borderWidth: 1,
      backgroundColor: colors.dimmedPrimary,
    };
    titleStyle = {color: colors.primary};
    subtitleStyle = {color: colors.text};
    chevronStyle = {color: colors.primary};
  }

  return (
    <ListItem
      {...props}
      topDivider
      onPress={props.onPress}
      containerStyle={containerStyle}
      leftAvatar={props.avatarOnLeft ? avatar : null}
      rightAvatar={!props.avatarOnLeft ? avatar : null}
      titleStyle={titleStyle}
      subtitleStyle={subtitleStyle}
      chevron={props.chevron ? chevronStyle : false}
    />
  );
};
