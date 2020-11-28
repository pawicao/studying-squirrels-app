import React from 'react';
import {View} from 'react-native';
import IconButton from '../ui/Buttons/IconButton';
import Text from '../ui/Texts/Text';
import Spinner from '../ui/Spinner';

const SocialBar = (props) => {
  if (!props.isLoaded) {
    return (
      <Spinner style={{alignSelf: 'center', marginVertical: 6}} size={25} />
    );
  }
  let firstButtons;
  let showNote = false;
  if (!props.contactInfo) {
    firstButtons = (
      <IconButton icon="account-plus" onPress={props.addContact} />
    );
  } else if (props.contactInfo.accepted) {
    firstButtons = (
      <IconButton solid icon="account-check" onPress={props.deleteContact} />
    );
  } else {
    if (props.contactInfo.initiator === props.myId) {
      firstButtons = (
        <IconButton icon="account-arrow-right" onPress={props.deleteContact} />
      );
    } else {
      showNote = true;
      firstButtons = [
        <IconButton solid key={1} icon="check" onPress={props.acceptContact} />,
        <IconButton solid key={2} icon="close" onPress={props.deleteContact} />,
      ];
    }
  }
  return (
    <>
      {showNote && (
        <Text style={{alignSelf: 'center', marginBottom: 5}} dimmed tiny>
          This person have sent you a contact request.
        </Text>
      )}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {firstButtons}
        <IconButton icon="email" onPress={props.goToMessages} />
      </View>
    </>
  );
};

export default SocialBar;
