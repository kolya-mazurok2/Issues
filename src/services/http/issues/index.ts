import axios from 'axios';
import { Issue } from '../../../types';

const DEFAULT_HEADERS = {
  Accept: 'application/vnd.github+json',
  Authorization: `token ${process.env.REACT_APP_PERSONAL_ACCESS_TOKEN}`,
};

export interface HttpResponse {
  success: boolean;
  data: Issue[];
  message: string;
}

export const DEFAULT_HTTP_RESPONSE: HttpResponse = {
  success: true,
  data: [],
  message: 'Successfully fetched data',
};

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_GITHUB_API_URL}repos/${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}/issues`,
  headers: {
    ...DEFAULT_HEADERS,
  },
});

export default axiosInstance;
