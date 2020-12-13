import axios from 'axios';
import {API_BASEURL} from '@env';
axios.defaults.baseURL = API_BASEURL;
/*const Api = axios.create({
  baseURL: API_BASEURL,
});
console.log(Api);*/

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
  const config = {
    method: 'post',
    url: `${API_BASEURL}/photo`,
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
