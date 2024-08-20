import axios from 'axios';

const customFetch = axios.create ({
  baseURL: 'http://localhost:8080',
});

export default customFetch;