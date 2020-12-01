import React, {Component} from 'react';
import axios from 'axios';
import {AUTH_BASEURL} from '@env';
import SquirrelHeading from '../../../components/ui/SquirrelHeading';
import {isChildEmpty, isEmailValid} from '../../../utilities/validation';
import SignUpPhaseOneComponent from '../../../components/SignUp/SignUpPhaseOneComponent';
import SignUpPhaseTwoComponent from '../../../components/SignUp/SignUpPhaseTwoComponent';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {insert} from '../../../utilities/functions';
import SignUpPhaseThreeComponent from '../../../components/SignUp/SignUpPhaseThreeComponent';
import ImagePicker from 'react-native-image-picker';
import {View} from 'react-native';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: '',
        student: true,
        password: '',
        firstName: '',
        lastName: '',
        cityName: '',
        phone: '',
        passwordConfirmation: '',
        dateOfBirth: '',
        street: '',
        postalCode: '',
      },
      phaseOne: true,
      phaseThree: false,
      loading: false,
      errorMessage: null,
      photo: null,
    };
  }

  updateDateOfBirth = (val) => {
    const oldStateDate = this.state.data.dateOfBirth;
    let valueToAdd = val;
    if (
      (val.length === 3 && oldStateDate.length === 2) ||
      (val.length === 6 && oldStateDate.length === 5)
    ) {
      valueToAdd = insert(valueToAdd, oldStateDate.length, '/');
    }
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          dateOfBirth: valueToAdd,
        },
      };
    });
  };

  updatePostalCode = (val) => {
    const oldStatePostalCode = this.state.data.postalCode;
    let valueToAdd = val;
    if (val.length === 3 && oldStatePostalCode.length === 2) {
      valueToAdd = insert(valueToAdd, oldStatePostalCode.length, '-');
    }
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          postalCode: valueToAdd,
        },
      };
    });
  };

  updateInputState = (key, value) => {
    this.setState((prevState) => {
      return {
        data: {
          ...prevState.data,
          [key]: value,
        },
      };
    });
  };

  register = (photo) => {
    this.setState({phaseThree: false, photo}, () => {
      let registrationData = {
        ...this.state.data,
        email: this.state.data.email.toLowerCase(),
      };
      delete registrationData.passwordConfirmation;
      this.props.onRegister(registrationData, photo);
    });
  };

  addAvatar = (cameraMode) => {
    const options = {
      noData: true,
    };
    if (cameraMode) {
      ImagePicker.launchCamera(options, (response) => {
        if (response.uri) {
          this.setState({photo: response});
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.uri) {
          this.setState({photo: response});
        }
      });
    }
  };

  proceedToPhaseThree = () => {
    if (this.state.data.password === this.state.data.passwordConfirmation) {
      if (!isChildEmpty(this.state.data)) {
        this.setState({phaseThree: true});
      } else {
        this.setState({errorMessage: 'Fill out the missing data'});
      }
    } else {
      this.setState({errorMessage: "Passwords don't match"});
    }
  };

  goBack = () => {
    this.state.phaseOne
      ? this.props.navigation.goBack()
      : this.setState({phaseOne: true, errorMessage: null});
  };

  proceedToPhaseTwo = () => {
    if (isEmailValid(this.state.data.email)) {
      this.setState({loading: true});
      axios
        .get(`${AUTH_BASEURL}/mailcheck/${this.state.data.email}`)
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
    let content;
    if (this.state.phaseOne) {
      content = (
        <SignUpPhaseOneComponent
          updateInputState={this.updateInputState}
          email={this.state.data.email}
          loading={this.state.loading}
          proceed={this.proceedToPhaseTwo}
          error={this.state.errorMessage}
          goBack={this.goBack}
        />
      );
    } else if (this.state.phaseThree) {
      content = (
        <SignUpPhaseThreeComponent
          register={this.register}
          title={this.state.data.firstName[0] + this.state.data.lastName[0]}
          avatar={this.state.photo}
          addAvatar={this.addAvatar}
        />
      );
    } else {
      content = (
        <SignUpPhaseTwoComponent
          updateInputState={this.updateInputState}
          goBack={this.goBack}
          updatePostalCode={this.updatePostalCode}
          updateDateOfBirth={this.updateDateOfBirth}
          error={this.state.errorMessage}
          networkError={this.props.error}
          proceed={this.proceedToPhaseThree}
          loading={this.props.loading}
          passwordConfirmation={this.state.passwordConfirmation}
          data={this.state.data}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        <SquirrelHeading
          text="Sign up"
          style={{
            paddingTop: 5,
            paddingLeft: 0,
          }}
        />
        {content}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
  error: state.auth.error,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (registrationData, photo) =>
    dispatch(actions.register(registrationData, photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
