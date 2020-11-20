import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {commafy} from '../../utilities/functions';
import {useTheme} from '@react-navigation/native';
import {generalStyles} from '../../styles/styles';
import moment from 'moment';
import {Rating} from '../../components/ui/Rating';
import {API_BASEURL, API_KEY} from '@env';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from '../../components/ui/Spinner';
import {AvatarListItem} from '../../components/ui/AvatarListItem';
import {sortMethods, sortTutors} from '../../utilities/sorting';
import FilterModal from '../../components/ui/FilterModal';

const mockId = '36';
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

const tutorElement = (item, theme) => {
  const {tutor} = item;
  const subjects = commafy(
    tutor.offeredSubjects.map((subject) => subject.subject.name),
  );
  return (
    <AvatarListItem
      title={tutor.firstName}
      white
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
        base: `/nearTutors?id=${mockId}`,
        params: '',
      },
      filterMenuOpened: false,
    };
  }

  getTutors = () => {
    //TODO: Global axios setting as API KEY; BIERZ ZE STORA JUZ TOKEN
    this.setState({isLoaded: false});
    axios
      .create({
        headers: {Authorization: 'Bearer ' + API_KEY},
        baseURL: API_BASEURL,
      })
      .get(this.state.apiUrl.base + this.state.apiUrl.params)
      .then((res) =>
        this.setState({
          tutors: sortTutors(res.data),
          isLoaded: true,
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  getRecommendedTutor = () => {
    axios
      .create({
        headers: {Authorization: 'Bearer ' + API_KEY},
        baseURL: API_BASEURL,
      })
      .get(`/recommendedTutor?id=${mockId}` + this.state.apiUrl.params)
      .then((res) =>
        this.setState({
          recommendedTutor: res.data,
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
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

  applySortMethod = (itemValue, itemIndex) => {
    this.setState({isLoaded: false}, () => {
      this.setState({
        sortMethod: sortMethods[itemIndex],
        tutors: this.sortTutors(this.state.tutors, itemValue),
        isLoaded: true,
      });
    });
  };

  applyFilters = (price, city, rating, subjects) => {
    let filterCount = 0;
    let apiUrl = {
      base: '',
      params: '',
    };
    if (city !== DEFAULT_CITY) {
      console.log(city);
      console.log(DEFAULT_CITY);
      ++filterCount;
      apiUrl.params = `&city=${city.name}`;
      apiUrl.base = `/tutors?id=${mockId}`;
    } else {
      apiUrl.base = `/nearTutors?id=${mockId}`;
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
    console.log(this.state.apiUrl)
    this.getTutors();
    this.getRecommendedTutor();//TODO: Show him
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
      this.state.tutors.length ? (
        <FlatList
          keyExtractor={(item) => item.tutor.id.toString()}
          data={this.state.tutors}
          renderItem={({item}) => tutorElement(item, this.props.theme)}
        />
      ) : (
        <TouchableOpacity
          style={generalStyles.centeredContainer}
          onPress={this.getAllTutors}>
          <Icon
            name="refresh"
            size={this.props.theme.spec.loadingSize}
            color={this.props.theme.colors.dimmedText}
          />
          <Text>No results for given criteria.</Text>
          <Text>Tap to refresh.</Text>
        </TouchableOpacity>
      )
    ) : (
      <Spinner />
    );

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={[generalStyles.row, {height: 50}]}>
          <TouchableOpacity onPress={() => this.setState({...this.state, filterMenuOpened: true})}>
            <View
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
            </View>
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
            !this.state.tutors.length && generalStyles.centeredContainer,
          ]}>
          {content}
        </View>
      </View>
    );
  }
}

export default function (props) {
  const theme = useTheme();
  return <TutorsScreen {...props} theme={theme} />;
}
