import React from 'react';
import Text from './Texts/Text';
import { View } from 'react-native';
import { AssistantButton } from "./Buttons/AssistantButton";

const TextContentWithHeader = (props) => {
  return (
    <View
      style={{
        position: 'relative',
      }}
    >
      <Text header style={{paddingHorizontal: 15, paddingBottom: props.withInput ? 0 : 15, paddingTop: 15}}>
        {props.title}
      </Text>
      {props.withInput ? (
        props.children
      ) : (
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: 'justify',
            fontStyle: props.children ? null : 'italic',
          }}>
          {props.children ? props.children : props.emptyContentMessage}
        </Text>
      )}
      {props.assisstantButton ? (
        <AssistantButton onPress={props.assisstantButton.onPress} />
      ) : null}
    </View>
  );
};

export default TextContentWithHeader;
