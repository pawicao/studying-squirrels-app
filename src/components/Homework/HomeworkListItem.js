import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from '../ui/Texts/Text';
import {View} from 'react-native';
import moment from 'moment';

const HomeworkListItem = (props) => {
  const {colors} = useTheme();
  return (
    <ListItem
      {...props}
      bottomDivider
      containerStyle={{
        backgroundColor: colors.background,
        borderColor: colors.dimmedBorderColor,
      }}
      titleStyle={{color: colors.text}}
      subtitleStyle={{color: colors.dimmedText}}
      leftIcon={
        props.icon && (
          <Icon
            color={colors[props.icon.color]}
            size={25}
            name={props.icon.name}
          />
        )
      }
      rightElement={
        <View>
          <Text tiny>
            <Icon name="clock-alert-outline" />{' '}
            {moment(props.deadline).format('DD MMM YY HH:mm')}
          </Text>
          {props.handedIn && (
            <Text tiny>
              <Icon name="clock-check" />{' '}
              {moment(props.handedIn).format('DD MMM YY HH:mm')}
            </Text>
          )}
        </View>
      }
    />
  );
};

export default HomeworkListItem;
