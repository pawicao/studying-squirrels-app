import React, {Component} from 'react';
import OfferHeader from '../../../components/Offer/OfferHeader';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Calendar from '../../../components/Offer/Calendar/Calendar';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import RatingsList from '../../../components/Profile/RatingsList';
import Spinner from '../../../components/ui/Spinner';
import axios from 'axios';
import moment from 'moment-timezone';
import ConfirmationOverlay from '../../../components/ui/ConfirmationOverlay';

class OfferScreen extends Component {
  constructor(props) {
    super(props);
    this.tutor = this.props.route.params.tutor;
    this.offer = this.props.route.params.offer;
    this.state = {
      timeslots: null,
      ratings: null,
      studentDescription: '',
      modalOpened: false,
      chosenDate: null,
      isModalLoading: false,
    };
  }

  getFreeTimeslots = () => {
    const url = `/tutors/${this.tutor.id}/timeslots?offerId=${
      this.offer.id
    }&time=${new Date().getTime()}`;
    axios
      .get(url)
      .then((res) => this.setState({timeslots: res.data}))
      .catch((err) => console.log(err));
  };

  getRatings = () => {
    const url = `/person/${this.tutor.id}/ratings?student=false&subject=${this.offer.subject.id}`;
    axios
      .get(url)
      .then((res) => this.setState({ratings: res.data}))
      .catch((err) => console.log(err));
  };

  toggleOverlay = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        modalOpened: !prevState.modalOpened,
        studentDescription: '',
      };
    });
  };

  openOverlayWithDate = (day, hour) => {
    this.setState({
      chosenDate:
        moment(`${day} ${hour}`).tz('Europe/Warsaw').format('X') * 1000,
      modalOpened: true,
    });
  };

  goToProfile = () => this.props.navigation.goBack();

  makeAppointment = () => {
    this.setState({isModalLoading: true});
    const url = '/lesson';
    const data = {
      studentId: this.props.userId,
      offerId: this.offer.id,
      dateInMillis: this.state.chosenDate,
      isModalLoading: false,
      studentDescription: this.state.studentDescription,
    };
    axios
      .post(url, data)
      .then((res) => {
        this.props.navigation.popToTop();
        this.props.navigation.jumpTo('Lessons');
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getFreeTimeslots();
    this.getRatings();
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <ConfirmationOverlay
          onConfirm={this.makeAppointment}
          isVisible={this.state.modalOpened}
          inputValue={this.state.studentDescription}
          loading={this.state.isModalLoading}
          onChangeText={(val) => this.setState({studentDescription: val})}
          onBackdropPress={this.toggleOverlay}>
          If you want, you can add a custom message to your lesson request.
        </ConfirmationOverlay>
        <OfferHeader
          subject={this.offer.subject}
          price={this.offer.price}
          style={{paddingVertical: 30}}
        />
        {this.state.timeslots ? (
          <Calendar
            onPress={this.openOverlayWithDate}
            timeslots={this.state.timeslots}
            style={{flex: 2}}
            tutorMode={false}
          />
        ) : (
          <Spinner />
        )}
        <ScrollView style={{flex: 2}}>
          <ProfileHeader
            studentMode={false}
            user={this.tutor}
            goToProfile={this.goToProfile}
          />
          {this.state.ratings && (
            <RatingsList
              subjectName={this.offer.subject.name}
              ratings={this.state.ratings}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(OfferScreen);
