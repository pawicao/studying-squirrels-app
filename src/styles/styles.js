import {StyleSheet} from 'react-native';

export const studentTheme = {
  dark: false,
  spec: {
    loadingSize: 50,
  },
  font: {
    header: 18,
    tiny: 12,
  },
  colors: {
    starColor: '#FFBF00',
    primary: '#e35f2e',
    background: '#efefef',
    card: '#efefef',
    text: '#403f44',
    dimmedText: '#a8a8ab',
    border: '#e35f2e',
    notification: 'rgb(88,255,58)',
    primaryButtonText: '#efefef',
    secondaryButtonText: '#56545a',
    dimmedBorderColor: '#C7C7CC',
    veryDimmedBorderColor: '#e0dfdf',
  },
};

export const tutorTheme = {
  dark: true,
  spec: {
    loadingSize: 50,
  },
  font: {
    header: 18,
    tiny: 12,
  },
  colors: {
    starColor: '#FFBF00',
    primary: '#e35f2e',
    background: '#403f44',
    card: '#403f44',
    text: '#efefef',
    dimmedText: '#dadadd',
    border: '#e35f2e',
    notification: 'rgb(88,255,58)',
    primaryButtonText: '#efefef',
    secondaryButtonText: '#56545a',
    dimmedBorderColor: '#56545a',
    veryDimmedBorderColor: '#e0dfdf',
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
