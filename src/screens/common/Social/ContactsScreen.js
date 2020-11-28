import React, {Component} from 'react';

import {FlatList, View} from 'react-native';
import axios from 'axios';
import {AvatarListItem} from '../../../components/ui/AvatarListItem';
import {generalStyles} from '../../../styles/styles';
import Spinner from '../../../components/ui/Spinner';

const mockURL = 'https://5f37bdd6bbfd1e00160bf569.mockapi.io/test-api/contacts';

class ContactsScreen extends Component {
  state = {
    contacts: [],
  };

  renderContactItem = ({item}) => {
    return (
      <AvatarListItem
        avatarOnLeft={true}
        avatarSource={item.avatar}
        title={item.firstName + ' ' + item.lastName}
        avatarSize="medium"
      />
    );
  };

  componentDidMount() {
    axios
      .get(mockURL)
      .then((res) =>
        this.setState({
          contacts: res.data,
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let content = this.state.contacts.length ? (
      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={this.state.contacts}
          renderItem={this.renderContactItem}
        />
      </View>
    ) : (
      <View style={generalStyles.container}>
        <Spinner />
      </View>
    );

    return content;
  }
}
export default ContactsScreen;
