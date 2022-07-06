import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Item {
  id: number;
  title: string;
}

interface Props {
  items: Item[];
}

const DataTable = ({ items }: Props) => {
  return items.length ? (
    <TableContainer component={Paper} className="data-table data-table--primary">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell scope="row"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography variant="h5" align="center">
      No results has been found!
    </Typography>
  );
};

export default DataTable;
