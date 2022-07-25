import { Assignee, Issue, Label } from '../types';

export const DEFAULT_ASSIGNEES: Assignee[] = [
  {
    login: 'kolya-mazurok2',
    id: 38666510,
    avatar_url: 'https://avatars.githubusercontent.com/u/38666510?v=4',
    url: 'https://api.github.com/users/kolya-mazurok2',
  },
  {
    login: 'zenng',
    id: 12856294,
    avatar_url: 'https://avatars.githubusercontent.com/u/12856294?v=4',
    url: 'https://api.github.com/users/zenng',
  },
];

export const DEFAULT_LABELS: Label[] = [
  {
    id: 4297642975,
    name: 'bug',
    color: 'd73a4a',
    description: 'Something is not working',
  },
  {
    id: 4297642976,
    name: 'documentation',
    color: '0075ca',
    description: 'Improvements or additions to documentation',
  },
  {
    id: 4297642977,
    name: 'duplicate',
    color: 'cfd3d7',
    description: 'This issue or pull request already exists',
  },
];

export const DEFAULT_ISSUES: Issue[] = [
  {
    id: 1,
    title: 'Issue 1',
    body: '',
    state: 'open',
    number: 1,
    user: {
      login: 'kolya-mazurok2',
      id: 38666510,
      avatar_url: 'https://avatars.githubusercontent.com/u/38666510?v=4',
      url: 'https://api.github.com/users/kolya-mazurok2',
    },
    assignees: [
      {
        login: 'kolya-mazurok2',
        id: 38666510,
        avatar_url: 'https://avatars.githubusercontent.com/u/38666510?v=4',
        url: 'https://api.github.com/users/kolya-mazurok2',
      },
    ],
    labels: [
      {
        id: 4297642976,
        name: 'documentation',
        color: '0075ca',
        description: 'Improvements or additions to documentation',
      },
    ],
    closed_by: undefined,
    created_at: '2022-07-15T09:27:35Z',
    updated_at: '2022-07-15T09:27:35Z',
  },
  {
    id: 2,
    title: 'Issue 2',
    body: 'description',
    state: 'closed',
    number: 2,
    user: {
      login: 'kolya-mazurok2',
      id: 38666510,
      avatar_url: 'https://avatars.githubusercontent.com/u/38666510?v=4',
      url: 'https://api.github.com/users/kolya-mazurok2',
    },
    assignees: [],
    labels: [],
    closed_by: undefined,
    created_at: '2022-07-15T09:27:35Z',
    updated_at: '2022-07-15T09:27:35Z',
    closed_at: '2022-07-15T11:27:35Z',
  },
];
