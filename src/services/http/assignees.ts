import axios from 'axios';
import { Assignee } from '../../types';
import axiosInstance from './';

export interface HttpResponse {
  success: boolean;
  data: Assignee[];
  message: string;
}

export const DEFAULT_HTTP_RESPONSE: HttpResponse = {
  success: true,
  data: [],
  message: 'Successfully fetched data',
};

export const findAll = async (): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.get('/assignees');

    return { ...DEFAULT_HTTP_RESPONSE, data: response.data };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};
