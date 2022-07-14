import axios from 'axios';
import { Label, NewLabel } from '../../../types';
import axiosInstance from './';

export interface HttpResponse {
  success: boolean;
  data: Label[];
  message: string;
}

export const DEFAULT_HTTP_RESPONSE: HttpResponse = {
  success: true,
  data: [],
  message: 'Successfully fetched data',
};

export const findAll = async (): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.get('/labels');

    return { ...DEFAULT_HTTP_RESPONSE, data: response.data };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};

export const create = async (label: NewLabel): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.post('/labels', label);

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};

export const update = async (name: string, label: Label): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.patch(`/labels/${name}`, {
      new_name: label.name,
      description: label.description,
      color: label.color,
    });

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};

export const remove = async (name: string): Promise<HttpResponse> => {
  try {
    const response = await axiosInstance.delete(`/labels/${name}`);

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};
