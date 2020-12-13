import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Spinner from '../../../components/ui/Spinner';
import axios from 'axios';
import {connect} from 'react-redux';
import LessonHeader from '../../../components/Lesson/LessonHeader';
import HomeworksList from '../../../components/Homework/HomeworksList';
import TextContentWithHeader from '../../../components/ui/TextContentWithHeader';
import Text from '../../../components/ui/Texts/Text';
import ConfirmationOverlay from '../../../components/ui/ConfirmationOverlay';
import LessonActionView from '../../../components/Lesson/LessonActionView';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ContactInfo from '../../../components/ui/ContactInfo';

class LessonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      lesson: null,
      ratingDescription: '',
      rating: null,
      ratingModalOpened: false,
      modalButtonLoading: false,
      modalRatingButtonLoading: false,
      confirmationModalOpened: false,
      tutorDescription: '',
    };
  }

  getLesson = () => {
    this.setState({isLoaded: false});
    axios
      .get(`/lesson/${this.props.route.params.id}`)
      .then((res) => this.setState({isLoaded: true, lesson: res.data}))
      .catch((err) => console.log(err));
  };

  goToProfile = (id) => {
    this.props.navigation.push('ProfileDetails', {id});
  };

  goToHomework = (homework) => {
    this.props.navigation.navigate('HomeworkScreen', {homework});
  };

  toggleRatingOverlay = (rating = null) =>
    this.setState((prevState) => {
      return {
        ...prevState,
        rating,
        ratingModalOpened: !prevState.ratingModalOpened,
      };
    });

  toggleConfirmationOverlay = () =>
    this.setState((prevState) => {
      return {
        ...prevState,
        confirmationModalOpened: !prevState.confirmationModalOpened,
      };
    });

  onConfirm = () => {
    this.setState({modalButtonLoading: true});
    axios
      .put(`/lesson/${this.state.lesson.id}/confirm`)
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            modalButtonLoading: false,
            confirmationModalOpened: false,
            lesson: res.data,
          };
        }),
      )
      .catch((err) => console.log(err));
  };

  onCancel = () => {
    axios
      .put(`/lesson/${this.state.lesson.id}/cancel`)
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            lesson: res.data,
          };
        }),
      )
      .catch((err) => console.log(err));
  };

  onRatingConfirmation = () => {
    this.setState({modalRatingButtonLoading: true});
    const oldRating = this.props.studentMode
      ? this.state.lesson.givenLesson.tutorRating
      : this.state.lesson.takenLesson.studentRating;
    axios
      .post('/lesson/rating', {
        lessonId: this.state.lesson.id,
        student: this.props.studentMode,
        altering: oldRating != null,
        rating: this.state.rating,
        ratingDescription: this.state.ratingDescription,
      })
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            modalRatingButtonLoading: false,
            ratingModalOpened: false,
            ratingDescription: '',
            rating: null,
            lesson: {
              ...prevState.lesson,
              givenLesson: this.props.studentMode && res.data.givenLesson,
              takenLesson: this.props.studentMode && res.data.takenLesson,
            },
          };
        }),
      )
      .catch((err) => console.log(err));
  };

  addHomework = () => this.props.navigation.navigate('HomeworkScreen', {homework: {
        lesson: (({homeworks, ...rest}) => rest)(this.state.lesson),
    }, newHomework: true});

  componentDidMount() {
    this.getLesson();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Spinner />
        </View>
      );
    }
    const lessonActionProps = {
      onStarPress: this.toggleRatingOverlay,
      onConfirm: this.toggleConfirmationOverlay,
      onCancel: this.onCancel,
      oldRating: this.props.studentMode
        ? this.state.lesson.givenLesson.tutorRating
        : this.state.lesson.takenLesson.studentRating,
      studentMode: this.props.studentMode,
      date: this.state.lesson.date,
    };

    return (
      <>
        <ConfirmationOverlay
          onConfirm={this.onConfirm}
          isVisible={this.state.confirmationModalOpened}
          inputValue={this.state.tutorDescription}
          loading={this.state.modalButtonLoading}
          onChangeText={(val) => this.setState({tutorDescription: val})}
          onBackdropPress={this.toggleConfirmationOverlay}>
          If you want, you can now provide the student with a short description
          of the lesson.
        </ConfirmationOverlay>
        <ConfirmationOverlay
          onConfirm={this.onRatingConfirmation}
          isVisible={this.state.ratingModalOpened}
          inputValue={
            this.state.ratingDescription ? this.state.ratingDescription : ''
          }
          loading={this.state.modalRatingButtonLoading}
          onChangeText={(val) => this.setState({ratingDescription: val})}
          onBackdropPress={this.toggleRatingOverlay}>
          {this.state.rating && (
            <Text style={{fontWeight: 'bold'}}>
              You are about to give {this.state.rating} stars.
            </Text>
          )}{' '}
          If you want, provide a description for the given rating.
        </ConfirmationOverlay>
        <View style={{flex: 1}}>
          <LessonHeader
            goToProfile={this.goToProfile}
            lesson={this.state.lesson}
            studentMode={this.props.studentMode}
          />
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'space-between',
              flexGrow: 1,
            }}>
            <View>
              {this.state.lesson.place ? (
                <ContactInfo
                  title="Lesson details"
                  place={this.state.lesson.place}
                  contactData={
                    this.props.studentMode
                      ? {
                          email: this.state.lesson.givenLesson.tutor.email,
                          phone: this.state.lesson.givenLesson.tutor.phone,
                        }
                      : {
                          email: this.state.lesson.takenLesson.student.email,
                          phone: this.state.lesson.takenLesson.student.phone,
                        }
                  }
                />
              ) : (
                []
              )}
              {this.state.lesson.confirmed && !this.state.lesson.canceled ? (
                <HomeworksList
                  title="Homeworks"
                  homeworks={this.state.lesson.homeworks}
                  onPress={this.goToHomework}
                  addHomeworkIcon={
                    !this.props.studentMode && (
                      <Icon
                        style={{paddingTop: 10}}
                        size={25}
                        color="#fff"
                        name="plus"
                        onPress={this.addHomework}
                      />
                    )
                  }
                />
              ) : (
                []
              )}
              <TextContentWithHeader
                title="Tutor's note"
                emptyContentMessage="The tutor didn't specify any specific details regarding this lesson.">
                {this.state.lesson.tutorDescription}
              </TextContentWithHeader>
              <TextContentWithHeader
                title="Student's note"
                emptyContentMessage="The student didn't specify any specific details regarding this lesson.">
                {this.state.lesson.studentDescription}
              </TextContentWithHeader>
            </View>
            <LessonActionView
              canceled={this.state.lesson.canceled}
              confirmed={this.state.lesson.confirmed}
              {...lessonActionProps}
            />
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  studentMode: state.mode.studentMode,
});

export default connect(mapStateToProps, null)(LessonScreen);
