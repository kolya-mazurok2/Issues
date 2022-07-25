import { AccountCircle } from '@mui/icons-material';
import { Avatar, List, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { Assignee } from '../../types';

interface Props {
  assignees: Assignee[];
}

const AssigneeList = ({ assignees }: Props) => {
  return (
    <List className="assignee-list">
      {assignees.map((assignee) => {
        return (
          <ListItem key={assignee.id} className="assignee-list--item">
            <ListItemAvatar>
              {assignee.avatar_url ? <Avatar src={assignee.avatar_url} /> : <AccountCircle />}
            </ListItemAvatar>

            <Typography variant="body1" className="assignee-list--login">
              {assignee.login}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default AssigneeList;
