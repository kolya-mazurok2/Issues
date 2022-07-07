import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IssuesTableWrapper from '../components/issues/IssuesTableWrapper';
import IssuesTable from '../components/issues/IssuesTable';
import { AppDispatch, RootState } from '../store';
import { findIssues } from '../store/slices/issuesSlice';
import { Assignee, Issue, Label } from '../types';
import IssuesFilter from '../components/issues/IssuesFilter';
import { findAssignees } from '../store/slices/assigneesSlice';
import { findLabels } from '../store/slices/labelsSlice';

interface FilterCriteriasState {
  creator: string;
  labels: string;
  assignee: string;
}

const Home = () => {
  const issues = useSelector<RootState, Issue[]>((state) => state.issues.entities);
  const assignees = useSelector<RootState, Assignee[]>((state) => state.assignees.entities);
  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);
  const dispatch = useDispatch<AppDispatch>();

  const [filterCriterias, setFilterCriterias] = useState<FilterCriteriasState>({
    creator: '',
    labels: '',
    assignee: '',
  });

  const handleAuthorChange = (author: string) => {
    setFilterCriterias({ ...filterCriterias, creator: author });
  };

  const handleLabelsChange = (labels: string[]) => {
    setFilterCriterias({ ...filterCriterias, labels: labels.join() });
  };

  const handleAssigneeChange = (assignee: string) => {
    setFilterCriterias({ ...filterCriterias, assignee });
  };

  useEffect(() => {
    dispatch(findAssignees());
    dispatch(findLabels());
  }, []);

  useEffect(() => {
    console.log('criteria changed');
    dispatch(findIssues({ ...filterCriterias }));
  }, [filterCriterias]);

  return (
    <Box className="page page--home">
      <Container maxWidth="lg">
        <IssuesFilter
          assignees={assignees}
          labels={labels}
          onAuthorChange={handleAuthorChange}
          onLabelsChange={handleLabelsChange}
          onAssigneeChange={handleAssigneeChange}
        />

        <IssuesTableWrapper>
          <IssuesTable issues={issues} />
        </IssuesTableWrapper>
      </Container>
    </Box>
  );
};

export default Home;
