import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as styles from '../../../styles/styles';
import logo from '../../../assets/logo-1200px.png';
import * as actions from '../../../store/actions';
import {PrimaryButton} from '../../../components/ui/Buttons/PrimaryButton';
import {generalStyles} from '../../../styles/styles';
import Text from '../../../components/ui/Texts/Text';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Spinner from '../../../components/ui/Spinner';
import ErrorText from '../../../components/ui/Texts/ErrorText';
import {EmailInput, PasswordInput} from '../../../components/ui/Input';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  updateInputState = (key, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  handleLogin = () => {
    this.props.onLogin(this.state.email, this.state.password);
  };

  goToRegistration = () => {
    this.props.navigation.push('Sign up');
  };

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate(previousProps, previousState) {
    // NOTE: Probably could be implemented better
    if (this.props.token) {
      this.props.navigation.navigate('Content');
    } else if (this.props.error && previousProps.error === null) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({...this.state, password: ''});
    }
  }

  render() {
    return (
      <View style={[generalStyles.container]}>
        <Image
          source={logo}
          resizeMode="contain"
          style={styles.imagesStyles.image_65}
        />
        <EmailInput
          label="E-mail address"
          value={this.state.email}
          onChangeText={(val) => this.updateInputState('email', val)}
        />
        <PasswordInput
          label="Password"
          value={this.state.password}
          style={{marginBottom: 30}}
          onChangeText={(val) => this.updateInputState('password', val)}
        />
        {this.props.error && <ErrorText>Authentication failed.</ErrorText>}
        {this.props.loading ? (
          <Spinner style={{marginTop: 15, marginBottom: 10}} />
        ) : (
          <PrimaryButton
            title="Sign in"
            containerStyle={{marginTop: 15, marginBottom: 10}}
            onPress={this.handleLogin}
          />
        )}
        <Text primary tiny>
          Forgot your password?
        </Text>
        <Text style={{opacity: 0.7, fontWeight: 'bold', marginVertical: 40}}>
          - OR -
        </Text>
        <Text tiny style={{textTransform: 'uppercase'}}>
          Sign up with
        </Text>
        <View style={[generalStyles.row, {marginBottom: 20}]}>
          <TouchableOpacity style={{marginHorizontal: 5}}>
            <Icon name="facebook" size={40} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 5}}>
            <Icon name="google" size={40} color="#DB4437" />
          </TouchableOpacity>
        </View>
        <Text
          style={{position: 'absolute', bottom: 10}}
          primary
          onPress={this.goToRegistration}>
          Don't have an account yet? Sign up!
        </Text>
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
  onLogin: (email, password) =>
    dispatch(actions.auth(email.toLowerCase(), password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
