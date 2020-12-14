import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import HomeworkHeader from '../../../components/Homework/HomeworkHeader';
import {connect} from 'react-redux';
import axios from 'axios';
import TextContentWithHeader from '../../../components/ui/TextContentWithHeader';
import ButtonActionSection from '../../../components/ui/ButtonActionSection';
import ImageList from '../../../components/ui/ImageList';
import {Input} from '../../../components/ui/Input';
import DatePicker from 'react-native-date-picker';
import Text from '../../../components/ui/Texts/Text';
import ImageUploadOverlay from '../../../components/ui/ImageUploadOverlay';
import ImagePicker from 'react-native-image-picker';
import {API_BASEURL} from '../../../env/env';

class HomeworkScreen extends Component {
  constructor(props) {
    super(props);
    this.tomorrow = this.props.route.params.newHomework
      ? new Date(new Date().getTime() + 86400000)
      : new Date(this.props.route.params.homework.deadline);
    this.state = {
      homework: this.props.route.params.homework,
      secondaryButtonLoading: false,
      primaryButtonLoading: false,
      solutionInput: '',
      taskInput: '',
      deadlineInput: this.tomorrow,
      editing: !!this.props.route.params.newHomework,
      overlayVisible: false,
    };
  }

  goToLesson = () => {
    this.props.navigation.navigate('LessonDetails', {
      id: this.state.homework.lesson.id,
    });
  };

  getHeaderParams = () => ({
    person: this.props.studentMode
      ? this.state.homework.lesson.givenLesson.tutor
      : this.state.homework.lesson.takenLesson.student,
    lessonDate: this.state.homework.lesson.date,
    subject: this.state.homework.lesson.subject,
    handedInDate: this.state.homework.handedIn,
    deadline: this.state.homework.deadline,
    done: this.state.homework.done,
    onIconPress: this.goToLesson,
    hideBottom: !!this.props.route.params.newHomework,
  });

  addHomework = () => {
    this.setState({primaryButtonLoading: true});
    const url = '/lesson/homework';
    const data = {
      lessonId: this.state.homework.lesson.id,
      deadline: this.state.deadlineInput.getTime(),
      textContent: this.state.taskInput,
    };
    axios
      .post(url, data)
      .then((_res) => this.props.navigation.goBack())
      .catch((err) => console.log(err));
  };

  editTask = () => {
    this.setState({primaryButtonLoading: true});
    const url = '/lesson/homework';
    const data = {
      homeworkId: this.state.homework.id,
      deadline: this.state.deadlineInput.getTime(),
      textContent: this.state.taskInput,
    };
    axios
      .put(url, data)
      .then((res) =>
        this.setState((prevState) => ({
          ...prevState,
          homework: {
            ...prevState.homework,
            deadline: res.data.deadline,
            textContent: res.data.textContent,
          },
          deadlineInput: new Date(res.data.deadline),
          editing: false,
          solutionInput: '',
          primaryButtonLoading: false,
        })),
      )
      .catch((err) => console.log(err));
  };

  editSolution = () => {
    this.setState({primaryButtonLoading: true});
    const apiRequest = this.state.homework.done ? axios.put : axios.post;
    const url = '/lesson/homework/student';
    const data = {
      date: new Date().getTime(),
      solution: this.state.solutionInput,
      id: this.state.homework.id,
    };
    apiRequest(url, data)
      .then((res) =>
        this.setState((prevState) => ({
          ...prevState,
          homework: {
            ...prevState.homework,
            done: true,
            handedIn: res.data.handedIn,
            solution: res.data.solution,
          },
          editing: false,
          solutionInput: '',
          primaryButtonLoading: false,
        })),
      )
      .catch((err) => console.log(err));
  };

  cancelEditing = () =>
    this.setState({editing: false, solutionInput: '', taskInput: ''});

  startEditing = () =>
    this.setState((prevState) => ({
      ...prevState,
      editing: true,
      solutionInput: prevState.homework.solution
        ? prevState.homework.solution
        : '',
      taskInput: prevState.homework.textContent
        ? prevState.homework.textContent
        : '',
    }));

  removeHomework = () => {
    this.setState({secondaryButtonLoading: true});
    const url = `/lesson/homework/${this.state.homework.id}`;
    axios
      .delete(url)
      .then((_res) => this.props.navigation.goBack())
      .catch((err) => console.log(err));
  };

  toggleOverlay = () => {
    this.setState((prevState) => ({
      ...prevState,
      overlayVisible: !prevState.overlayVisible,
    }));
  };

  deleteAttachment = (attachment) => {
    const url = `/lesson/homework/attachment/${attachment.id}`;
    axios
      .delete(url)
      .then((_res) =>
        this.setState((prevState) => ({
          ...prevState,
          homework: {
            ...prevState.homework,
            attachments: prevState.homework.attachments.filter(
              (item) => item.id !== attachment.id,
            ),
          },
        })),
      )
      .catch((err) => console.log(err));
  };

