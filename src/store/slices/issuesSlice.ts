import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { findAll } from '../../services/http/issues';
import { Issue } from '../../types';

interface State {
  entities: Issue[];
  loading: boolean;
  success: boolean;
}

const initialState: State = {
  entities: [],
  loading: false,
  success: true,
};

interface FindIssuesParams {
  creator?: string;
  labels?: string;
  assignee?: string;
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
  },
});

export default issuesSlice;
