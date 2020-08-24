import React, { Component } from 'react';
import {FlatList, Text, View} from 'react-native';
import axios from 'axios';
import {commafy} from '../../utilities/functions';
import {useTheme} from '@react-navigation/native';
import {generalStyles} from '../../styles/styles';
import {Rating} from '../../components/ui/Rating';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from '../../components/ui/Spinner';
import {AvatarListItem} from '../../components/ui/AvatarListItem';

const mockURL = 'https://5f37bdd6bbfd1e00160bf569.mockapi.io/test-api/tutors';

const TutorDetails = (props) => (
  <View>
    <Rating size={18} rating={props.rating} />
    <View style={[generalStyles.row, {justifyContent: 'flex-end', marginTop: 5}]}>
      <Text style={{color: props.theme.colors.dimmedText, marginRight: 5}}>{props.date}</Text><Icon name='calendar-month' size={18} color={props.theme.colors.dimmedText} />
    </View>
    <View style={[generalStyles.row, {justifyContent: 'flex-end', marginTop: 2}]}>
      <Text style={{color: props.theme.colors.dimmedText, marginRight: 5}}>od {props.price} zł</Text><FontAwesome5Icon name='coins' size={15} color={props.theme.colors.dimmedText} />
    </View>
  </View>
);

const tutor = (item, theme) => {
  let subjects = commafy(item.subjects);
  let date = new Date(item.availableFrom*1000);
  return (
    <AvatarListItem
      title={item.firstName}
      white
      rightElement={<TutorDetails rating={item.rating} date={date.toLocaleDateString()} price={item.price} theme={theme} />}
      subtitle={subjects}
      avatarSource={item.avatar}
      avatarOnLeft={true}
    />
  );
};

class TutorsScreen extends Component {

  // sortowanie to jakos ogarnij
  // filtrowanie to zrobic w componentDidUpdate i zrobic jeszcze shouldComponentUpdate zeby za czesto sie nie robilo

  state = {
    tutors: [],
  };

  componentDidMount() {
    axios.get(mockURL)
      .then(res => this.setState({
          tutors: res.data,
        }
      ))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let content = this.state.tutors.length ?
      <FlatList keyExtractor={(item) => item.id} data={this.state.tutors} renderItem={({item}) => tutor(item, this.props.theme)}/> :
      <Spinner />

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={[generalStyles.row, {height: 50}]}>
          <View style={[generalStyles.centeredContainer, {flex: 3, borderRightWidth: 1, borderBottomWidth: 1, borderColor: this.props.theme.colors.dimmedBorderColor}]}><Text>FILTERS: 0</Text></View>
          <View style={[generalStyles.centeredContainer, {flex: 3, borderColor: this.props.theme.colors.dimmedBorderColor, borderBottomWidth: 1}]}><Text>SORT: BRAK XD</Text></View>
        </View>
        <View style={[{flex: 6}, !this.state.tutors.length && generalStyles.centeredContainer]}>{content}</View>
      </View>
    );
  }
}

export default function(props) {
  const theme = useTheme();
  return <TutorsScreen {...props} theme={theme} />;
}
