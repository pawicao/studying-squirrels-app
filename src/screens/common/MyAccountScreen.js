import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {IconListItem} from '../../components/ui/IconListItem';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import Spinner from '../../components/ui/Spinner';
import * as actions from '../../store/actions';
import Api from "../../utilities/api";

const mockURL = 'https://5f37bdd6bbfd1e00160bf569.mockapi.io/test-api/me';

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

class MyAccountScreen extends Component {
  state = {
    user: {
      userId: null,
      firstName: '',
      lastName: '',
      avatar: null,
      studentRating: null,
      tutorRating: null,
      isTutor: null,
      isStudent: null,
      phone: null,
      email: null,
      placeOfResidence: null,
      tutorRatingsGiven: 0,
      studentRatingsGiven: 0,
    },
    loaded: false,
  };

  optionsFunction(title) {
    switch (title) {
      case 'logout':
        this.handleLogout();
        if (!this.props.studentMode) {
          this.props.route.params.changeMode();
        }
        this.props.navigation.navigate('Login');
        break;
      case 'edit':
        console.log('Edit data'); // TODO: More screens
        break;
      case 'my-profile':
        console.log('Show my profile');
        break;
      case 'support':
        console.log('Support');
        break;
      case 'settings':
        console.log('Settings');
        break;
      default:
        this.props.route.params.changeMode();
    }
  }

  handleLogout = () => {
    this.props.onLogout();
  };

  renderSettingsListItem = ({item}) => {
    return (
      <IconListItem // TODO: MINOR: Fix opacity feedback
        title={item.title}
        icon={{name: item.icon, size: 30}}
        onPress={() => this.optionsFunction(item.id)}
        chevron
      />
    );
  };

  componentDidMount() {
    Api.get(`/person/${this.props.userId}?id=${this.props.userId}`)
      .then((res) =>
        this.setState({
          user: {
            userId: res.data.id,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            avatar: res.data.photoPath,
            studentRating: res.data.studentRating,
            tutorRating: res.data.tutorRating,
            isTutor: res.data.tutor,
            isStudent: res.data.student,
            email: res.data.email,
            phone: res.data.phone,
            placeOfResidence: res.data.placeOfResidence,
            tutorRatingsGiven: res.data.tutorRatingsGiven,
            studentRatingsGiven: res.data.studentRatingsGiven,
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
          user={this.state.user}
        />
      );
    } else {
      upperContent = <Spinner style={{paddingTop: 55, paddingBottom: 55}} />;
    }
    return (
      <View>
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
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);
