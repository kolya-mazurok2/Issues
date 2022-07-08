import axios from 'axios';
import { Issue } from '../../../types';
import axiosIssues from '.';

interface ResponseData {
  total_count: number;
  items: Issue[];
}

export interface HttpResponse {
  success: boolean;
  data: ResponseData;
  message: string;
}

export const DEFAULT_HTTP_RESPONSE: HttpResponse = {
  success: true,
  data: {
    total_count: 0,
    items: [],
  },
  message: 'Successfully fetched data',
};

interface FindAllParams {
  q: string;
}

export const DEFAULT_FIND_ALL_PARAMS = {
  q: `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}`,
};

export const findAll = async (
  params: FindAllParams = DEFAULT_FIND_ALL_PARAMS
): Promise<HttpResponse> => {
  try {
    const response = await axiosIssues.get('issues', {
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
