import React, {Component} from 'react';
import {FlatList, ToastAndroid, View} from 'react-native';
import {connect} from 'react-redux';
import {IconListItem} from '../../../components/ui/IconListItem';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import Spinner from '../../../components/ui/Spinner';
import * as actions from '../../../store/actions';
import {sendPhoto} from '../../../utilities/api';
import axios from 'axios';
import ImageUploadOverlay from '../../../components/ui/ImageUploadOverlay';
import ImagePicker from 'react-native-image-picker';
import {setStudentMode} from "../../../utilities/storage";

const optionsList = [
  {
    id: 'my-profile',
    title: 'Show my profile',
    icon: 'account',
  },
  {
    id: 'edit',
    title: 'Edit my personal data',
    icon: 'format-color-highlight',
  },
  {
    id: 'settings',
    title: 'General settings',
    icon: 'cog',
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'help',
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: 'logout',
  },
];

class MyAccountMainScreen extends Component {
  state = {
    user: {
      id: null,
      firstName: '',
      lastName: '',
      photoPath: null,
      studentRating: null,
      tutorRating: null,
      tutor: null,
      student: null,
      phone: null,
      email: null,
      placeOfResidence: null,
      tutorRatingsGiven: 0,
      studentRatingsGiven: 0,
    },
    photoChanged: false,
    avatarModalVisible: false,
    loaded: false,
  };

  changeMode = () => {
    ToastAndroid.show(
      `You are now in ${this.props.studentMode ? 'Tutor' : 'Student'} mode`,
      ToastAndroid.SHORT,
    );
    this.props.changeMode();
  };

  optionsFunction(title) {
    switch (title) {
      case 'logout':
        this.handleLogout();
        if (!this.props.studentMode) {
          this.changeMode();
        }
        this.props.navigation.navigate('Login');
        break;
      case 'edit':
        console.log('Edit data'); // TODO: More screens
        break;
      case 'my-profile':
        this.props.navigation.push('MyAccountProfile', {
          profile: this.state.user,
        });
        break;
      case 'support':
        console.log('Support');
        break;
      case 'settings':
        console.log('Settings');
        break;
      default:
        this.changeStatus();
    }
  }

  changeAvatar = (cameraMode) => {
    const options = {
      noData: true,
    };
    let imgResponse = null;
    const func = cameraMode
      ? ImagePicker.launchCamera
      : ImagePicker.launchImageLibrary;
    func(options, (response) => {
      imgResponse = response;
      if (imgResponse.uri) {
        sendPhoto(response, this.props.userId, this.props.token, (res) =>
          this.setState((prevState) => ({
            ...prevState,
            user: {
              ...prevState.user,
              photoPath: imgResponse.uri,
            },
            photoChanged: true,
          })),
        );
      }
    });
  };

  handleLogout = () => {
    this.props.onLogout();
  };

  toggleOverlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      avatarModalVisible: !prevState.avatarModalVisible,
    }));
  };

  changeStatus = () => {
    setStudentMode(this.props.userId, !this.props.studentMode).then((_res) =>
      console.log('Mode changed in local storage.'),
    );
    if (this.state.user.tutor === this.state.user.student) {
      this.changeMode();
    } else {
      const url = `/person/status/${this.props.userId}?student=${!this.props
        .studentMode}`;
      axios
        .put(url)
        .then((_res) => {
          this.changeMode();
        })
        .catch((err) => console.log(err));
    }
  };

  renderSettingsListItem = ({item}) => {
    return (
      <IconListItem
        title={item.title}
        icon={{name: item.icon, size: 30}}
        onPress={() => this.optionsFunction(item.id)}
        chevron
      />
    );
  };

  componentDidMount() {
    const url = `/person/${this.props.userId}?id=${this.props.userId}`;
    axios
      .get(url)
      .then((res) =>
        this.setState({
          user: {
            id: res.data.person.id,
            firstName: res.data.person.firstName,
            lastName: res.data.person.lastName,
            photoPath: res.data.person.photoPath,
            studentRating: res.data.person.studentRating,
            tutorRating: res.data.person.tutorRating,
            tutor: res.data.person.tutor,
            student: res.data.person.student,
            email: res.data.person.email,
            phone: res.data.person.phone,
            offeredSubjects: res.data.person.offeredSubjects,
            placeOfResidence: res.data.person.placeOfResidence,
            tutorRatingsGiven: res.data.person.tutorRatingsGiven,
            studentRatingsGiven: res.data.person.studentRatingsGiven,
          },
          loaded: true,
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let upperContent;
    if (this.state.loaded) {
      upperContent = (
        <ProfileHeader
          studentMode={this.props.studentMode}
          me
          photoChanged={this.state.photoChanged}
          changeAvatar={this.toggleOverlay}
          user={this.state.user}
        />
      );
    } else {
      upperContent = <Spinner style={{paddingTop: 55, paddingBottom: 55}} />;
    }
    return (
      <View>
        <ImageUploadOverlay
          isVisible={this.state.avatarModalVisible}
          onBackdropPress={this.toggleOverlay}
          addImage={this.changeAvatar}
        />
        {upperContent}
        <IconListItem
          title={
            this.props.studentMode ? 'Switch to tutoring' : 'Switch to studying'
          }
          icon={{name: 'swap-horizontal-bold', size: 30}}
          onPress={() => this.optionsFunction('mode-change')}
          chevron
        />
        <FlatList
          keyExtractor={(item) => item.id}
          data={optionsList}
          renderItem={this.renderSettingsListItem}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  studentMode: state.mode.studentMode,
  userId: state.auth.userId,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
  changeMode: () => dispatch(actions.changeMode()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccountMainScreen);
