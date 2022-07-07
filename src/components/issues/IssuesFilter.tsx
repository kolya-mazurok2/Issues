import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Assignee, Label } from '../../types';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

interface Props {
  assignees: Assignee[];
  labels: Label[];
  onAuthorChange: (value: string) => void;
  onLabelsChange: (value: string[]) => void;
  onAssigneeChange: (value: string) => void;
}

const IssuesFilter = ({
  assignees,
  labels,
  onAuthorChange,
  onLabelsChange,
  onAssigneeChange,
}: Props) => {
  const [author, setAuthor] = useState('');
  const [labelNames, setLabelNames] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('');

  const handleAuthorChange = (value: string) => {
    setAuthor(value);
    onAuthorChange(value);
  };

  const handleLabelChange = (value: string[]) => {
    setLabelNames(value);
    onLabelsChange(value);
  };

  const handleAssigneeChange = (value: string) => {
    setAssignee(value);
    onAssigneeChange(value);
  };

  return (
    <Box typography="form">
      {assignees.length > 0 && (
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Author</InputLabel>

          <Select
            label="Author"
            MenuProps={MenuProps}
            value={author}
            onChange={(event) => {
              handleAuthorChange(event.target.value);
            }}
          >
            <MenuItem key="all" value="">
              Not Selected
            </MenuItem>
            {assignees.map((assignee) => {
              return (
                <MenuItem key={assignee.id} value={assignee.login}>
                  {assignee.login}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {labels.length > 0 && (
        <FormControl sx={{ minWidth: 250, maxWidth: 250 }}>
          <InputLabel>Labels</InputLabel>

          <Select
            label="Labels"
            MenuProps={MenuProps}
            multiple
            value={labelNames}
            onChange={(event) => {
              handleLabelChange(event.target.value as string[]);
            }}
          >
            {labels.map((label) => {
              return (
                <MenuItem key={label.id} value={label.name}>
                  {label.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {assignees.length > 0 && (
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Assignee</InputLabel>

          <Select
            label="Assignee"
            MenuProps={MenuProps}
            value={assignee}
            onChange={(event) => {
              handleAssigneeChange(event.target.value);
            }}
          >
            <MenuItem key="all" value="">
              Not Selected
            </MenuItem>
            {assignees.map((assignee) => {
              return (
                <MenuItem key={assignee.id} value={assignee.login}>
                  {assignee.login}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default IssuesFilter;
