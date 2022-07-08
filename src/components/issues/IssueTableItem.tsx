import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Issue } from '../../types';
import AssigneeList from '../assignees/AssigneeList';
import IssueStatus from './IssueStatus';

interface Props {
  item: Issue;
}

const IssueTableItem = ({ item }: Props) => {
  return (
    <div className="issues-table--item">
      <Box className="main-info">
        <Typography variant="subtitle1">{item.title}</Typography>

        {item.assignees.length > 0 && <AssigneeList assignees={item.assignees} />}
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
