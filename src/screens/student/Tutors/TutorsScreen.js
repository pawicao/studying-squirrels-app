import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {commafy} from '../../../utilities/functions';
import {useTheme} from '@react-navigation/native';
import {generalStyles} from '../../../styles/styles';
import {connect} from 'react-redux';
import moment from 'moment';
import {Rating} from '../../../components/ui/Rating';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from '../../../components/ui/Spinner';
import {AvatarListItem} from '../../../components/ui/AvatarListItem';
import {sortMethods, sortTutors} from '../../../utilities/sorting';
import FilterModal from '../../../components/ui/FilterModal';
import Api from '../../../utilities/api';
import NoDataView from '../../../components/ui/NoDataView';

const MAX_PRICE = 250;
const DEFAULT_CITY = {id: 0, name: 'Default (nearest tutors)'};

const TutorDetails = (props) => (
  <View>
    <Rating size={18} rating={props.rating} />
    <View
      style={[generalStyles.row, {justifyContent: 'flex-end', marginTop: 5}]}>
      <Text style={{color: props.theme.colors.dimmedText, marginRight: 5}}>
        {props.date}
      </Text>
      <Icon
        name="calendar-month"
        size={18}
        color={props.theme.colors.dimmedText}
      />
    </View>
    <View
      style={[generalStyles.row, {justifyContent: 'flex-end', marginTop: 2}]}>
      <Text style={{color: props.theme.colors.dimmedText, marginRight: 5}}>
        from {props.price} zł
      </Text>
      <FontAwesome5Icon
        name="coins"
        size={15}
        color={props.theme.colors.dimmedText}
      />
    </View>
  </View>
);

const tutorElement = (item, theme, goToProfile) => {
  const {tutor} = item;
  const subjects = commafy(
    tutor.offeredSubjects.map((subject) => subject.subject.name),
  );
  return (
    <AvatarListItem
      title={tutor.firstName}
      white
      onPress={() => goToProfile(tutor.id)}
      highlighted={item.recommendation}
      rightElement={
        <TutorDetails
          rating={tutor.tutorRating}
          date={moment(item.timeslot).format('d MMM y')}
          price={item.lowestPrice ? item.lowestPrice | 0 : '--'}
          theme={theme}
        />
      }
      subtitle={subjects}
      avatarSource={tutor.photoPath}
      avatarOnLeft={true}
    />
  );
};

class TutorsScreen extends Component {
  constructor(props) {
    super(props);
    this.sortMethodsList = sortMethods.map((method) => (
      <Picker.Item
        label={method.shortLabel}
        value={method.value}
        key={method.value}
      />
    ));
    this.state = {
      tutors: [],
      recommendedTutor: null,
      sortMethod: sortMethods[0],
      isLoaded: false,
      filterCount: 0,
      filters: {
        price: MAX_PRICE,
        city: DEFAULT_CITY,
        rating: 0,
        subjects: [],
      },
      apiUrl: {
        base: `/nearTutors?id=${this.props.userId}`,
        params: '',
      },
      filterMenuOpened: false,
    };
  }

