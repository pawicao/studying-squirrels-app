import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Input from '../ui/Input';
import Text from '../ui/Texts/Text';

const SubjectHeader = (props) => {
  const {colors} = useTheme();
  return (
    <>
      {!props.editMode && (
        <Text style={{paddingHorizontal: 10, paddingTop: 10}} header>
          Pick a subject
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
          props.style,
        ]}>
        <Icon
          size={60}
          name={props.icon}
          color={colors.primary}
          style={{paddingHorizontal: 15, paddingTop: 10}}
        />
        <View style={{flexGrow: 1, paddingRight: 15}}>
          {!props.editMode && (
            <Icon
              name="menu-down"
              size={25}
              color="white"
              style={{position: 'absolute', right: 25, top: 12}}
            />
          )}
          <Picker
            selectedValue={props.pickerValue}
            enabled={!props.editMode}
            style={{
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
              color: 'white',
              dropdownIconColor: '#FFFFFF',
              marginBottom: -10,
              backgroundColor: 'transparent',
            }}
            onValueChange={(val) => props.onPickerValueChange(val)}>
            <Picker.Item label="<New subject>" value={0} />
            {props.pickerItems}
          </Picker>
          {!props.editMode && (
            <Input
              label={
                props.pickerValue === -1
                  ? 'New subject'
                  : 'or create a new one...'
              }
              inputStyles={{marginBottom: -5, marginTop: 5}}
              key={props.inputKey}
              value={props.inputValue}
              onChangeText={(val) => props.onInputValueChange(val)}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default SubjectHeader;
