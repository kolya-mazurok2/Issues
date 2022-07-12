import { Typography } from '@mui/material';
import { State } from '../../types';
import { getTimeSince } from '../../utils/date';
import PrefixedNumber from '../PrefixedNumber';

interface Props {
  status: State;
  number?: number;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

const IssueStatus = ({ status, number, authorName, createdAt, updatedAt }: Props) => {
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
          #{number} {byAuthor} was closed {getTimeSince(updatedAt)}
        </Typography>
      )}
    </div>
  );
};

export default IssueStatus;
