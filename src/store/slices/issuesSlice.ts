import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { findAll } from '../../services/http/issues/issues';
import { DEFAULT_FIND_ALL_PARAMS, findAll as searchAll } from '../../services/http/search/methods';
import { Issue, State as StateType } from '../../types';
import { constructSearchQuery } from '../../utils/searchQuery';

interface State {
  entities: Issue[];
  totalEntities: number;
  loading: boolean;
  success: boolean;
}

const initialState: State = {
  entities: [],
  totalEntities: 0,
  loading: false,
  success: true,
};

interface FindIssuesParams {
  state?: StateType;
  creator?: string;
  labels?: string;
  assignee?: string;
  page?: number;
  per_page?: number;
}

export const findIssues = createAsyncThunk(
  'issues/findIssues',
  async (params: FindIssuesParams = {}): Promise<Issue[]> => {
    if (isEmpty(params.creator)) {
      delete params.creator;
    }

    if (isEmpty(params.assignee)) {
      delete params.assignee;
    }

    const response = await findAll(params);
    return response.data;
  }
);

export const findTotalIssues = createAsyncThunk(
  'issues/findTotalIssues',
  async (params: FindIssuesParams = {}): Promise<number> => {
    const response = await searchAll({
      ...DEFAULT_FIND_ALL_PARAMS,
      q: constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params),
    });
    return response.data.total_count;
  }
);

interface findIssuesComplex {
  entities: Issue[];
  total: number;
}

export const findIssuesComplex = createAsyncThunk(
  'issues/findIssuesComplex',
  async (params: FindIssuesParams = {}): Promise<findIssuesComplex> => {
    if (isEmpty(params.creator)) {
      delete params.creator;
    }

    if (isEmpty(params.assignee)) {
      delete params.assignee;
    }

    const [findResponse, searchResponse] = await Promise.all([
      findAll(params),
      searchAll({
        ...DEFAULT_FIND_ALL_PARAMS,
        q: constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params),
      }),
    ]);

    return {
      entities: findResponse.data,
      total: searchResponse.data.total_count,
    };
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findIssues.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.entities = payload.payload;
    });
    builder.addCase(findIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findIssues.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    builder.addCase(findTotalIssues.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.totalEntities = payload.payload;
    });
    builder.addCase(findTotalIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findTotalIssues.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    builder.addCase(findIssuesComplex.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.entities = payload.payload.entities;
      state.totalEntities = payload.payload.total;
    });
    builder.addCase(findIssuesComplex.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findIssuesComplex.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export default issuesSlice;
