import { Box, Pagination, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IssuesTableWrapper from '../components/issues/IssuesTableWrapper';
import IssuesTable from '../components/issues/IssuesTable';
import { AppDispatch, RootState } from '../store';
import { findIssuesComplex } from '../store/slices/issuesSlice';
import { Assignee, Issue, Label, State } from '../types';
import IssuesFilter from '../components/issues/IssuesFilter';
import { findAssignees } from '../store/slices/assigneesSlice';
import { findLabels } from '../store/slices/labelsSlice';

interface FilterCriteriasState {
  state: State;
  creator: string;
  labels: string;
  assignee: string;
}

const Home = () => {
  const issues = useSelector<RootState, Issue[]>((state) => state.issues.entities);
  const totalIssues = useSelector<RootState, number>((state) => state.issues.totalEntities);
  const assignees = useSelector<RootState, Assignee[]>((state) => state.assignees.entities);
  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);
  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const perPage = 5;

  const totalPages = useMemo(() => {
    return Math.ceil(totalIssues / perPage);
  }, [totalIssues]);

  const [filterCriterias, setFilterCriterias] = useState<FilterCriteriasState>({
    state: 'open',
    creator: '',
    labels: '',
    assignee: '',
  });

  const handleStateChange = (state: State) => {
    setFilterCriterias({ ...filterCriterias, state: state });
  };

  const handleAuthorChange = (author: string) => {
    setFilterCriterias({ ...filterCriterias, creator: author });
  };

  const handleLabelsChange = (labels: string[]) => {
    setFilterCriterias({ ...filterCriterias, labels: labels.join() });
  };

  const handleAssigneeChange = (assignee: string) => {
    setFilterCriterias({ ...filterCriterias, assignee });
  };

  const pageChangeHandler = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(findAssignees());
    dispatch(findLabels());
  }, []);

  useEffect(() => {
    dispatch(findIssuesComplex({ ...filterCriterias, page, per_page: perPage }));
  }, [filterCriterias, page]);

  return (
    <Box className="page page--home">
      <Container maxWidth="lg">
        <IssuesFilter
          assignees={assignees}
          labels={labels}
          onStateChange={handleStateChange}
          onAuthorChange={handleAuthorChange}
          onLabelsChange={handleLabelsChange}
          onAssigneeChange={handleAssigneeChange}
        />

        <Typography variant="h5" className="counter">
          Total issues: {totalIssues}
        </Typography>

        <IssuesTableWrapper>
          <IssuesTable issues={issues} />
        </IssuesTableWrapper>

        {totalPages > 1 && (
          <Pagination
            className="pagination"
            count={totalPages}
            onChange={(event, page) => {
              pageChangeHandler(page);
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default Home;
