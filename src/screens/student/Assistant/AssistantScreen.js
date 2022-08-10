import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Linking, ScrollView, View} from 'react-native';
import LessonHeader from '../../../components/Lesson/LessonHeader';
import Text from '../../../components/ui/Texts/Text';
import icon from '../../../assets/icons/icon_mini.png';
import axios from 'axios';
import Spinner from '../../../components/ui/Spinner';
import {PrimaryButton} from '../../../components/ui/Buttons/PrimaryButton';
import { generalStyles } from "../../../styles/styles";

function AssistantScreen({route}) {
  const [assistantResults, setAssistantResults] = useState([]);
  const [assistantProperties, setAssistantProperties] = useState({});
  const [assistantResultsLoading, setAssistantResultsLoading] = useState(true);
  const [assistantHasMore, setAssistantHasMore] = useState(true);

  const toggleAssistantLoading = useCallback(() => {
    setAssistantResultsLoading((prevState) => !prevState);
  }, [setAssistantResultsLoading]);

  const handleLinkPress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Invalid URL: ${url}`);
    }
  }, []);

  useEffect(() => {
    if (assistantResultsLoading) {
      const url = '/semweb/extract';
      const payload = {
        text: textContent,
        properties: {
          ...assistantProperties,
          extractedEntities: assistantResults,
        },
      };
      axios
        .post(url, payload)
        .then(({data}) => {
          setAssistantResults((prevState) => [
            ...prevState,
            ...data.extractedEntities,
          ]);
          setAssistantProperties(data.properties);
          if (!data.extractedEntities.length) {
            setAssistantHasMore(false);
          }
          toggleAssistantLoading();
        })
        .catch((err) => {
          console.log(err);
          toggleAssistantLoading();
        });
    }
  }, [assistantResultsLoading]);

  const {headerDetails, textContent} = route.params;

  let loadMoreButton;

  if (assistantResultsLoading) {
    loadMoreButton = <Spinner />;
  } else if (assistantHasMore) {
    loadMoreButton = (
      <PrimaryButton title="Load more" onPress={toggleAssistantLoading} />
    );
  } else {
    loadMoreButton = null;
  }

  return (
    <View style={{flex: 1}}>
      <LessonHeader {...headerDetails} />
      <View style={{margin: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text header style={{alignSelf: 'center'}}>
          {!assistantResultsLoading
            ? "Here's what I found about this task!"
            : 'Searching for results...'}
        </Text>
        <Image source={icon} style={{marginHorizontal: 10}} />
      </View>
      <ScrollView
        contentContainerStyle={{
          marginBottom: 10,
          marginRight: 20,
          marginLeft: 20,
        }}>
        {assistantResults.map(({uri, name, wikipediaUrl}) => (
          <Text
            key={uri}
            style={{marginVertical: 7, textDecorationLine: 'underline'}}
            primary
            onPress={() => handleLinkPress(wikipediaUrl)}>
            {name}
          </Text>
        ))}
        <View style={[generalStyles.container, {marginVertical: 20}]}>
          {loadMoreButton}
        </View>
      </ScrollView>
    </View>
  );
}

export default AssistantScreen;
