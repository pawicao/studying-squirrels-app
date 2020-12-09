import React, {Component} from 'react';

import {ScrollView, View} from 'react-native';
import Spinner from '../../../components/ui/Spinner';
import axios from 'axios';
import {generalStyles} from '../../../styles/styles';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import {connect} from 'react-redux';
import OfferedSubjectsList from '../../../components/Profile/OfferedSubjectsList';
import RatingsList from '../../../components/Profile/RatingsList';
import SocialBar from '../../../components/Profile/SocialBar';
import ContactInfo from '../../../components/ui/ContactInfo';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      profile: this.props.route.params.profile || null,
      mode: null,
      ratings: [],
      areRatingsLoaded: false,
      isSocialBarLoaded: true,
      contactInfo: null,
    };
  }

  getProfileData = () => {
    axios
      .get(`/person/${this.props.route.params.id}?id=${this.props.userId}`)
      .then((res) => {
        this.setState(
          {
            profile: res.data.person,
            contactInfo: res.data.contactInfo,
            isLoaded: true,
            mode: this.props.studentMode
              ? !res.data.person.tutor
              : res.data.person.student,
          },
          () => this.getRatings(this.props.route.params.id),
        );
      })
      .catch((err) => console.log(err));
  };

  getRatings = (id) => {
    if (this.state.areRatingsLoaded) {
      this.setState({areRatingsLoaded: false});
    }
    axios
      .get(
        `/person/${id}/ratings?id=${this.props.userId}&student=${this.state.mode}`,
      )
      .then((res) => {
        this.setState({
          ratings: res.data,
          areRatingsLoaded: true,
        });
      })
      .catch((err) => console.log(err));
  };

  addContact = () => {
    this.setState({isSocialBarLoaded: false});
    axios
      .post('/friend', {
        idOne: this.props.userId,
        idTwo: this.state.profile.id,
      })
      .then((res) =>
        this.setState({isSocialBarLoaded: true, contactInfo: res.data}),
      )
      .catch((err) => console.log(err));
  };

  acceptContact = () => {
    this.setState({isSocialBarLoaded: false});
    axios
      .put('/friend', {
        idOne: this.props.userId,
        idTwo: this.state.profile.id,
      })
      .then((res) =>
        this.setState({
          isSocialBarLoaded: true,
          contactInfo: res.data.contactInfo,
          profile: res.data.person,
        }),
      )
      .catch((err) => console.log(err));
  };

  deleteContact = () => {
    this.setState({isSocialBarLoaded: false});
    axios
      .delete(`/friend/${this.props.userId}?id=${this.state.profile.id}`)
      .then((res) =>
        this.setState((prevState) => ({
          isSocialBarLoaded: true,
          contactInfo: null,
          profile: {...prevState.profile, email: null, phone: null},
        })),
      )
      .catch((err) => console.log(err));
  };

  goToMessages = () => {
    console.log('GO TO MESSAGES');
  };

  goToOffer = (offer) => {
    this.props.navigation.push('OfferScreen', {
      offer: offer,
      tutor: {
        id: this.state.profile.id,
        firstName: this.state.profile.firstName,
        lastName: this.state.profile.lastName,
        photoPath: this.state.profile.photoPath,
        tutorRating: this.state.profile.tutorRating,
      },
    });
  };

  switchView = () =>
    this.setState((prevState) => {
      return {...prevState, mode: !prevState.mode};
    });

  componentDidMount() {
    this.state.profile
      ? // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({isLoaded: true, mode: this.props.studentMode}, () =>
          this.getRatings(this.props.userId),
        )
      : this.getProfileData();
  }

  render() {
    let content;
    if (!this.state.isLoaded) {
      content = (
        <View style={generalStyles.centeredContainer}>
          <Spinner />
        </View>
      );
    } else {
      content = (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <ProfileHeader
            studentMode={this.state.mode}
            user={this.state.profile}
            switchView={
              this.state.profile.student &&
              this.state.profile.tutor &&
              this.switchView
            }
          />
          <ScrollView>
            {!this.props.route.params.profile && (
              <SocialBar
                isLoaded={this.state.isSocialBarLoaded}
                contactInfo={this.state.contactInfo}
                acceptContact={this.acceptContact}
                addContact={this.addContact}
                myId={this.props.userId}
                goToMessages={this.goToMessages}
                deleteContact={this.deleteContact}
              />
            )}
            {this.state.profile.email && this.state.profile.phone && (
              <ContactInfo
                title="Contact information"
                contactData={{
                  email: this.state.profile.email,
                  phone: this.state.profile.phone,
                }}
              />
            )}
            {!this.state.mode && (
              <OfferedSubjectsList
                offeredSubjects={this.state.profile.offeredSubjects}
                onPress={
                  this.props.studentMode &&
                  !(
                    this.state.profile.id === undefined ||
                    this.state.profile.id === this.props.userId
                  )
                    ? this.goToOffer
                    : null
                }
              />
            )}
            {this.state.areRatingsLoaded ? (
              <RatingsList ratings={this.state.ratings} />
            ) : (
              <Spinner />
            )}
          </ScrollView>
        </View>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => ({
  studentMode: state.mode.studentMode,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(ProfileScreen);
