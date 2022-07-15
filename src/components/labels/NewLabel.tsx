import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { NewLabel as INewLabel } from '../../types';
import LabelForm from './LabelForm';
import LabelFormWrapper from './LabelFormWrapper';

interface Props {
  onCreate: (label: INewLabel) => void;
  onCancel?: () => void;
}

const NewLabel = ({ onCreate }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCreate = (label: INewLabel) => {
    onCreate(label);
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color="success"
        onClick={() => {
          setOpen(!open);
        }}
      >
        New label
      </Button>

      {open && (
        <LabelFormWrapper>
          <LabelForm
            onCreate={handleCreate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </LabelFormWrapper>
      )}
    </Box>
  );
};

export default NewLabel;
