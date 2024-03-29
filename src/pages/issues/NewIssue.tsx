import { Box, Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewIssueForm from '../../components/issues/NewIssueForm';
import { PATH_HOME } from '../../routing/pathes';
import { AppDispatch, RootState } from '../../store';
import { findAssignees } from '../../store/slices/assigneesSlice';
import { createNewIssue } from '../../store/slices/issuesSlice';
import { findLabels } from '../../store/slices/labelsSlice';
import { Assignee, Label, NewIssue as INewIssue } from '../../types';

const NewIssue = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const assignees = useSelector<RootState, Assignee[]>((state) => state.assignees.entities);
  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);

  const handleSubmit = async (newIssue: INewIssue) => {
    await Promise.resolve([dispatch(createNewIssue(newIssue))]);

    navigate(PATH_HOME, { replace: true });
  };

  useEffect(() => {
    Promise.all([dispatch(findAssignees()), dispatch(findLabels())]);
  }, []);

  return (
    <Box className="page page--new-issue">
      <Container maxWidth="lg">
        <NewIssueForm assignees={assignees} labels={labels} onSubmit={handleSubmit} />
      </Container>
    </Box>
  );
};

export default NewIssue;
