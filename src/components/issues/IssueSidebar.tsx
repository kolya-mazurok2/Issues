import { ScopedCssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { Assignee, Issue, Label, State } from '../../types';
import AlertDialog from '../AlertDialog';
import FlexContainer from '../FlexContainer';
import ToggleStateButton from '../ToggleStateButton';
import IssueEditForm from './IssueEditForm';

interface Props {
  issue: Issue;
  assignees?: Assignee[];
  labels?: Label[];
  onAssigneesChange?: (options: string[]) => void;
  onLabelsChange?: (options: string[]) => void;
  onStateChange?: (state: State) => void;
  onDelete?: () => void;
}

const IssueSidebar = ({
  issue,
  assignees = [],
  labels = [],
  onAssigneesChange,
  onLabelsChange,
  onStateChange,
  onDelete,
}: Props) => {
  const handleAssigneesChange = (options: string[]) => {
    if (onAssigneesChange) {
      onAssigneesChange(options);
    }
  };

  const handleLabelsChange = (options: string[]) => {
    if (onLabelsChange) {
      onLabelsChange(options);
    }
  };

  const handleStateChange = (state: State) => {
    if (onStateChange) {
      onStateChange(state);
    }
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Box className="sidebar">
      <IssueEditForm
        issue={issue}
        assignees={assignees}
        labels={labels}
        onAssigneesChange={handleAssigneesChange}
        onLabelsChange={handleLabelsChange}
      />

      <ScopedCssBaseline />

      <FlexContainer>
        <div className="toggle-state-button-wrapper">
          {onStateChange && (
            <ToggleStateButton currentState={issue.state} onChange={handleStateChange} />
          )}
        </div>

        <AlertDialog
          openButton={{ name: 'Delete', color: 'error' }}
          onConfirm={handleDeleteConfirm}
        />
      </FlexContainer>
    </Box>
  );
};

export default IssueSidebar;
