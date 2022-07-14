import axios from 'axios';
import DEFAULT_HEADERS from '..';

const axiosSearch = axios.create({
  baseURL: `${process.env.REACT_APP_GITHUB_API_URL}search/`,
  headers: {
    ...DEFAULT_HEADERS,
  },
});

export default axiosSearch;
