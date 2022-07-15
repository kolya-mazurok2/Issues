import { Button, ButtonGroup, FormControl, Grid } from '@mui/material';
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
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} xs={12}>
              <TextField name="name" label="name" />
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <TextField name="description" label="description" />
            </Grid>

            <Grid item lg={3} md={6} xs={12}>
              <FormControl fullWidth>
                <Field
                  name="color"
                  defaultValue={initialValues.color}
                  label="color"
                  component={ColorPickerAdapter}
                />
              </FormControl>
            </Grid>

            <Grid item lg={3} xs={12}>
              <ButtonGroup>
                {onCancel && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleClickCancel(form);
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <Button type="submit" variant="outlined" color="success">
                  {onCreate ? 'Create' : 'Update'}
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default LabelForm;
