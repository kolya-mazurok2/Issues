import { Grid, ScopedCssBaseline } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import IssueStatus from '../../components/issues/IssueStatus';
import { AppDispatch, RootState } from '../../store';
import {
  findIssue,
  updateIssueAssignees,
  updateIssueLabels,
  updateIssueState,
  updateIssueTitle,
} from '../../store/slices/issuesSlice';
import { Assignee, Issue as IIssue, Label, State } from '../../types';
import Description from '../../components/Description';
import IssueSidebar from '../../components/issues/IssueSidebar';
import { findAssignees } from '../../store/slices/assigneesSlice';
import { findLabels } from '../../store/slices/labelsSlice';
import { PATH_NOT_FOUND } from '../../routing/pathes';
import EditableTitle from '../../components/EditableTitle';

const Issue = () => {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const [pageLoaded, setPageLoaded] = useState(false);

  const issue = useSelector<RootState, IIssue | null>((state) => state.issues.entity);
  const assignees = useSelector<RootState, Assignee[]>((state) => state.assignees.entities);
  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);

  useEffect(() => {
    const loadPageData = async (id: number) => {
      await Promise.all([
        dispatch(findIssue(id)),
        dispatch(findAssignees()),
        dispatch(findLabels()),
      ]);

      setPageLoaded(true);
    };

    if (params.id) {
      loadPageData(Number(params.id));
    }
  }, []);

  const handleAssigneesChange = (assignees: string[]) => {
    dispatch(
      updateIssueAssignees({
        id: Number(params.id),
        assignees: assignees,
      })
    );
  };

  const handleLabelsChange = (labels: string[]) => {
    dispatch(
      updateIssueLabels({
        id: Number(params.id),
        labels: labels,
      })
    );
  };

  const handleStateChange = (state: State) => {
    dispatch(updateIssueState({ id: Number(params.id), state: state }));
  };

  const handleTitleChange = (title: string) => {
    dispatch(
      updateIssueTitle({
        id: Number(params.id),
        title,
      })
    );
  };

  return (
    <Box className="page page--issue-single">
      <Container maxWidth="lg">
        {pageLoaded && issue && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="section section--hero">
                <EditableTitle title={issue.title} onChange={handleTitleChange} />

                <IssueStatus
                  status={issue.state}
                  authorName={issue.user.login}
                  closedBy={issue.closed_by && issue.closed_by.login}
                  createdAt={issue.created_at}
                  closedAt={issue.closed_at}
                />
              </div>

              <ScopedCssBaseline />
            </Grid>

            <Grid item xs={12} md={8}>
              <div className="section section--main">
                <Description description={issue.body} />
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <IssueSidebar
                issue={issue}
                assignees={assignees}
                labels={labels}
                onAssigneesChange={handleAssigneesChange}
                onLabelsChange={handleLabelsChange}
                onStateChange={handleStateChange}
              />
            </Grid>
          </Grid>
        )}

        {pageLoaded && !issue && <Navigate to={PATH_NOT_FOUND} />}
      </Container>
    </Box>
  );
};

export default Issue;
