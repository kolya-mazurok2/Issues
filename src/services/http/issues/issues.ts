import axios from 'axios';
import { Issue, State } from '../../../types';
import axiosIssues from './';

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
  state?: State;
  per_page?: number;
  page?: number;
}

const DEFAULT_FIND_ALL_PARAMS: FindAllParams = {
  state: 'all',
  per_page: 30,
  page: 1,
};

export const findAll = async (
  params: FindAllParams = DEFAULT_FIND_ALL_PARAMS
): Promise<HttpResponse> => {
  try {
    const response = await axiosIssues.get('issues', {
      params: { ...DEFAULT_FIND_ALL_PARAMS, ...params },
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
    const response = await axiosIssues.get(`issues/${id}`);

    return { ...DEFAULT_HTTP_RESPONSE, data: [response.data] };
  } catch (err) {
    return {
      ...DEFAULT_HTTP_RESPONSE,
      success: false,
      message: axios.isAxiosError(err) ? err.message : 'Something went wrong',
    };
  }
};
