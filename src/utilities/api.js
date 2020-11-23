import axios from 'axios';
import {API_BASEURL} from '@env';

const Api = axios.create({
  baseURL: API_BASEURL,
});

export default Api;
