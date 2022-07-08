interface ConstructSearchQueryParams {
  creator?: string;
  labels?: string;
  assignee?: string;
}

export const constructSearchQuery = (
  inputQuery = '',
  params: ConstructSearchQueryParams = {}
): string => {
  const query = inputQuery.split(' ');

  if (!Object.keys(params).length) {
    return inputQuery;
  }

  Object.entries(params).map(([key, value]) => {
    switch (key) {
      case 'creator':
        if (value.length) {
          query.push(`author:${value}`);
        }
        break;
      case 'labels':
        if (typeof value === 'string' && value.length) {
          query.push(
            value
              .split(',')
              .map((label) => `label:"${label}"`)
              .join(' ')
          );
        }
        break;
      case 'assignee':
        if (value.length) {
          query.push(`assignee:${value}`);
        }
        break;
      case 'state':
        if (value === 'all') {
          break;
        }

        query.push(`state:${value}`);
        break;
    }
  });

  return query.join(' ');
};
