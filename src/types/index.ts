import moment from 'moment';

export type State = 'all' | 'open' | 'closed';

export interface Label {
  id: number;
  name: string;
  description: string;
  color: string;
}

export const DEFAULT_LABEL: Label = {
  id: 1,
  name: 'help wanted',
  description: 'Extra attention is needed',
  color: '008672',
};

export interface Assignee {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

export const DEFAULT_ASSIGNEE: Assignee = {
  id: 1,
  login: 'developer1',
  avatar_url: '',
  url: '',
};

export interface Issue {
  id: number;
  title: string;
  body: string;
  state: State;
  number: number;
  assignee: Assignee;
  assignees: Assignee[];
  labels: Label[];
  created_at: string;
  updated_at: string;
}

export const DEFAULT_ISSUE: Issue = {
  id: 1,
  title: 'Issue #1',
  body: 'Issue #1 description',
  state: 'open',
  number: 1,
  assignee: DEFAULT_ASSIGNEE,
  assignees: [],
  labels: [],
  created_at: moment().toString(),
  updated_at: moment().toString(),
};
