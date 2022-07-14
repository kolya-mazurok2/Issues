import { Button, TableCell, TableRow } from '@mui/material';
import { Label } from '../../types';

interface Props {
  label: Label;
  onEdit?: (id: number) => void;
  onDelete?: (name: string) => void;
}

const LabelsTableItem = ({ label, onEdit, onDelete }: Props) => {
  return (
    <TableRow>
      <TableCell>{label.name}</TableCell>

      <TableCell>{label.description}</TableCell>

      <TableCell>
        {onEdit && <Button onClick={() => onEdit(label.id)}>Edit</Button>}

        {onDelete && <Button onClick={() => onDelete(label.name)}>Delete</Button>}
      </TableCell>
    </TableRow>
  );
};

export default LabelsTableItem;
