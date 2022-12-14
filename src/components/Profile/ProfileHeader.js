import React from 'react';
import {API_BASEURL} from '../../env/env';
import {View} from 'react-native';
import {generalStyles} from '../../styles/styles';
import {Accessory, Avatar} from 'react-native-elements';
import {Rating} from '../ui/Rating';
import {useTheme} from '@react-navigation/native';
import Text from '../ui/Texts/Text';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const ProfileHeader = (props) => {
  const {colors, font} = useTheme();
  const uri =
    props.user.photoPath && props.photoChanged
      ? props.user.photoPath
      : API_BASEURL + props.user.photoPath;
  return (
    <View style={[generalStyles.row]}>
      {props.switchView && (
        <Icon
          onPress={props.switchView}
          style={{position: 'absolute', top: 0, right: 0, padding: 15}}
          size={30}
          color={colors.text}
          name="account-switch-outline"
        />
      )}
      <Avatar
        rounded
        size={100}
        containerStyle={{margin: 30}}
        source={props.user.photoPath && {uri: uri}}
        title={props.user.firstName[0] + props.user.lastName[0]}
        onPress={
          props.me
            ? props.changeAvatar
            : props.goToProfile
            ? props.goToProfile
            : null
        }
        overlayContainerStyle={{backgroundColor: colors.dimmedBorderColor}}
        placeholderStyle={{backgroundColor: colors.dimmedBorderColor}}
        titleStyle={{color: colors.text}}>
        {props.me && <Accessory size={25} />}
      </Avatar>
      <View style={[generalStyles.centeredContainer, {flex: 4}]}>
        <Text style={{fontSize: font.header}}>
          {props.user.firstName} {props.user.lastName}
        </Text>
        <Text>{props.studentMode ? 'Student' : 'Tutor'}</Text>
        <Rating
          size={25}
          rating={
            props.studentMode
              ? props.user.studentRating
              : props.user.tutorRating
          }
        />
      </View>
    </View>
  );
};

export default ProfileHeader;
