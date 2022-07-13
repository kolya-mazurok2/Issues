import { Button, FormControl, MenuItem } from '@mui/material';
import { Form } from 'react-final-form';
import { Assignee, Label, NewIssue } from '../../types';
import { SELECT_MENU_PROPS } from '../../utils/mui';
import { TextField, Select, Checkboxes, CheckboxData } from 'mui-rff';
import { useMemo } from 'react';

interface Props {
  assignees?: Assignee[];
  labels?: Label[];
  onSubmit: (newIssue: NewIssue) => void;
}

interface Errors {
  title?: string;
}

const NewIssueForm = ({ assignees = [], labels = [], onSubmit }: Props) => {
  const labelsCheckboxes = useMemo(() => {
    return labels.reduce((values: CheckboxData[], value) => {
      values.push({
        label: value.name,
        value: value.name,
      });

      return values;
    }, []);
  }, [labels]);

  const validate = (values: NewIssue) => {
    const errors: Errors = {};
    if (!values.title || values.title.length < 1) {
      errors.title = 'Title can not be empty';
    }

    return errors;
  };

  const handleSubmit = (newIssue: NewIssue) => {
    onSubmit(newIssue);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form className="new-issue-form" onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField name="title" label="Title" data-testid="title" />
          </FormControl>

          <FormControl fullWidth>
            <TextField name="body" label="Body" multiline={true} rows={5} data-testid="body" />
          </FormControl>

          {assignees.length > 0 && (
            <FormControl fullWidth>
              <Select
                name="assignees"
                label="Assignees"
                multiple
                MenuProps={SELECT_MENU_PROPS}
                defaultValue={[]}
                data-testid="assignees"
              >
                {assignees.map((assignee) => (
                  <MenuItem key={assignee.id} value={assignee.login}>
                    {assignee.login}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {labels.length > 0 && (
            <FormControl fullWidth className="form-control--labels">
              <Checkboxes
                label="Labels"
                name="labels"
                data={labelsCheckboxes}
                data-testid="label"
              />
            </FormControl>
          )}

          <Button type="submit" variant="outlined" color="success">
            Create New Issue
          </Button>
        </form>
      )}
    ></Form>
  );
};

export default NewIssueForm;
