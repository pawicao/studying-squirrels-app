import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Spinner from '../../../components/ui/Spinner';
import Api from '../../../utilities/api';
import {Picker} from '@react-native-picker/picker';
import SubjectHeader from '../../../components/Subject/SubjectHeader';
import SubjectPriceInput from '../../../components/Subject/SubjectPriceInput';
import {isPrice} from '../../../utilities/functions';
import SubjectAvailability from '../../../components/Subject/SubjectAvailability';
import {getAllTimeslots} from '../../../utilities/time';
import HorizontalWrapper from '../../../components/ui/Buttons/HorizontalWrapper';
import {PrimaryButton} from '../../../components/ui/Buttons/PrimaryButton';
import {SideButton} from '../../../components/ui/Buttons/SideButton';
import {connect} from 'react-redux';

const newSubjectObject = {id: -1, name: '<New subject>', icon: 'book'};

class SubjectScreen extends Component {
  constructor(props) {
    super(props);
    this.pickerItems = [];
    this.inputKey = 0;
    this.state = {
      isLoaded: false,
      editMode: !!this.props.route.params,
      allSubjects: [],
      chosenSubject: null,
      inputValue: '',
      inputKey: 0,
      timeslots: null,
      price: '',
      addButtonLoading: false,
      removeButtonLoading: false,
      newSubjectId: null,
    };
  }

  addSubjectAndOffer = () => {
    if (!this.state.price) {
      return;
    }
    this.setState({addButtonLoading: true});
    if (this.state.inputValue) {
      this.addSubject();
    } else {
      this.addOffer(this.state.chosenSubject.id);
    }
  };

  addSubject = () => {
    Api.post('/subject', {name: this.state.inputValue.trim()})
      .then((res) =>
        this.setState(
          {
            newSubjectId: res.data.id,
          },
          () => this.addOffer(res.data.id),
        ),
      )
      .catch((err) => console.log(err));
  };

  addOffer = (subjectId) => {
    let timeslotsToPass = {};
    for (let key of Object.keys(this.state.timeslots)) {
      if (this.state.timeslots[key].chosen.length) {
        timeslotsToPass[key] = this.state.timeslots[key].chosen;
      }
    }
    Api.post('/offer', {
      tutorId: this.props.userId,
      subjectId,
      slots: timeslotsToPass,
      price: parseFloat(this.state.price.replace(',', '.')),
    })
      .then((res) => {
        this.props.navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  combineTimeslots = (all, chosen) => {
    let timeslots = {...all};
    for (let key of Object.keys(timeslots)) {
      timeslots[key].chosen = chosen[key];
    }
    return timeslots;
  };

  getAllOffers = () => {
    this.setState({isLoaded: false});
    Api.get('/subjects').then((res) => {
      const sortedData = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.pickerItems = sortedData.map((subject) => (
        <Picker.Item value={subject.id} label={subject.name} key={subject.id} />
      ));
      const newState = this.state.editMode
        ? {
            chosenSubject: this.props.route.params.offer.subject,
            timeslots: this.combineTimeslots(
              getAllTimeslots(),
              this.props.route.params.offer.timeslots,
            ),
            price: this.props.route.params.offer.price
              .toString()
              .replace('.', ','),
          }
        : {
            chosenSubject: sortedData.length ? sortedData[0] : newSubjectObject,
            timeslots: getAllTimeslots(),
            price: '',
          };
      this.setState({
        isLoaded: true,
        allSubjects: sortedData,
        ...newState,
      });
    });
  };

  onPickerValueChange = (val) => {
    this.setState((prevState) => {
      return {
        chosenSubject: prevState.allSubjects.find(
          (subject) => subject.id === val,
        ),
        inputValue: '',
        inputKey: ++prevState.inputKey,
      };
    });
  };

  onPriceChange = (val) => {
    return !isPrice(val)
      ? null
      : this.setState({
          price: parseFloat(val) > 300 ? '300' : val.replace('.', ','),
        });
  };

  handleIconClick = (add) => {
    const addition = add ? 1 : -1;
    let value = this.state.price
      ? parseFloat(this.state.price.replace(',', '.'))
      : 0;
    value += addition;
    if (value > 300) {
      value = 300;
    } else if (value < 0) {
      value = 0;
    }
    this.setState({price: value.toString().replace('.', ',')});
  };

  onInputValueChange = (val) => {
    this.setState({
      inputValue: val,
      chosenSubject: newSubjectObject,
    });
  };

  handleHourClick = (day, hour) => {
    this.setState((prevState) => {
      let newTimeslots = {...prevState.timeslots};
      const index = newTimeslots[day].chosen.indexOf(hour);
      if (index < 0) {
        newTimeslots[day].chosen.push(hour);
        newTimeslots[day].chosen.sort();
      } else {
        newTimeslots[day].chosen.splice(index, 1);
      }
      return {
        ...prevState,
        timeslots: newTimeslots,
      };
    });
  };

  componentDidMount() {
    this.getAllOffers();
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Spinner />
        </View>
      );
    }
    // TODO: removed property in Subject in back-end, adjust getTutors repository methods and everything (also getTutors in profile for sure)
    return (
      <View style={{flex: 1}}>
        <SubjectHeader
          inputKey={this.inputKey}
          editMode={this.state.editMode}
          inputValue={this.state.inputValue}
          pickerItems={this.pickerItems}
          icon={this.state.chosenSubject.icon}
          pickerValue={this.state.chosenSubject.id}
          onPickerValueChange={this.onPickerValueChange}
          onInputValueChange={this.onInputValueChange}
        />
        <SubjectPriceInput
          price={this.state.price}
          style={{marginTop: 15}}
          handleIconClick={this.handleIconClick}
          onPriceChange={this.onPriceChange}
        />
        <SubjectAvailability
          style={{flex: 2}}
          timeslots={this.state.timeslots}
          handleHourClick={this.handleHourClick}
        />
        <HorizontalWrapper>
          {this.state.removeButtonLoading ? (
            <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
          ) : (
            <SideButton
              containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
              title="Remove"
              onPress={() => console.log('XA')}
            />
          )}
          {this.state.addButtonLoading ? (
            <Spinner style={{paddingHorizontal: 20, paddingTop: 10}} />
          ) : (
            <PrimaryButton
              containerStyle={{paddingHorizontal: 20, paddingTop: 10}}
              title="  Add  "
              onPress={this.addSubjectAndOffer}
            />
          )}
        </HorizontalWrapper>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

export default connect(mapStateToProps, null)(SubjectScreen);
