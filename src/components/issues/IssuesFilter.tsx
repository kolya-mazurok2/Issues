import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Assignee, Label, State } from '../../types';
import { SELECT_MENU_PROPS } from '../../utils/mui';

interface Props {
  assignees: Assignee[];
  labels: Label[];
  onStateChange: (value: State) => void;
  onAuthorChange: (value: string) => void;
  onLabelsChange: (value: string[]) => void;
  onAssigneeChange: (value: string) => void;
}

const IssuesFilter = ({
  assignees,
  labels,
  onStateChange,
  onAuthorChange,
  onLabelsChange,
  onAssigneeChange,
}: Props) => {
  const [state, setState] = useState<State>('open');
  const [author, setAuthor] = useState('');
  const [labelNames, setLabelNames] = useState<string[]>([]);
  const [assignee, setAssignee] = useState('');

  const handleStateChange = (state: State) => {
    setState(state);
    onStateChange(state);
  };

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
    <Box typography="form" className="issue-filter">
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel>State</InputLabel>

        <Select
          label="State"
          MenuProps={SELECT_MENU_PROPS}
          value={state}
          onChange={(event) => {
            handleStateChange(event.target.value as State);
          }}
        >
          <MenuItem value="all">All</MenuItem>

          <MenuItem value="open">Open</MenuItem>

          <MenuItem value="closed">Closed</MenuItem>
        </Select>
      </FormControl>

      {assignees.length > 0 && (
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Author</InputLabel>

          <Select
            label="Author"
            MenuProps={SELECT_MENU_PROPS}
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
            MenuProps={SELECT_MENU_PROPS}
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
            MenuProps={SELECT_MENU_PROPS}
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
