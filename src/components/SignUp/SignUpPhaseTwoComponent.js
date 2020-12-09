import React from 'react';
import {ScrollView, View} from 'react-native';
import {PrimaryButton} from '../ui/Buttons/PrimaryButton';
import HorizontalWrapper from '../ui/Buttons/HorizontalWrapper';
import Spinner from '../ui/Spinner';
import Text from '../ui/Texts/Text';
import ErrorText from '../ui/Texts/ErrorText';
import {CheckBox} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {BackButton} from '../ui/Buttons/BackButton';
import {
  Input,
  NameInput,
  PasswordInput,
  PhoneInput,
  PostalCodeInput,
  StreetInput,
} from '../ui/Input';

const SignUpPhaseTwoComponent = (props) => {
  const {colors} = useTheme();
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
      <View style={{alignItems: 'center'}}>
        <NameInput
          label="First name"
          value={props.data.firstName}
          onChangeText={(val) => props.updateInputState('firstName', val)}
        />
        <NameInput
          label="Last name"
          value={props.data.lastName}
          onChangeText={(val) => props.updateInputState('lastName', val)}
        />
        <PasswordInput
          label="Password"
          value={props.data.password}
          onChangeText={(val) => props.updateInputState('password', val)}
        />
        <PasswordInput
          label="Re-enter password"
          value={props.data.passwordConfirmation}
          onChangeText={(val) =>
            props.updateInputState('passwordConfirmation', val)
          }
        />
        <PhoneInput
          label="Phone"
          value={props.data.phone}
          onChangeText={(val) => props.updateInputState('phone', val)}
        />
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <PostalCodeInput
            label="Zip code"
            value={props.data.postalCode}
            style={{flex: 1, flexWrap: 'wrap'}}
            maxLength={6}
            onChangeText={(val) => props.updatePostalCode(val)}
          />
          <StreetInput
            label="Street"
            style={{flex: 2, flexWrap: 'wrap'}}
            value={props.data.street}
            onChangeText={(val) => props.updateInputState('street', val)}
          />
        </View>
        <Input
          label="City"
          value={props.data.cityName}
          onChangeText={(val) => props.updateInputState('cityName', val)}
        />
        <Input
          label="Date of birth (DD/MM/YYYY)"
          value={props.data.dateOfBirth}
          keyboardType="numeric"
          alterable
          maxLength={10}
          onChangeText={(val) => props.updateDateOfBirth(val)}
        />
        <Text style={{alignSelf: 'flex-start', paddingHorizontal: 20}}>
          Initial role
        </Text>
        <View style={{flexDirection: 'row'}}>
          <CheckBox
            checked={props.data.student}
            checkedIcon="dot-circle-o"
            checkedColor={colors.primary}
            uncheckedIcon="circle-o"
            title="Student"
            containerStyle={{backgroundColor: 'transparent'}}
            onPress={() => props.updateInputState('student', true)}
          />
          <CheckBox
            checked={!props.data.student}
            checkedColor={colors.primary}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Tutor"
            containerStyle={{backgroundColor: 'transparent'}}
            onPress={() => props.updateInputState('student', false)}
          />
        </View>
        {props.error && <ErrorText>{props.error}</ErrorText>}
        {props.networkError && (
          <ErrorText>An error occured. Check your data and try again</ErrorText>
        )}
      </View>
      <HorizontalWrapper>
        <BackButton
          title="Back"
          onPress={props.goBack}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
        {props.loading ? (
          <Spinner style={{paddingHorizontal: 20, paddingVertical: 10}} />
        ) : (
          <PrimaryButton
            title="Sign up"
            onPress={props.proceed}
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
        )}
      </HorizontalWrapper>
    </ScrollView>
  );
};

export default SignUpPhaseTwoComponent;
