import { Assignee, Issue, Label } from '../../types';
import IssueEditForm from './IssueEditForm';

interface Props {
  issue: Issue;
  assignees?: Assignee[];
  labels?: Label[];
  onAssigneesChange?: (options: string[]) => void;
  onLabelsChange?: (options: string[]) => void;
}

const IssueSidebar = ({
  issue,
  assignees = [],
  labels = [],
  onAssigneesChange,
  onLabelsChange,
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

  return (
    <IssueEditForm
      issue={issue}
      assignees={assignees}
      labels={labels}
      onAssigneesChange={handleAssigneesChange}
      onLabelsChange={handleLabelsChange}
    />
  );
};

export default IssueSidebar;
