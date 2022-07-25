import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, findAll, remove, update } from '../../services/http/issues/labels';
import { Label, NewLabel } from '../../types';

interface State {
  entities: Label[];
  entity?: Label | null;
  activeEntity?: Label;
}

const initialState: State = {
  entities: [],
  entity: undefined,
};

export const findLabels = createAsyncThunk('labels/findLabels', async (): Promise<Label[]> => {
  const response = await findAll();
  return response.data;
});

export const createLabel = createAsyncThunk(
  'labels/createLabel',
  async (label: NewLabel): Promise<Label | null> => {
    const response = await create(label);
    return response.data.length ? response.data[0] : null;
  }
);

interface UpdateLabelParams {
  name: string;
  label: Label;
}

export const updateLabel = createAsyncThunk(
  'labels/updateLabel',
  async ({ name, label }: UpdateLabelParams): Promise<Label | null> => {
    const response = await update(name, label);
    return response.data.length ? response.data[0] : null;
  }
);

export const deleteLabel = createAsyncThunk(
  'labels/deleteLabel',
  async (name: string): Promise<boolean> => {
    const response = await remove(name);
    return response.success;
  }
);

const labelsSlice = createSlice({
  name: 'labels',
  initialState: initialState,
  reducers: {
    setActiveEntity: (state, payload) => {
      state.activeEntity = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findLabels.fulfilled, (state, payload) => {
      state.entities = payload.payload;
    });

    builder.addCase(createLabel.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(updateLabel.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(deleteLabel.fulfilled, (state, payload) => {
      if (payload.payload) {
        state.entity = undefined;
      }
    });
  },
});

export default labelsSlice;

export const { setActiveEntity } = labelsSlice.actions;
