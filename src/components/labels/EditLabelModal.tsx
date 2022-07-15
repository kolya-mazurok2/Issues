import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { Label } from '../../types';
import EditLabelModalWrapper from './EditLabelModalWrapper';
import LabelForm from './LabelForm';
import LabelFormWrapper from './LabelFormWrapper';

interface Props {
  label?: Label;
  open: boolean;
  onUpdate: (label: Label) => void;
  onClose: () => void;
}

const EditLabelModal = ({ label, open, onUpdate, onClose }: Props) => {
  const handleUpdate = (label: Label) => {
    onUpdate(label);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <EditLabelModalWrapper>
        <Box>
          <LabelFormWrapper>
            <LabelForm label={label} onUpdate={handleUpdate} onCancel={handleCancel} />
          </LabelFormWrapper>
        </Box>
      </EditLabelModalWrapper>
    </Modal>
  );
};

export default EditLabelModal;
