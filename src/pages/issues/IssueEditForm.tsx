import { FormControl, InputLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AssigneeList from '../../components/assignees/AssigneeList';
import AssigneeListWrapper from '../../components/assignees/AssigneeListWrapper';
import LabelList from '../../components/labels/LabelList';
import LabelListWrapper from '../../components/labels/LabelListWrapper';
import { Assignee, Issue, Label } from '../../types';
import SettingsIcon from '@mui/icons-material/Settings';
import { useMemo, useState } from 'react';
import IssueUpdateDialog, { OptionType } from './IssueUpdateDialog';

interface Props {
  issue: Issue;
  assignees?: Assignee[];
  labels?: Label[];
  onAssigneesChange?: (assignees: string[]) => void;
  onLabelsChange?: (labels: string[]) => void;
}

const IssueEditForm = ({
  issue,
  assignees = [],
  labels = [],
  onAssigneesChange,
  onLabelsChange,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<string[]>([]);
  const [dialogSelectedOptions, setDialogSelectedOptions] = useState<string[]>([]);
  const [optionType, setOptionType] = useState<OptionType>('');

  const assigneesNames = useMemo(() => assignees.map((assignee) => assignee.login), assignees);
  const assigneesSelectedNames = useMemo(
    () => issue.assignees.map((assignee) => assignee.login),
    issue.assignees
  );

  const labelsNames = useMemo(() => labels.map((label) => label.name), labels);
  const labelsSelectedNames = useMemo(() => issue.labels.map((label) => label.name), issue.labels);

  const handleDialogClose = (options: string[], update: boolean, type: OptionType) => {
    setDialogOpen(false);

    if (!update) {
      return;
    }

    if (onAssigneesChange && type === 'assignee') {
      onAssigneesChange(options);
    }

    if (onLabelsChange && type === 'label') {
      onLabelsChange(options);
    }
  };

  const handleClickAssignees = () => {
    setOptionType('assignee');
    setDialogOptions(assigneesNames);
    setDialogSelectedOptions(assigneesSelectedNames);
    setDialogOpen(true);
  };

  const handleClickLabels = () => {
    setOptionType('label');
    setDialogOptions(labelsNames);
    setDialogSelectedOptions(labelsSelectedNames);
    setDialogOpen(true);
  };

  return (
    <Box typography="form">
      {assignees.length && (
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>
            <Typography variant="subtitle1" onClick={handleClickAssignees}>
              Assignees
            </Typography>

            <SettingsIcon onClick={handleClickAssignees} />
          </InputLabel>

          <AssigneeListWrapper>
            <AssigneeList assignees={issue.assignees} />
          </AssigneeListWrapper>
        </FormControl>
      )}

      {labels.length && (
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>
            <Typography variant="subtitle1" onClick={handleClickLabels}>
              Labels
            </Typography>

            <SettingsIcon onClick={handleClickLabels} />
          </InputLabel>

          <LabelListWrapper>
            <LabelList labels={issue.labels} />
          </LabelListWrapper>
        </FormControl>
      )}

      <IssueUpdateDialog
        optionType={optionType}
        dialogOpen={dialogOpen}
        inputOptions={dialogOptions}
        inputSelectedOptions={dialogSelectedOptions}
        onClose={handleDialogClose}
      />
    </Box>
  );
};

export default IssueEditForm;
