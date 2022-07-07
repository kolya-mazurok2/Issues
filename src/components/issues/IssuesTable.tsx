import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Issue } from '../../types';
import IssueTableItem from './IssueTableItem';
import IssueTableItemWrapper from './IssueTableItemWrapper';

interface Props {
  issues: Issue[];
}

const IssuesTable = ({ issues }: Props) => {
  return issues.length ? (
    <TableContainer component={Paper} className="data-table data-table--primary">
      <Table>
        <TableBody>
          {issues.map((issue) => {
            return (
              <TableRow key={issue.id}>
                <TableCell scope="row">
                  <IssueTableItemWrapper>
                    <IssueTableItem item={issue} />
                  </IssueTableItemWrapper>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography variant="h5" align="center">
      No issues has been found!
    </Typography>
  );
};

export default IssuesTable;
