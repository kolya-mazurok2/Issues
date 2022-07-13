export type State = 'all' | 'open' | 'closed';

export interface Label {
  id: number;
  name: string;
  description: string;
  color: string;
}

export interface Assignee {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
}

export interface Issue {
  id: number;
  title: string;
  body: string;
  state: State;
  number: number;
  user: Assignee;
  assignees: Assignee[];
  labels: Label[];
  closed_by?: Assignee;
  created_at: string;
  updated_at: string;
  closed_at?: string;
}

export interface NewIssue {
  title: string;
  body?: string;
  assignees?: string[];
  labels?: string[];
}
