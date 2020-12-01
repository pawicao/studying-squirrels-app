import React from 'react';
import {View} from 'react-native';
import Input from '../ui/Input';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Text from "../ui/Texts/Text";
import {useTheme} from "@react-navigation/native";

const SubjectPriceInput = (props) => {
  const {colors} = useTheme();
  return (
    <View style={[{flexDirection: 'row', alignItems: 'flex-end'}, props.style]}>
    <View style={{width: 120}}>
      <Input
        label="Price"
        value={props.price}
        maxLength={6}
        inputStyles={{marginBottom: -10, marginTop: 10}}
        keyboardType="numeric"
        onChangeText={(val) => props.onPriceChange(val)}
      />

    </View><Text style={{marginVertical: 5, marginLeft: -5}}>zł</Text><Icon style={{marginLeft: 20, marginBottom: 3}} onPress={() => props.handleIconClick(false)} name="minus-circle" size={25} color={colors.text} />
      <Icon onPress={() => props.handleIconClick(true)} style={{marginLeft: 8, marginBottom: 3}} name="plus-circle" size={25} color={colors.text} />
    </View>
  );
};

export default SubjectPriceInput;
