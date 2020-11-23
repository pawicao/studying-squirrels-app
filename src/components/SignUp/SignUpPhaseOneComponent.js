import React from 'react';
import {ScrollView, View} from 'react-native';
import Text from '../ui/Texts/Text';
import {generalStyles} from '../../styles/styles';
import JumboText from '../ui/Texts/JumboText';
import Input from '../ui/Input';
import ErrorText from '../ui/Texts/ErrorText';
import Spinner from '../ui/Spinner';
import {PrimaryButton} from '../ui/Buttons/PrimaryButton';
import HorizontalWrapper from '../ui/Buttons/HorizontalWrapper';
import {BackButton} from '../ui/Buttons/BackButton';

// TODO: Overlays as a way of informing after changing mode
const SignUpPhaseOneComponent = (props) => {
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
      <View style={[generalStyles.container]}>
        <JumboText>Hello there!</JumboText>
        <Text style={{paddingBottom: 100}} header>
          Ready for some studying?
        </Text>
        <Input
          label="E-mail address"
          keyboardType="email-address"
          value={props.email}
          onChangeText={(val) => props.updateInputState('email', val)}
        />
        {props.error && <ErrorText>{props.error}</ErrorText>}
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
            title="Proceed"
            onPress={props.proceed}
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
        )}
      </HorizontalWrapper>
    </ScrollView>
  );
};

export default SignUpPhaseOneComponent;
