import active from './active.env';
import prod from './prod';
const envs = {
  prod: {
    API_BASEURL: `${prod}/api`,
    AUTH_BASEURL: `${prod}/auth`,
  },
  dev: {
    API_BASEURL: 'http://192.168.0.10:8080/api',
    AUTH_BASEURL: 'http://192.168.0.10:8080/auth',
  },
};
const env = envs[active];
const API_BASEURL = env.API_BASEURL;
const AUTH_BASEURL = env.AUTH_BASEURL;
export {API_BASEURL, AUTH_BASEURL};
