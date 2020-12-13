import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import {API_BASEURL} from '@env';

const HomeworkIconSet = (props) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress} style={{width: 60}}>
      <Icon name={props.subjectIcon} size={60} color={colors.primary} />
      <Avatar
        rounded
        size={32}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderWidth: 2,
          borderColor: colors.background,
        }}
        source={props.personPhoto && {uri: API_BASEURL + props.personPhoto}}
        title={props.personInitials}
        overlayContainerStyle={{backgroundColor: colors.dimmedBorderColor}}
        placeholderStyle={{backgroundColor: colors.dimmedBorderColor}}
        titleStyle={{color: colors.text}}
      />
    </TouchableOpacity>
  );
};

export default HomeworkIconSet;
