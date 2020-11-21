import React, {Component} from 'react';
import {generalStyles} from '../styles/styles';
import {View} from 'react-native';
import axios from 'axios';
import {AUTH_BASEURL} from '@env';
import SquirrelHeading from '../components/SquirrelHeading';
import Input from '../components/ui/Input';
import HorizontalWrapper from '../components/ui/Buttons/HorizontalWrapper';
import {SideButton} from '../components/ui/Buttons/SideButton';
import {PrimaryButton} from '../components/ui/Buttons/PrimaryButton';
import JumboText from '../components/ui/Texts/JumboText';
import Text from '../components/ui/Texts/Text';
import Spinner from '../components/ui/Spinner';
import {isEmailValid} from '../utilities/validation';
import ErrorText from '../components/ui/Texts/ErrorText';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phaseOne: true,
      email: '',
      student: true,
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      loading: false,
      errorMessage: null,
    };
  }

  updateInputState = (key, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  register = () => {
    // Check password
  };

  proceedToPhaseTwo = () => {
    if (isEmailValid(this.state.email)) {
      this.setState({loading: true});
      axios
        .get(`${AUTH_BASEURL}/mailcheck/${this.state.email}`)
        .then((res) => {
          if (res.data) {
            this.setState({
              errorMessage:
                'An account with this e-mail address already exists',
              loading: false,
            });
          } else {
            this.setState({loading: false, phaseOne: false});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({errorMessage: 'Please enter a correct e-mail address'});
    }
  };

  render() {
    let content, buttons;
    if (this.state.phaseOne) {
      content = (
        <View style={[generalStyles.container]}>
          <JumboText style={{marginTop: -20}}>Hello there!</JumboText>
          <Text style={{paddingBottom: 100}} header>
            Ready for some studying?
          </Text>
          <Input
            label="E-mail address" //TODO: Dodac ze to email
            value={this.state.email}
            onChangeText={(val) => this.updateInputState('email', val)}
          />
          {this.state.errorMessage && (
            <ErrorText>{this.state.errorMessage}</ErrorText>
          )}
        </View>
      );
      buttons = (
        <HorizontalWrapper>
          <SideButton
            title="Reset"
            onPress={() => this.props.navigation.goBack()}
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
          {this.state.loading ? (
            <Spinner style={{paddingHorizontal: 20, paddingVertical: 10}} />
          ) : (
            <PrimaryButton
              title="Confirm"
              onPress={this.proceedToPhaseTwo}
              containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
            />
          )}
        </HorizontalWrapper>
      );
    } else {
      content = (
        <View style={[generalStyles.container]}>
          <Input
            label="E-mail address PHASE TWOO BLABLABLA" //TODO: Dodac ze to email
            value={this.state.email}
            onChangeText={(val) => this.updateInputState('email', val)}
          />
        </View>
      );
      buttons = (
        <HorizontalWrapper>
          <SideButton
            title="Reset"
            onPress={() => this.props.navigation.goBack()}
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
          <PrimaryButton
            title="Confirm"
            onPress={() =>
              this.setState((prevState) => {
                return {
                  ...prevState,
                  phaseOne: false,
                };
              })
            }
            containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
          />
        </HorizontalWrapper>
      );
    }
    return (
      <>
        <SquirrelHeading
          text="Sign up"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            paddingTop: 5,
            paddingLeft: 0,
          }}
        />
        {content}
        {buttons}
      </>
    );
  }
}

export default SignUpScreen;
