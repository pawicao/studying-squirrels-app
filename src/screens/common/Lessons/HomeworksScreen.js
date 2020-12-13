import React, {Component} from 'react';

import {ScrollView, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {quadrupleGroupBy, tripleGroupBy} from '../../../utilities/functions';
import Spinner from '../../../components/ui/Spinner';
import HomeworksList from '../../../components/Homework/HomeworksList';
import NoDataView from '../../../components/ui/NoDataView';

class HomeworksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      homeworks: null,
    };
  }

  goToHomework = (homework) => {
    this.props.navigation.navigate('HomeworkScreen', {homework});
  };

  getHomeworks = () => {
    this.setState({isLoaded: false});
    axios
      .get(
        `/lesson/homeworks/${this.props.userId}?student=${this.props.studentMode}`,
      )
      .then((res) =>
        this.setState({
          isLoaded: true,
          homeworks: res.data.length
            ? this.props.studentMode
              ? tripleGroupBy(res.data, 'lesson', 'subject', 'id')
              : quadrupleGroupBy(
                  res.data,
                  'lesson',
                  'takenLesson',
                  'student',
                  'id',
                )
            : null,
        }),
      )
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getHomeworks();
  }
  // TODO: When someone gets to lesson through homework, make clicking on homework POP and not PUSH
  // TODO: Common empty state and add empty state everywhere
  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Spinner />
        </View>
      );
    }
    if (!this.state.homeworks) {
      return (
        <NoDataView
          subtitle={
            "You haven't " +
            (this.props.studentMode ? 'received' : 'given') +
            ' any homeworks so far'
          }
          onReload={this.getHomeworks}
        />
      );
    }
    return (
      <ScrollView>
        {Object.keys(this.state.homeworks)
          .sort()
          .map((homeworkSection) => (
            <HomeworksList
              homeworks={this.state.homeworks[homeworkSection]}
              key={homeworkSection}
              onPress={this.goToHomework}
              title={
                this.props.studentMode
                  ? this.state.homeworks[homeworkSection][0].lesson.subject.name
                  : this.state.homeworks[homeworkSection][0].lesson.takenLesson
                      .student.firstName +
                    ' ' +
                    this.state.homeworks[homeworkSection][0].lesson.takenLesson
                      .student.lastName
              }
            />
          ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  studentMode: state.mode.studentMode,
});

export default connect(mapStateToProps, null)(HomeworksScreen);
