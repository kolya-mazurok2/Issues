import { Avatar, Popper, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { Assignee } from '../../types';

interface Props {
  assignees: Assignee[];
}

const AssigneeAvatarList = ({ assignees }: Props) => {
  const [open, setOpen] = useState(false);
  const elementRef = useRef(null);

  const othersText = useMemo(() => {
    if (assignees.length === 1) {
      return '';
    }

    if (assignees.length === 2) {
      return ` and ${assignees[1].login}`;
    }

    return ` and ${assignees.length - 1} others`;
  }, [assignees]);

  return (
    <div
      className="assignee-list"
      ref={elementRef}
      onMouseOver={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <Avatar src={assignees[0].avatar_url} alt="avatar" />

      <Popper open={open} anchorEl={elementRef.current} className="assignee-list-popper">
        <Typography variant="body2">
          Assigned to {assignees[0].login}
          {othersText}
        </Typography>
      </Popper>
    </div>
  );
};

export default AssigneeAvatarList;
