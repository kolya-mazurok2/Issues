import axios, { AxiosError } from 'axios';
import axiosInstance from '../../../../services/http/issues';
import { DEFAULT_HTTP_RESPONSE, findAll } from '../../../../services/http/issues/issues';

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

  it('Issue list with 2 items', async () => {
    axiosInstance.get = jest.fn(() =>
      Promise.resolve({ ...DEFAULT_HTTP_RESPONSE, data: [{}, {}] })
    );
    const response = await findAll();

    expect(response.success).toEqual(true);
    expect(response.data.length).toBe(2);
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
