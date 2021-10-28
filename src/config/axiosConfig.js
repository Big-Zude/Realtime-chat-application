import axios from 'axios';

// eslint-disable-next-line import/no-mutable-exports
export let baseURL = 'https://chat-zude.herokuapp.com/';

if (process.env.REACT_APP_API_STAGING) {
  baseURL = process.env.REACT_APP_API_STAGING;
} else if (process.env.REACT_APP_API_PRODUCTION) {
  baseURL = process.env.REACT_APP_API_PRODUCTION;
}
export const instance = axios.create({
  baseURL
});

export default instance;