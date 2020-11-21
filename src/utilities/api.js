import axios from 'axios';
import {API_BASEURL, API_KEY} from '@env';

const Api = axios.create({
  headers: {Authorization: 'Bearer ' + API_KEY},
  baseURL: API_BASEURL,
});

export default Api;