import React from 'react';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {ClickableRating} from '../../ui/ClickableRating';
import Text from '../../ui/Texts/Text';
import {TouchableOpacity, View} from 'react-native';
import IconButton from '../../ui/Buttons/IconButton';

const LessonListItem = (props) => {
  const {colors} = useTheme();
  const onStarPress = (value) =>
    props.onStarPress({
      newRating: value,
      oldRating: props.rating,
      id: props.id,
      ratingDescription: props.ratingDescription ? props.ratingDescription : '',
    });
  return (
    <TouchableOpacity
      onPress={() => props.goToLesson(props.id)}>
      <ListItem
        {...props}
        title={props.subject.name}
        subtitle={
          props.personName +
          '\n' +
          moment(props.date).format('DD MMM YYYY HH:mm')
        }
        topDivider
        containerStyle={{
          backgroundColor: 'transparent',
          borderColor: colors.dimmedBorderColor,
        }}
        titleStyle={{color: colors.text}}
        subtitleStyle={{color: colors.dimmedText}}
        leftIcon={
          <Icon color={colors.primary} size={45} name={props.subject.icon} />
        }
        rightElement={
          props.icon && (
            <Icon
              color={colors[props.icon.color]}
              size={35}
              name={props.icon.name}
            />
          )
        }
      />
      {props.past && !props.canceled ? (
        <ClickableRating
          rating={props.rating}
          style={{alignSelf: 'center', paddingBottom: 10}}
          onStarPress={onStarPress}
        />
      ) : props.studentMode || props.confirmed || props.canceled ? null : (
        <View style={{marginTop: -10}}>
          <Text
            tiny
            style={{fontWeight: 'bold', margin: 5, alignSelf: 'center'}}>
            CONFIRM?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <IconButton
              solid
              key={1}
              icon="check"
              onPress={() => props.onConfirm(props.id)}
            />
            <IconButton
              solid
              key={2}
              icon="close"
              onPress={() => props.onCancel(props.id)}
            />
          </View>
        </View>
      )}
      {props.topCaption && (
        <Text
          tiny
          style={{
            alignSelf: 'center',
            marginBottom: 10,
            fontWeight: 'bold',
            color: colors[props.topCaption.color],
          }}>
          {props.topCaption.text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LessonListItem;
