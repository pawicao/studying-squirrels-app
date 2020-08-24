import React, {Component} from 'react';

import {FlatList, View} from 'react-native';
import Text from '../../../components/ui/Text';
import Spinner from '../../../components/ui/Spinner';
import axios from 'axios';
import {AvatarListItem} from '../../../components/ui/AvatarListItem';
import {generalStyles} from '../../../styles/styles';

const mockURL = 'https://5f37bdd6bbfd1e00160bf569.mockapi.io/test-api/contacts';

class MessagesScreen  extends Component {
  state = {
    messages: [] // Just mocked. Probably will have to go through two calls, first to messages, then to people who sent them
  }

  renderMessageItem = ({item}) => {
    const testMessage = 'Hej, poklikasz?';
    return (
      <AvatarListItem
        avatarOnLeft={false}
        avatarSource={item.avatar}
        title={item.firstName + ' ' + item.lastName}
        subtitle={testMessage}
        avatarSize='medium'
        />
    );
  }

  componentDidMount() {
    axios.get(mockURL)
      .then(res => this.setState({
          messages: res.data,
        }
      ))
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let content = this.state.messages.length ?
      <View><FlatList keyExtractor={(item) => item.id} data={this.state.messages} renderItem={this.renderMessageItem}/></View> :
      <View style={generalStyles.container}><Spinner /></View>

    return content;
  }
}

export default MessagesScreen;
