import { Typography } from '@mui/material';
import { State } from '../../types';
import { getTimeSince } from '../../utils/date';
import PrefixedNumber from '../PrefixedNumber';

interface Props {
  status: State;
  number?: number;
  authorName?: string;
  closedBy?: string;
  createdAt: string;
  closedAt?: string;
}

const IssueStatus = ({ status, number, authorName, closedBy, createdAt, closedAt }: Props) => {
  const byAuthor = authorName ? `by ${authorName}` : '';

  return (
    <div className="issue-state-info">
      {status === 'open' && (
        <Typography variant="subtitle2">
          {number && <PrefixedNumber number={number} />} opened {getTimeSince(createdAt)} ago{' '}
          {byAuthor}
        </Typography>
      )}
      {status === 'closed' && (
        <Typography variant="subtitle2">
          {number && `#${number}`} {closedBy && `by ${closedBy}`}{' '}
          {closedAt && `was closed ${getTimeSince(closedAt)}`}
        </Typography>
      )}
    </div>
  );
};

export default IssueStatus;
