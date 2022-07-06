import axios from 'axios';
import axiosInstance, { DEFAULT_HTTP_RESPONSE, HttpResponse } from './';

export const findAll = async (): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.get('');

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
    const response = await axiosInstance.get(`${id}`);

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};
