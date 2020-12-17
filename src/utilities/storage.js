import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthDataOnly = async () => {
  try {
    const authData = await AsyncStorage.getItem('@ss_auth');
    return authData ? JSON.parse(authData) : null;
  } catch (e) {
    console.log(e);
  }
};

export const getStudentMode = async (id) => {
  try {
    const stringMode = await AsyncStorage.getItem('@ss_mode');
    const mode = JSON.parse(stringMode);
    const studentsMode = mode[id.toString()];
    return mode
      ? typeof studentsMode === 'undefined'
        ? null
        : studentsMode === 'true'
      : null;
  } catch (e) {
    console.log(e);
  }
};

export const setAuthData = async (token, userId) => {
  try {
    await AsyncStorage.setItem('@ss_auth', JSON.stringify({token, userId}));
  } catch (e) {
    console.log(e);
  }
};

export const setStudentMode = async (id, newMode) => {
  try {
    const mode = await AsyncStorage.getItem('@ss_mode');
    const newItem = {
      ...JSON.parse(mode),
      [id.toString()]: newMode.toString(),
    };
    await AsyncStorage.setItem('@ss_mode', JSON.stringify(newItem));
  } catch (e) {
    console.log(e);
  }
};

export const removeAuthData = async () => {
  try {
    await AsyncStorage.removeItem('@ss_auth');
  } catch (e) {
    console.log(e);
  }
};
