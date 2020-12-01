import React, {Component} from 'react';
import {ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import Text from '../../../components/ui/Texts/Text';
import {connect} from 'react-redux';
import Api from '../../../utilities/api';
import moment from 'moment';
import axios from 'axios';
import {groupBy, partition} from '../../../utilities/functions';
import LessonsSection from '../../../components/Lesson/LessonsList/LessonsSection';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Spinner from '../../../components/ui/Spinner';
import ConfirmationOverlay from '../../../components/ui/ConfirmationOverlay';
import NoDataView from '../../../components/ui/NoDataView';
// TODO: different NoData text for tutor
class LessonsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      needActionExpanded: true,
      futureLessonsExpanded: true,
      pastLessonsExpanded: true,
      needActionLessons: [],
      pastLessons: [],
      futureLessons: [],
      isLoaded: false,
      modalButtonLoading: false,
      modalRatingButtonLoading: false,
      cancelButtonLoading: false,
      confirmationModalOpened: false,
      ratingModalOpened: false,
      chosenLesson: null,
      chosenLessonRating: null,
      tutorDescription: '',
    };
  }

  sortLessons = (lessonA, lessonB, negate = false) =>
    negate
      ? moment(lessonA.date) < moment(lessonB.date)
        ? -1
        : 1
      : moment(lessonA.date) > moment(lessonB.date)
      ? -1
      : 1;

  goToLesson = (id) => this.props.navigation.push('LessonDetails', {id});

  getLessons = () => {
    this.setState({isLoaded: false});
    const currentTime = moment().format('X') * 1000;
    const urlBase = `/lessons/${this.props.userId}?student=${this.props.studentMode}&date=${currentTime}&past=`;
    axios
      .all([Api.get(`${urlBase}true`), Api.get(`${urlBase}false`)])
      .then(
        axios.spread((past, future) => {
          let pastLessons, futureLessons, needActionLessons;
          pastLessons = past.data;
          if (this.props.studentMode) {
            futureLessons = future.data;
            needActionLessons = [];
          } else {
            [futureLessons, needActionLessons] = partition(
              future.data,
              (les) => les.confirmed,
            );
          }
          const groupedPastLessons = groupBy(pastLessons, 'canceled');
          this.setState({
            pastLessons: pastLessons.length
              ? groupedPastLessons.false
                  .sort((a, b) => this.sortLessons(a, b))
                  .concat(
                    groupedPastLessons.true.sort((a, b) =>
                      this.sortLessons(a, b),
                    ),
                  )
              : [],
            futureLessons: futureLessons.sort((a, b) =>
              this.sortLessons(a, b, true),
            ),
            needActionLessons: needActionLessons.sort((a, b) =>
              this.sortLessons(a, b, true),
            ),
            isLoaded: true,
          });
        }),
      )
      .catch((error) => {
        console.log(error);
      });
  };

  onCancel = (val) => {
    console.log(val);
    Api.put(`/lesson/${val}/cancel`)
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            needActionLessons: prevState.needActionLessons.map((les) =>
              les.id === res.data.id
                ? {...les, canceled: res.data.canceled, place: null}
                : les,
            ),
          };
        }),
      )
      .catch((err) => console.log(err));
  };
  //TODO: Refresh lessons when coming back from detailed lesson view, so that no bugs occur
  onConfirm = () => {
    this.setState({modalButtonLoading: true});
    Api.put(`/lesson/${this.state.chosenLesson}/confirm`)
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            modalButtonLoading: false,
            needActionLessons: prevState.needActionLessons.map((les) =>
              les.id === res.data.id
                ? {...les, confirmed: res.data.confirmed}
                : les,
            ),
          };
        }),
      )
      .catch((err) => console.log(err));
  };

  toggleConfirmationOverlay = (val = null) => {
    console.log(val);
    this.setState((prevState) => {
      return {
        ...prevState,
        chosenLesson: val,
        confirmationModalOpened: !prevState.confirmationModalOpened,
      };
    });
  };

  toggleRatingOverlay = (chosenLessonRating = null) =>
    this.setState((prevState) => {
      return {
        ...prevState,
        chosenLessonRating,
        ratingModalOpened: !prevState.ratingModalOpened,
      };
    });

  onRatingConfirmation = () => {
    this.setState({modalRatingButtonLoading: true});
    Api.post('/lesson/rating', {
      lessonId: this.state.chosenLessonRating.id,
      student: this.props.studentMode,
      altering: !(
        typeof this.state.chosenLessonRating.oldRating === 'undefined' ||
        this.state.chosenLessonRating.oldRating === null
      ),
      rating: this.state.chosenLessonRating.newRating,
      ratingDescription: this.state.chosenLessonRating.ratingDescription,
    })
      .then((res) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            modalRatingButtonLoading: false,
            ratingModalOpened: false,
            chosenLessonRating: null,
            pastLessons: prevState.pastLessons.map((les) =>
              les.id !== res.data.id
                ? les
                : this.props.studentMode
                ? {...les, givenLesson: res.data.givenLesson}
                : {...les, takenLesson: res.data.takenLesson},
            ),
          };
        }),
      )
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getLessons();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Spinner />
        </View>
      );
    }
    if (
      this.state.needActionLessons.length === 0 &&
      this.state.futureLessons.length === 0 &&
      this.state.pastLessons.length === 0
    ) {
      return (
        <NoDataView
          subtitle={
            <>
              Go and check out the{' '}
              <Text style={{fontWeight: 'bold'}}>
                {this.props.studentMode ? 'Tutors' : 'Offers'}
              </Text>
              <Icon
                size={20}
                name={this.props.studentMode ? 'map-marker-radius' : 'glasses'}
              />{' '}
              section to start{' '}
              {this.props.studentMode ? 'learning' : 'teaching'}!
            </>
          }
          onReload={this.getLessons}
        />
      );
    }
    const lessonSectionProps = {
      onStarPress: this.toggleRatingOverlay,
      onConfirm: this.toggleConfirmationOverlay,
      onCancel: this.onCancel,
      studentMode: this.props.studentMode,
      goToLesson: this.goToLesson,
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
            this.state.chosenLessonRating
              ? this.state.chosenLessonRating.ratingDescription
              : ''
          }
          loading={this.state.modalRatingButtonLoading}
          onChangeText={(val) =>
            this.setState({
              chosenLessonRating: {
                ...this.state.chosenLessonRating,
                ratingDescription: val,
              },
            })
          }
          onBackdropPress={this.toggleRatingOverlay}>
          {this.state.chosenLessonRating && (
            <Text style={{fontWeight: 'bold'}}>
              You are about to give {this.state.chosenLessonRating.newRating}{' '}
              stars.
            </Text>
          )}{' '}
          If you want, provide a description for the given rating.
        </ConfirmationOverlay>
        <ScrollView>
          {!this.props.studentMode && (
            <LessonsSection
              title="Need action"
              past={false}
              lessons={this.state.needActionLessons}
              {...lessonSectionProps}
            />
          )}
          <LessonsSection
            title="Future lessons"
            past={false}
            lessons={this.state.futureLessons}
            {...lessonSectionProps}
          />
          <LessonsSection
            title="Past lessons"
            past
            lessons={this.state.pastLessons}
            {...lessonSectionProps}
          />
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  studentMode: state.mode.studentMode,
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(LessonsScreen);
