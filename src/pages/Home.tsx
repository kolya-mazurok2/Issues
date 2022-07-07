import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IssuesTableWrapper from '../components/issues/IssuesTableWrapper';
import IssuesTable from '../components/issues/IssuesTable';
import { AppDispatch, RootState } from '../store';
import { findIssues } from '../store/slices/issuesSlice';
import { Issue } from '../types';

const Home = () => {
  const issues = useSelector<RootState, Issue[]>((state) => state.issues.entities);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(findIssues());
  }, []);

  return (
    <Box className="page page--home">
      <Container maxWidth="lg">
        <Typography variant="h4" align="center">
          Issue list
        </Typography>

        <IssuesTableWrapper>
          <IssuesTable issues={issues} />
        </IssuesTableWrapper>
      </Container>
    </Box>
  );
};

export default Home;
