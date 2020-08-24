import React from 'react';
import {ListItem} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';

export const AvatarListItem = props => {
  const {colors} = useTheme();
  let containerStyle, avatarBackground;
  if(props.white) {
    avatarBackground = colors.card;
    containerStyle = null;
  }
  else {
    containerStyle = {backgroundColor: colors.background, borderColor: colors.dimmedBorderColor};
    avatarBackground = colors.dimmedBorderColor;
  }
  let avatar = {
    title: props.title[0],
    titleStyle: {
      color: colors.text
    },
    overlayContainerStyle: {
      backgroundColor: avatarBackground
    },
    placeholderStyle: {
      backgroundColor: avatarBackground
    },
    size: props.avatarSize ? props.avatarSize : 'small'
  };
  if(props.avatarSource) {
    avatar.source = {uri: props.avatarSource};
  }

  return (
    <ListItem
      {...props}
      topDivider
      containerStyle={containerStyle}
      leftAvatar={props.avatarOnLeft ? avatar : null}
      rightAvatar={!props.avatarOnLeft ? avatar : null}
      titleStyle={{color: colors.text}}
      subtitleStyle={{color: colors.dimmedText}}
      chevron={props.chevron ? {color: colors.dimmedBorderColor} : false}
    />
  );
};
