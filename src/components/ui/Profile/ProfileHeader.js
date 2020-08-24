import React from 'react';

import {View} from 'react-native';
import {generalStyles} from '../../../styles/styles';
import {Accessory, Avatar} from 'react-native-elements';
import {Rating} from '../Rating';
import {useTheme} from '@react-navigation/native';
import Text from '../Text';

const ProfileHeader = (props) => {
  const {colors, font} = useTheme();
  let avatarBackground, containerStyle;
  return (
    <View style={[generalStyles.row]}>
      <Avatar
        rounded
        size={100}
        containerStyle={{margin: 30}}
        source={props.user.avatar && {uri: props.user.avatar}}
        title={props.user.firstName[0] + props.user.lastName[0]}
        onPress={() => console.log('Change the avatar')}
        overlayContainerStyle={{backgroundColor: colors.dimmedBorderColor}}
        placeholderStyle={{ backgroundColor: colors.dimmedBorderColor}}
        titleStyle={{ color: colors.text}}
      >
        <Accessory size={25}/>
      </Avatar>
      <View style={[generalStyles.centeredContainer, {flex: 4}]}>
        <Text style={{fontSize: font.header}}>{props.user.firstName} {props.user.lastName}</Text>
        <Text>{props.studentMode ? 'Student' : 'Tutor'}</Text>
        <Rating size={25} rating={props.studentMode ? props.user.studentRating : props.user.tutorRating} />
      </View>
    </View>
  )
}

export default ProfileHeader;
