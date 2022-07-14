import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import {
  create,
  find,
  findAll,
  updateAssignees,
  updateLabels,
  updateState,
  updateTitle,
} from '../../services/http/issues/issues';
import { DEFAULT_FIND_ALL_PARAMS, findAll as searchAll } from '../../services/http/search/methods';
import { Issue, NewIssue, State as StateType } from '../../types';
import { constructSearchQuery } from '../../utils/searchQuery';

interface State {
  entity: Issue | null;
  entities: Issue[];
  totalEntities: number;
}

const initialState: State = {
  entity: null,
  entities: [],
  totalEntities: 0,
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

export const findIssue = createAsyncThunk(
  'issues/findIssue',
  async (id: number): Promise<Issue | null> => {
    const response = await find(id);
    return response.data.length ? response.data[0] : null;
  }
);

interface UpdateIssueAssigneesParams {
  id: number;
  assignees: string[];
}

export const updateIssueAssignees = createAsyncThunk(
  'issues/updateIssueAssignees',
  async ({ id, assignees }: UpdateIssueAssigneesParams): Promise<Issue | null> => {
    const response = await updateAssignees(id, assignees);
    return response.data.length ? response.data[0] : null;
  }
);

interface UpdateIssueLabelsParams {
  id: number;
  labels: string[];
}

export const updateIssueLabels = createAsyncThunk(
  'issues/updateIssueLabels',
  async ({ id, labels }: UpdateIssueLabelsParams): Promise<Issue | null> => {
    const response = await updateLabels(id, labels);
    return response.data.length ? response.data[0] : null;
  }
);

interface UpdateIssueTitleParams {
  id: number;
  title: string;
}

export const updateIssueTitle = createAsyncThunk(
  'issues/updateTitle',
  async ({ id, title }: UpdateIssueTitleParams): Promise<Issue | null> => {
    const response = await updateTitle(id, title);
    return response.data.length ? response.data[0] : null;
  }
);

interface UpdateIssueStateParams {
  id: number;
  state: StateType;
}

export const updateIssueState = createAsyncThunk(
  'issues/updateState',
  async ({ id, state }: UpdateIssueStateParams): Promise<Issue | null> => {
    const response = await updateState(id, state);
    return response.data.length ? response.data[0] : null;
  }
);

export const createNewIssue = createAsyncThunk(
  'issues/create',
  async (newIssue: NewIssue): Promise<Issue | null> => {
    const response = await create(newIssue);
    return response.data.length ? response.data[0] : null;
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findIssues.fulfilled, (state, payload) => {
      state.entities = payload.payload;
    });

    builder.addCase(findTotalIssues.fulfilled, (state, payload) => {
      state.totalEntities = payload.payload;
    });

    builder.addCase(findIssuesComplex.fulfilled, (state, payload) => {
      state.entities = payload.payload.entities;
      state.totalEntities = payload.payload.total;
    });

    builder.addCase(findIssue.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(updateIssueAssignees.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(updateIssueLabels.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(updateIssueTitle.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });

    builder.addCase(updateIssueState.fulfilled, (state, payload) => {
      state.entity = payload.payload;
    });
  },
});

export default issuesSlice;
