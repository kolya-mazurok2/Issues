import axios from 'axios';
import DEFAULT_HEADERS from '..';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_GITHUB_API_URL}repos/${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}/`,
  headers: {
    ...DEFAULT_HEADERS,
  },
});

export default axiosInstance;
