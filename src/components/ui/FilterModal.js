import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Text from './Texts/Text';
import {useTheme} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {PrimaryButton} from './Buttons/PrimaryButton';
import {Divider} from 'react-native-elements';
import {SideButton} from './Buttons/SideButton';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {ClickableRating} from './ClickableRating';
import Api from '../../utilities/api';
import HorizontalWrapper from './Buttons/HorizontalWrapper';

let SLIDER_KEY = 0;

const ResetButton = (props) => {
  return (
    <SideButton
      title={props.title}
      onPress={props.onPress}
      containerStyle={{
        marginTop: -12,
        right: 0,
        position: 'absolute',
        transform: [{scaleX: 0.6}, {scaleY: 0.6}],
      }}
    />
  );
};

const FilterModal = (props) => {
  const [price, setPrice] = useState({
    price: props.filterValues.price,
    default: props.filterValues.price,
  });
  const [city, setCity] = useState({chosen: props.filterValues.city, all: []});
  const [rating, setRating] = useState(props.filterValues.rating);
  const [subjects, setSubjects] = useState({
    chosen: props.filterValues.subjects,
    all: [],
  });
  const {colors} = useTheme();

  useEffect(() => {
    Api.get('/subjects')
      .then((res) => setSubjects({...subjects, all: res.data}))
      .catch(function (error) {
        console.log(error);
      });
    Api.get('/cities')
      .then((res) =>
        setCity({
          ...city,
          all: [props.defaultCity].concat(res.data),
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const applyFilters = () => {
    props.applyFilters(price.price, city.chosen, rating, subjects.chosen);
  };

  function onStarPress(value) {
    setRating(value);
  }
  function setDefaults() {
    resetPrice();
    resetSubjects();
    resetCity();
    resetRating();
  }
  function resetRating() {
    setRating(0);
  }
  function resetPrice() {
    SLIDER_KEY = SLIDER_KEY + 1;
    setPrice({price: props.maxPrice, default: props.maxPrice});
  }

  function resetCity() {
    setCity({...city, chosen: props.defaultCity});
  }

  function resetSubjects() {
    setSubjects({...subjects, chosen: []});
  }

  const subjectList = subjects.all.map((subject) => {
    const index = subjects.chosen.indexOf(subject.name);
    return (
      <View key={subject.id} style={{flexDirection: 'row'}}>
        <CheckBox
          value={index > -1}
          tintColors={{true: colors.primary}}
          onValueChange={(newValue) => {
            let chosenSubjects = [...subjects.chosen];
            if (newValue) {
              chosenSubjects.push(subject.name);
              setSubjects({
                ...subjects,
                chosen: chosenSubjects,
              });
            } else {
              chosenSubjects.splice(index, 1);
              setSubjects({
                ...subjects,
                chosen: chosenSubjects,
              });
            }
          }}
        />
        <Text style={{marginTop: 7}}>{subject.name}</Text>
      </View>
    );
  });

  const citiesList = city.all.map((c) => (
    <Picker.Item label={c.name} value={c.id} key={c.id} />
  ));
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Text header style={{padding: 8}}>
        Filters
      </Text>
      <ScrollView>
        <View style={styles.filterContainer}>
          <View style={styles.filterTitle}>
            <Text style={styles.header}>Subjects</Text>
            <ResetButton title="Reset" onPress={resetSubjects} />
          </View>
          {subjectList}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.filterContainer}>
          <View style={styles.filterTitle}>
            <Text style={styles.header}>City</Text>
            <ResetButton title="Reset" onPress={resetPrice} />
          </View>
          <Picker
            style={{transform: [{scaleX: 0.9}, {scaleY: 0.9}], width: '70%'}}
            selectedValue={city.chosen.id}
            onValueChange={(itemValue, itemIndex) =>
              setCity({...city, chosen: city.all[itemIndex]})
            }>
            {citiesList}
          </Picker>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.filterContainer}>
          <View style={styles.filterTitle}>
            <Text style={styles.header}>Rating</Text>
            <ResetButton title="Reset" onPress={resetRating} />
          </View>
          <ClickableRating rating={rating} onStarPress={onStarPress} />
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.filterContainer, {borderBottomWidth: 0}]}>
          <View style={styles.filterTitle}>
            <Text style={styles.header}>Max price</Text>
            <ResetButton title="Reset" onPress={resetPrice} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              marginBottom: 12,
            }}>
            <Slider
              key={SLIDER_KEY}
              minimumValue={1}
              maximumValue={props.maxPrice}
              value={price.default}
              step={1}
              style={{width: '90%'}}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.dimmedText}
              thumbTintColor={colors.primary}
              onValueChange={(val) => setPrice({...price, price: val})}
            />
            <Text>
              {price.price === props.maxPrice ? '  ∞  ' : price.price + ' zł'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <HorizontalWrapper>
        <SideButton
          title="Reset"
          onPress={setDefaults}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
        <PrimaryButton
          title="Confirm"
          onPress={applyFilters}
          containerStyle={{paddingHorizontal: 20, paddingVertical: 10}}
        />
      </HorizontalWrapper>
      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 10}}
        onPress={props.closeModal}>
        <Icon name="close" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    margin: 12,
    marginBottom: 0,
  },
  header: {fontWeight: 'bold'},
  divider: {marginTop: 14, marginBottom: 14},
  input: {
    borderBottomWidth: 1,
    borderColor: '#a8a8ab',
    padding: 3,
  },
  filterTitle: {
    flexDirection: 'row',
    paddingBottom: 14,
  },
});

export default FilterModal;
