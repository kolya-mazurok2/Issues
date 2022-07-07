import axios from 'axios';
import { Issue } from '../../types';
import axiosInstance from './';

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

interface FindAllParams {
  creator?: string;
  labels?: string;
  assignee?: string;
}

export const findAll = async (params: FindAllParams = {}): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.get('issues', {
      params,
    });

    return { ...DEFAULT_HTTP_RESPONSE, data: response.data };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};

export const find = async (id: number): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.get(`issues/${id}`);

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};
