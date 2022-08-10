import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Linking, ScrollView, View} from 'react-native';
import LessonHeader from '../../../components/Lesson/LessonHeader';
import Text from '../../../components/ui/Texts/Text';
import icon from '../../../assets/icons/icon_mini.png';
import axios from 'axios';
import Spinner from '../../../components/ui/Spinner';
import {PrimaryButton} from '../../../components/ui/Buttons/PrimaryButton';

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
        properties: assistantProperties,
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
        .catch((err) => console.log(err));
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
      <View>
        <Text>
          {!assistantResultsLoading
            ? "Here's what I found about this task!"
            : 'Searching for results...'}
        </Text>
        <Image source={icon} />
      </View>
      <ScrollView contentContainerStyle={{marginBottom: 10}}>
        {assistantResults.map(({uri, name, wikipediaUrl}) => (
          <Text
            key={uri}
            style={{marginVertical: 10}}
            primary
            onPress={() => handleLinkPress(wikipediaUrl)}>
            {name}
          </Text>
        ))}
        {loadMoreButton}
      </ScrollView>
    </View>
  );
}

export default AssistantScreen;