  getTutors = () => {
    Api.get(this.state.apiUrl.base + this.state.apiUrl.params)
      .then((res) =>
        this.setState({
          tutors: this.state.recommendedTutor
            ? this.sortTutors(
                res.data.filter(
                  (obj) =>
                    obj.tutor.id !== this.state.recommendedTutor.tutor.id,
                ),
              )
            : this.sortTutors(res.data),
          isLoaded: true,
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  getRecommendedTutor = () => {
    const getTutors = this.getTutors;
    Api.get(
      `/recommendedTutor?id=${this.props.userId}` + this.state.apiUrl.params,
    )
      .then((res) => {
        this.setState(
          {
            recommendedTutor: res.data,
          },
          getTutors,
        );
      })
      .catch(function (error) {
        console.log(error);
        getTutors();
      });
  };

  goToProfile = (id) => {
    this.props.navigation.push('TutorProfile', {id});
  };

  componentDidMount() {
    this.getAllTutors();
  }

  closeModal = () => {
    this.setState({
      filterMenuOpened: false,
    });
  };

  sortTutors = (tutors, method = null) =>
    method
      ? sortTutors(tutors, method)
      : sortTutors(tutors, this.state.sortMethod.value);

  applySortMethod = (itemValue, itemIndex) =>
    this.setState({isLoaded: false}, () => {
      this.setState({
        sortMethod: sortMethods[itemIndex],
        tutors: this.sortTutors(this.state.tutors, itemValue),
        isLoaded: true,
      });
    });

  applyFilters = (price, city, rating, subjects) => {
    let filterCount = 0;
    let apiUrl = {
      base: '',
      params: '',
    };
    if (city !== DEFAULT_CITY) {
      ++filterCount;
      apiUrl.params = `&city=${city.name}`;
      apiUrl.base = `/tutors?id=${this.props.userId}`;
    } else {
      apiUrl.base = `/nearTutors?id=${this.props.userId}`;
    }
    if (price !== MAX_PRICE) {
      ++filterCount;
      apiUrl.params += `&maxPrice=${price}`;
    }
    if (rating !== 0) {
      ++filterCount;
      apiUrl.params += `&rating=${rating}`;
    }
    if (subjects.length) {
      ++filterCount;
      apiUrl.params += `&subjects=${subjects.join(',')}`;
    }
    this.setState(
      {
        ...this.state,
        filters: {
          price,
          city,
          rating,
          subjects,
        },
        apiUrl,
        filterMenuOpened: false,
        isLoaded: false,
        filterCount,
      },
      () => this.getAllTutors(),
    );
  };

  getAllTutors = () => {
    this.setState({isLoaded: false, recommendedTutor: null});
    this.getRecommendedTutor();
  };

  render() {
    if (this.state.filterMenuOpened) {
      return (
        <FilterModal
          filterValues={this.state.filters}
          maxPrice={MAX_PRICE}
          defaultCity={DEFAULT_CITY}
          closeModal={this.closeModal}
          applyFilters={this.applyFilters}
        />
      );
    }
    const content = this.state.isLoaded ? (
      this.state.tutors.length || this.state.recommendedTutor ? (
        <FlatList
          keyExtractor={(item) => item.tutor.id.toString()}
          data={
            this.state.recommendedTutor
              ? [this.state.recommendedTutor].concat(this.state.tutors)
              : this.state.tutors
          }
          renderItem={({item}) =>
            tutorElement(item, this.props.theme, this.goToProfile)
          }
        />
      ) : (
        <NoDataView
          subtitle={
            <>
              No results for given criteria. You can try changing the filters!
            </>
          }
          onReload={this.getAllTutors}
        />
      )
    ) : (
      <View style={{justifyContent: 'center'}}>
        <Spinner />
      </View>
    );

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={[generalStyles.row, {height: 50}]}>
          <TouchableOpacity
            onPress={() =>
              this.setState({...this.state, filterMenuOpened: true})
            }
            style={[
              generalStyles.centeredContainer,
              {
                flex: 3,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderColor: this.props.theme.colors.dimmedBorderColor,
              },
            ]}>
            <Text>FILTERS: {this.state.filterCount}</Text>
          </TouchableOpacity>
          <View
            style={[
              {
                flex: 3,
                justifyContent: 'center',
                borderColor: this.props.theme.colors.dimmedBorderColor,
                borderBottomWidth: 1,
              },
            ]}>
            <Picker
              selectedValue={this.state.sortMethod.value}
              mode="dropdown"
              style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}]}}
              onValueChange={(itemValue, itemIndex) =>
                this.applySortMethod(itemValue, itemIndex)
              }>
              {this.sortMethodsList}
            </Picker>
          </View>
        </View>
        <View
          style={[
            {flex: 6},
            !this.state.tutors.length &&
              !this.state.recommendedTutor &&
              generalStyles.centeredContainer,
          ]}>
          {content}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

function ScreenWithTheme(props) {
  const theme = useTheme();
  return <TutorsScreen {...props} theme={theme} />;
}

export default connect(mapStateToProps, null)(ScreenWithTheme);
