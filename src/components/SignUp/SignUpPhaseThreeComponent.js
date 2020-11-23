import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Text from '../ui/Texts/Text';
import {generalStyles} from '../../styles/styles';
import JumboText from '../ui/Texts/JumboText';
import {SideButton} from '../ui/Buttons/SideButton';
import {PrimaryButton} from '../ui/Buttons/PrimaryButton';
import HorizontalWrapper from '../ui/Buttons/HorizontalWrapper';
import {Accessory, Avatar, Overlay} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const SignUpPhaseThreeComponent = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const {colors} = useTheme();
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <TouchableOpacity
            onPress={() => {
              toggleOverlay();
              props.addAvatar(true);
            }}
            style={{padding: 30, alignItems: 'center'}}>
            <Icon name="camera" size={64} color={colors.primary} />
            <Text>Take a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleOverlay();
              props.addAvatar(false);
            }}
            style={{padding: 30, alignItems: 'center'}}>
            <Icon name="file" size={64} color={colors.primary} />
            <Text>Choose from a gallery</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <View style={[generalStyles.container]}>
        <JumboText style={{marginTop: -20}}>One more thing!</JumboText>
        <Text style={{paddingBottom: 100}} header>
          Maybe you'd like to add a photo?
        </Text>
        <Avatar
          rounded
          size={140}
          containerStyle={{margin: 30}}
          source={props.avatar && {uri: props.avatar.uri}}
          title={props.title}
          onPress={toggleOverlay}
          overlayContainerStyle={{backgroundColor: colors.dimmedBorderColor}}
          placeholderStyle={{backgroundColor: colors.dimmedBorderColor}}
          titleStyle={{color: colors.text}}>
          <Accessory size={25} />
        </Avatar>
      </View>
      <HorizontalWrapper>
        <SideButton
          title="Skip"
          onPress={() => props.register(null)}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
        <PrimaryButton
          title="Upload"
          onPress={() => props.register(props.avatar)}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
      </HorizontalWrapper>
    </ScrollView>
  );
};

export default SignUpPhaseThreeComponent;
