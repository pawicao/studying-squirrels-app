import axios from 'axios';
import {API_BASEURL} from '../env/env';
axios.defaults.baseURL = API_BASEURL;

export const sendPhoto = (
  photo,
  userId,
  jwtToken,
  callbackFunc,
  isAuth = false,
) => {
  const formData = new FormData();
  console.log(photo);
  formData.append('file', {
    uri: photo.uri,
    name: `${new Date().getTime()}-${userId}.${photo.fileName
      .split('.')
      .pop()}`,
    type: photo.type,
  });
  formData.append('id', userId);
  const url = `${API_BASEURL}/photo`;
  const config = {
    method: 'post',
    url: url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwtToken}`,
    },
    data: formData,
  };
  axios(config)
    .then((response) => {
      isAuth ? callbackFunc() : callbackFunc(response.data);
    })
    .catch((error) => {
      console.log(error);
      if (isAuth) {
        callbackFunc();
      }
    });
};
