import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findAll } from '../../services/http/labels';
import { Label } from '../../types';

interface State {
  entities: Label[];
  loading: boolean;
  success: boolean;
}

const initialState: State = {
  entities: [],
  loading: false,
  success: true,
};

export const findLabels = createAsyncThunk('labels/findLabels', async (): Promise<Label[]> => {
  const response = await findAll();
  return response.data;
});

const labelsSlice = createSlice({
  name: 'labels',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findLabels.fulfilled, (state, payload) => {
      state.loading = false;
      state.success = true;
      state.entities = payload.payload;
    });
    builder.addCase(findLabels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findLabels.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
  },
});

export default labelsSlice;
