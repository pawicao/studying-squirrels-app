import {StyleSheet} from 'react-native';

export const studentTheme = {
  dark: false,
  spec: {
    loadingSize: 50,
  },
  font: {
    header: 18,
    jumbo: 36,
    tiny: 12,
  },
  colors: {
    starColor: '#FFBF00',
    yellowText: '#FFBF00',
    primary: '#e35f2e',
    dimmedPrimary: '#f8f1f1',
    background: '#efefef',
    greenText: '#1cb71f',
    redText: '#de0000',
    card: '#efefef',
    text: '#403f44',
    dimmedYellow: '#fcecd2',
    dimmedRed: '#F4CCCC',
    dimmedGreen: '#D9EAD3',
    dimmedText: '#a8a8ab',
    border: '#e35f2e',
    notification: 'rgb(88,255,58)',
    primaryButtonText: '#efefef',
    secondaryButtonText: '#56545a',
    dimmedBorderColor: '#C7C7CC',
    veryDimmedBorderColor: '#e0dfdf',
    sideButtonColor: '#e0dfdf',
  },
};

export const tutorTheme = {
  dark: true,
  spec: {
    loadingSize: 50,
  },
  font: {
    header: 18,
    jumbo: 36,
    tiny: 12,
  },
  colors: {
    starColor: '#FFBF00',
    yellowText: '#fff7b7',
    primary: '#e35f2e',
    redText: '#ee4343',
    dimmedPrimary: '#fd9a7b',
    dimmedYellow: '#e7af52',
    dimmedRed: '#8a2020',
    greenText: '#26e92a',
    dimmedGreen: '#2e7910',
    background: '#403f44',
    card: '#403f44',
    text: '#efefef',
    dimmedText: '#dadadd',
    border: '#e35f2e',
    notification: 'rgb(88,255,58)',
    primaryButtonText: '#efefef',
    secondaryButtonText: '#56545a',
    dimmedBorderColor: '#56545a',
    veryDimmedBorderColor: '#7c7c7c',
    sideButtonColor: '#e0dfdf',
  },
};

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  buttonPrimary: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonAssistantWrapper: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    marginRight: 20,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAssistant: {
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: 60,
    height: 60,
    backgroundColor: studentTheme.colors.primary,
  },
  buttonAssistantText: {
    color: '#e35f2e',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 5,
  },
});

export const imagesStyles = StyleSheet.create({
  image_100: {
    alignSelf: 'center',
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  image_75: {
    alignSelf: 'center',
    width: '75%',
    height: undefined,
    aspectRatio: 1,
  },
  image_65: {
    alignSelf: 'center',
    width: '65%',
    height: undefined,
    aspectRatio: 1,
  },
  image_50: {
    alignSelf: 'center',
    width: '50%',
    height: undefined,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
