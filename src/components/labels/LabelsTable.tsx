import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { Label } from '../../types';
import LabelsTableItem from './LabelsTableItem';

interface Props {
  labels?: Label[];
  onEdit?: (id: number) => void;
  onDelete?: (id: string) => void;
}

const LabelsTable = ({ labels = [], onEdit, onDelete }: Props) => {
  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDelete = (name: string) => {
    if (onDelete) {
      onDelete(name);
    }
  };

  return (
    <TableContainer className="labels-table">
      {labels.length > 0 ? (
        <Table>
          <TableBody>
            {labels.map((label) => {
              return (
                <LabelsTableItem
                  key={label.id}
                  label={label}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h5">No labels has been found!</Typography>
      )}
    </TableContainer>
  );
};

export default LabelsTable;
