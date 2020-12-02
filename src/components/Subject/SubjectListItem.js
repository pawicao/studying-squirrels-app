import React from 'react';
import {useTheme} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from '../ui/Texts/Text';
import {View} from 'react-native';
import Spinner from '../ui/Spinner';

const SubjectListItem = (props) => {
  const {colors} = useTheme();
  return (
    <ListItem
      {...props}
      bottomDivider
      onPress={props.offer ? () => props.onPress(props.offer) : props.onPress}
      leftIcon={
        <Icon
          name={props.icon}
          size={35}
          color={props.white ? colors.text : colors.primary}
        />
      }
      rightElement={
        props.offer && (
          <View style={{flexDirection: 'row'}}>
            <Text>{props.offer.price.toString().replace('.', ',')} zł</Text>
            {props.removalIsLoading ? (
              <Spinner size={15} style={{paddingLeft: 15}} />
            ) : (
              <Icon
                color={colors.redText}
                size={20}
                style={{paddingLeft: 10}}
                name="close"
                onPress={() => props.onDelete(props.offer.id)}
              />
            )}
          </View>
        )
      }
      containerStyle={{
        backgroundColor: colors.background,
        borderColor: colors.dimmedBorderColor,
      }}
      titleStyle={{color: colors.text}}
      chevron={props.chevron ? {color: colors.dimmedBorderColor} : false}
    />
  );
};

export default SubjectListItem;
