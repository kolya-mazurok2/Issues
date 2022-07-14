import { Button, FormControl } from '@mui/material';
import { FormApi } from 'final-form';
import { TextField } from 'mui-rff';
import { Field, Form } from 'react-final-form';
import { Label, NewLabel } from '../../types';
import ColorPickerAdapter from '../ColorPickerAdapter';

interface Props {
  label?: Label;
  onCreate?: (label: NewLabel) => void;
  onUpdate?: (label: Label) => void;
  onCancel?: () => void;
}

interface Errors {
  name?: string;
}

const LabelForm = ({ label, onCreate, onUpdate, onCancel }: Props) => {
  const defaultColor = '#3747c3';

  const initialValues: NewLabel = {
    name: label ? label.name : '',
    description: label ? label.description : '',
    color: label ? `#${label.color}` : defaultColor,
  };

  const handleSubmit = (newLabel: NewLabel, form: FormApi<NewLabel, NewLabel>) => {
    if (label && onUpdate) {
      onUpdate({ description: '', ...newLabel, id: label.id });
    } else if (onCreate) {
      onCreate(newLabel);
    }

    form.reset();
  };

  const validate = (values: NewLabel) => {
    const errors: Errors = {};
    if (!values.name || values.name.length < 1) {
      errors.name = 'Name can not be empty';
    }

    return errors;
  };

  const handleClickCancel = (form: FormApi<NewLabel>) => {
    if (onCancel) {
      onCancel();
    }

    form.reset();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, form }) => (
        <form className="label-form" onSubmit={handleSubmit}>
          <FormControl>
            <TextField name="name" label="name" />
          </FormControl>

          <FormControl>
            <TextField name="description" label="description" />
          </FormControl>

          <FormControl>
            <Field
              name="color"
              defaultValue={initialValues.color}
              label="color"
              component={ColorPickerAdapter}
            />
          </FormControl>

          {onCancel && (
            <FormControl>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  handleClickCancel(form);
                }}
              >
                Cancel
              </Button>
            </FormControl>
          )}

          <FormControl>
            <Button type="submit" variant="outlined" color="success">
              {onCreate ? 'Create' : 'Update'}
            </Button>
          </FormControl>
        </form>
      )}
    />
  );
};

export default LabelForm;
