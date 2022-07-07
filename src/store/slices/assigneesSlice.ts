import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAll } from '../../services/http/assignees';
import { Assignee } from '../../types';

interface State {
  entities: Assignee[];
  loading: boolean;
  success: boolean;
}

const initialState: State = {
  entities: [],
  loading: false,
  success: true,
};

export const findAssignees = createAsyncThunk(
  'assignees/findAssignees',
  async (): Promise<Assignee[]> => {
    const response = await findAll();
    return response.data;
  }
);

const assigneesSlice = createSlice({
  name: 'assignees',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findAssignees.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.entities = payload.payload;
    });
    builder.addCase(findAssignees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findAssignees.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export default assigneesSlice;
