import moment from 'moment';

export type State = 'open' | 'closed';

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
  avatarUrl: string;
}

export const DEFAULT_ASSIGNEE: Assignee = {
  id: 1,
  login: 'developer1',
  avatarUrl: 'https://avatars.githubusercontent.com/u/38666510',
};

export interface Issue {
  id: number;
  title: string;
  body: string;
  state: State;
  number: number;
  assignees: Assignee[];
  labels: Label[];
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}

export const DEFAULT_ISSUE: Issue = {
  id: 1,
  title: 'Issue #1',
  body: 'Issue #1 description',
  state: 'open',
  number: 1,
  assignees: [],
  labels: [],
  createdAt: moment('2022-07-05T08:14:10Z'),
  updatedAt: moment('2022-07-05T08:27:23Z'),
};
