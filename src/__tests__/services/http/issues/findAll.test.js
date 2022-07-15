import axios, { AxiosError } from 'axios';
import axiosInstance from '../../../../services/http/issues';
import {
  DEFAULT_HTTP_RESPONSE,
  DEFAULT_FIND_ALL_PARAMS,
  findAll,
} from '../../../../services/http/issues/issues';
import { DEFAULT_ISSUES } from '../../../../utils/tests-data';

jest.mock('../../../../services/http/issues');

describe('Fetchs issue list', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Empty issue list', async () => {
    axiosInstance.get = jest.fn(() => Promise.resolve(DEFAULT_HTTP_RESPONSE));
    const response = await findAll();

    expect(response.success).toEqual(true);
    expect(response.data).toEqual([]);
    expect(response.message).toEqual('Successfully fetched data');
  });

it('Receives all items', async () => {
    axiosInstance.get = jest.fn(() =>
      Promise.resolve({ ...DEFAULT_HTTP_RESPONSE, data: DEFAULT_ISSUES })
    );
    const response = await findAll();

    expect(response.success).toEqual(true);
    expect(response.data.length).toBe(2);
    expect(response.message).toEqual('Successfully fetched data');
  });

it('Receives items with an open state', async () => {
    const params = { ...DEFAULT_FIND_ALL_PARAMS, state: 'open' };

    const openIssues = DEFAULT_ISSUES.filter((issue) => {
      return issue.state === 'open';
    });

    const findAll = jest.fn(() => {
      return Promise.resolve({ ...DEFAULT_HTTP_RESPONSE, data: openIssues });
    });

    const response = await findAll({ ...DEFAULT_FIND_ALL_PARAMS, state: 'open' });

    expect(findAll).toHaveBeenCalledWith(params);
    expect(response.success).toEqual(true);
    expect(response.data.length).toBe(1);
    expect(response.message).toEqual('Successfully fetched data');
  });
  it('Rejected with an axios error', async () => {
    axiosInstance.get = jest.fn(() => {
      throw new AxiosError('Request failed with status code 404');
    });
    axiosInstance.isAxiosError = jest.fn(() => true);
    axios.isAxiosError = () => true;

    const response = await findAll();

    expect(response.success).toEqual(false);
    expect(response.data).toEqual([]);
    expect(response.message).toEqual('Request failed with status code 404');
  });

  it('Rejected with an error', async () => {
    axiosInstance.get = jest.fn(() => {
      throw new Error('Something went wrong');
    });
    const response = await findAll();

    expect(response.success).toEqual(false);
    expect(response.data).toEqual([]);
    expect(response.message).toEqual('Something went wrong');
  });
});
