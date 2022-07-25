import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditLabelModal from '../../components/labels/EditLabelModal';
import LabelsTable from '../../components/labels/LabelsTable';
import NewLabel from '../../components/labels/NewLabel';
import { AppDispatch, RootState } from '../../store';
import {
  createLabel,
  deleteLabel,
  findLabels,
  setActiveEntity,
  updateLabel,
} from '../../store/slices/labelsSlice';
import { Label, NewLabel as INewLabel } from '../../types';

const Labels = () => {
  const dispatch = useDispatch<AppDispatch>();

  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);
  const label = useSelector<RootState, Label | undefined | null>((state) => state.labels.entity);
  const activeLabel = useSelector<RootState, Label | undefined>(
    (state) => state.labels.activeEntity
  );

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (label: INewLabel) => {
    dispatch(
      createLabel({
        ...label,
        color: label.color.substring(1),
      })
    );
  };

  const handleUpdate = (label: Label) => {
    const [oldName] = labels.filter((item) => item.id === label.id);

    dispatch(
      updateLabel({
        name: oldName.name,
        label: {
          ...label,
          color: label.color.substring(1),
        },
      })
    );

    setModalOpen(false);
  };

  const handleEdit = (id: number) => {
    const [activeLabel] = labels.filter((label) => label.id === id);

    dispatch(setActiveEntity(activeLabel));
    setModalOpen(true);
  };

  const handleDelete = (name: string) => {
    dispatch(deleteLabel(name));
  };

  useEffect(() => {
    dispatch(findLabels());
  }, [label]);

  return (
    <Box className="page page--labels">
      <Container maxWidth="lg">
        <NewLabel onCreate={handleCreate} />

        <LabelsTable labels={labels} onEdit={handleEdit} onDelete={handleDelete} />

        <EditLabelModal
          label={activeLabel}
          onUpdate={handleUpdate}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default Labels;
