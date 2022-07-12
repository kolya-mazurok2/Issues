import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PATH_ISSUES } from '../../routing/pathes';
import { Issue } from '../../types';
import AssigneeAvatarList from '../assignees/AssigneeAvatarList';
import IssueStatus from './IssueStatus';

interface Props {
  item: Issue;
}

const IssueTableItem = ({ item }: Props) => {
  return (
    <div className="issues-table--item">
      <Box className="main-info">
        <Typography variant="subtitle1">
          <Link href={`${PATH_ISSUES}${item.number}`}>{item.title}</Link>
        </Typography>

        {item.assignees.length > 0 && <AssigneeAvatarList assignees={item.assignees} />}
      </Box>
      <IssueStatus
        status={item.state}
        number={item.number}
        authorName={item.assignee ? item.assignee.login : undefined}
        createdAt={item.created_at}
        updatedAt={item.updated_at}
      />
    </div>
  );
};

export default IssueTableItem;
