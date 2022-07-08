import { Typography } from '@mui/material';
import { State } from '../../types';
import { getTimeSince } from '../../utils/date';

interface Props {
  status: State;
  number: number;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
}

const IssueStatus = ({ status, number, authorName, createdAt, updatedAt }: Props) => {
  const byAuthor = authorName ? `by ${authorName}` : '';

  return (
    <>
      {status === 'open' && (
        <Typography variant="subtitle2">
          #{number} opened {getTimeSince(createdAt)} ago {byAuthor}
        </Typography>
      )}
      {status === 'closed' && (
        <Typography variant="subtitle2">
          #{number} {byAuthor} was closed {getTimeSince(updatedAt)}
        </Typography>
      )}
    </>
  );
};

export default IssueStatus;
