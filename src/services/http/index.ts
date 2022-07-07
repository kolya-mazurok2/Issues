import axios from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/vnd.github+json',
  Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
};

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_GITHUB_API_URL}repos/${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}/`,
  headers: {
    ...DEFAULT_HEADERS,
  },
});

export default axiosInstance;