  addAttachment = (cameraMode) => {
    const options = {
      noData: true,
    };
    const func = cameraMode
      ? ImagePicker.launchCamera
      : ImagePicker.launchImageLibrary;
    func(options, (response) => {
      if (response.uri) {
        const formData = new FormData();
        formData.append('id', this.state.homework.id);
        formData.append('file', {
          uri: response.uri,
          name: `${new Date().getTime()}-${
            this.state.homework.id
          }.${response.fileName.split('.').pop()}`,
          type: response.type,
        });
        const url = `${API_BASEURL}/lesson/homework/student/attachment`;
        const config = {
          method: 'post',
          url: url,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.props.token}`,
          },
          data: formData,
        };
        axios(config)
          .then((res) =>
            this.setState((prevState) => ({
              ...prevState,
              homework: {
                ...prevState.homework,
                attachments: res.data.attachments,
              },
            })),
          )
          .catch((err) => console.log(err));
      }
    });
  };

  render() {
    let buttonProps;
    if (this.props.studentMode) {
      if (this.state.editing) {
        buttonProps = {
          secondaryButtonText: 'Cancel',
          primaryButtonText: 'Confirm',
          showSecondaryButton: true,
          onSecondaryButtonPress: this.cancelEditing,
          onPrimaryButtonPress: this.editSolution,
        };
      } else {
        buttonProps = {
          secondaryButtonText: '',
          primaryButtonText: this.state.homework.done
            ? 'Edit solution'
            : 'Add solution',
          showSecondaryButton: false,
          onSecondaryButtonPress: null,
          onPrimaryButtonPress: this.startEditing,
        };
      }
    } else {
      if (this.state.editing) {
        buttonProps = {
          secondaryButtonText: 'Cancel',
          primaryButtonText: 'Confirm',
          showSecondaryButton: true,
          onSecondaryButtonPress: this.props.route.params.newHomework
            ? this.props.navigation.goBack
            : this.cancelEditing,
          onPrimaryButtonPress: this.props.route.params.newHomework
            ? this.addHomework
            : this.editTask,
        };
      } else {
        buttonProps = {
          secondaryButtonText: 'Remove',
          primaryButtonText: 'Edit task',
          showSecondaryButton: true,
          onSecondaryButtonPress: this.removeHomework,
          onPrimaryButtonPress: this.startEditing,
        };
      }
    }

    return (
      <View style={{flex: 1}}>
        <ImageUploadOverlay
          isVisible={this.state.overlayVisible}
          onBackdropPress={this.toggleOverlay}
          addImage={this.addAttachment}
        />
        <HomeworkHeader {...this.getHeaderParams()} />
        <ScrollView contentContainerStyle={{marginBottom: 10}}>
          <TextContentWithHeader
            title="Task"
            withInput={!this.props.studentMode && this.state.editing}
            emptyContentMessage="This homework doesn't have any task associated with it. Most likely it's a tutor's mistake or you should be aware of what is there to be done without us reminding you about it.">
            {!this.props.studentMode && this.state.editing ? (
              <Input
                multiline
                value={this.state.taskInput}
                onChangeText={(val) => this.setState({taskInput: val})}
              />
            ) : (
              this.state.homework.textContent
            )}
          </TextContentWithHeader>
          {!this.props.studentMode && this.state.editing ? (
            <>
              <Text header style={{padding: 15}}>
                Deadline
              </Text>
              <DatePicker
                mode="datetime"
                style={{alignSelf: 'center'}}
                minimumDate={this.tomorrow}
                textColor="white"
                androidVariant="nativeAndroid"
                onDateChange={(val) => this.setState({deadlineInput: val})}
                date={this.state.deadlineInput}
              />
            </>
          ) : (
            <>
              <TextContentWithHeader
                title="Solution"
                withInput={this.props.studentMode && this.state.editing}
                emptyContentMessage={`No solution provided yet.${
                  this.props.studentMode ? ' Make sure to do it on time!' : ''
                }`}>
                {this.props.studentMode && this.state.editing ? (
                  <Input
                    multiline
                    value={this.state.solutionInput}
                    onChangeText={(val) => this.setState({solutionInput: val})}
                  />
                ) : (
                  this.state.homework.solution
                )}
              </TextContentWithHeader>
              <ImageList
                onAdd={this.toggleOverlay}
                onDelete={this.deleteAttachment}
                images={this.state.homework.attachments}
                editable={this.props.studentMode && this.state.editing}
              />
            </>
          )}
          {!this.props.studentMode && this.state.homework.done ? null : (
            <ButtonActionSection
              loading={{
                secondaryButton: this.state.secondaryButtonLoading,
                primaryButton: this.state.primaryButtonLoading,
              }}
              {...buttonProps}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  studentMode: state.mode.studentMode,
  token: state.auth.token,
});

export default connect(mapStateToProps, null)(HomeworkScreen);
