import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAll } from '../../services/http/issues/methods';
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

export const findIssues = createAsyncThunk('issues/findIssues', async (): Promise<Issue[]> => {
  const response = await findAll();
  return response.data;
});

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
