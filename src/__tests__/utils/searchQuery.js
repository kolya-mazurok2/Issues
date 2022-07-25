import { DEFAULT_FIND_ALL_PARAMS } from '../../services/http/search/methods';
import { constructSearchQuery } from '../../utils/searchQuery';

describe('Constructs search query', () => {
  it('Empty input query, no params provided', async () => {
    const query = constructSearchQuery();

    expect(query).toEqual('');
  });

  it('Default input query, no params provided', async () => {
    const query = constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q);

    expect(query).toEqual(
      `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}`
    );
  });

  it('Default input query, creator param provided', async () => {
    const params = {
      creator: 'creator',
    };

    const query = constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params);

    expect(query).toEqual(
      `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME} author:creator`
    );
  });

  it('Default input query, creator and labels param provided', async () => {
    const params = {
      creator: 'creator',
      labels: 'new',
    };

    const query = constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params);

    expect(query).toEqual(
      `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME} author:creator label:"new"`
    );
  });

  it('Default input query, all params provided', async () => {
    const params = {
      creator: 'creator',
      labels: 'new,bug,urgent',
      assignee: 'assignee',
    };

    const query = constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params);

    expect(query).toEqual(
      `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME} author:creator label:"new" label:"bug" label:"urgent" assignee:assignee`
    );
  });

  it('Default input query, all params provided but empty', async () => {
    const params = {
      creator: '',
      labels: '',
      assignee: '',
    };

    const query = constructSearchQuery(DEFAULT_FIND_ALL_PARAMS.q, params);

    expect(query).toEqual(
      `repo:${process.env.REACT_APP_REPOSITORY_OWNER}/${process.env.REACT_APP_REPOSITORY_NAME}`
    );
  });
});
