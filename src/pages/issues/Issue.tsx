import { Button, FormControl, Grid, ScopedCssBaseline, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import IssueStatus from '../../components/issues/IssueStatus';
import PrefixedNumber from '../../components/PrefixedNumber';
import { AppDispatch, RootState } from '../../store';
import {
  findIssue,
  updateIssueAssignees,
  updateIssueLabels,
  updateIssueTitle,
} from '../../store/slices/issuesSlice';
import { Assignee, Issue as IIssue, Label } from '../../types';
import IssueDescription from '../../components/issues/IssueDescription';
import IssueSidebar from '../../components/issues/IssueSidebar';
import { findAssignees } from '../../store/slices/assigneesSlice';
import { findLabels } from '../../store/slices/labelsSlice';
import { PATH_NOT_FOUND } from '../../routing/pathes';
import FlexContainer from '../../components/FlexContainer';

const Issue = () => {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const [pageLoaded, setPageLoaded] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const issue = useSelector<RootState, IIssue | null>((state) => state.issues.entity);
  const assignees = useSelector<RootState, Assignee[]>((state) => state.assignees.entities);
  const labels = useSelector<RootState, Label[]>((state) => state.labels.entities);

  const handleClickTitleEdit = () => {
    setEditTitle(true);
  };

  const handleClickTitleDiscard = () => {
    setEditTitle(false);
  };

  const handleClickTitleUpdate = () => {
    if (newTitle.length === 0) {
      setTitleHasError(true);
      return;
    }

    if (newTitle !== issue?.title) {
      dispatch(updateIssueTitle({ id: Number(params.id), title: newTitle }));
    }

    setEditTitle(false);
  };

  useEffect(() => {
    if (params.id) {
      Promise.all([
        dispatch(findIssue(Number(params.id))),
        dispatch(findAssignees()),
        dispatch(findLabels()),
      ]).then(() => {
        setPageLoaded(true);
      });
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

  return (
    <Box className="page page--issue-single">
      <Container maxWidth="lg">
        {!pageLoaded ? (
          <p>Loading...</p>
        ) : issue ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="section section--hero">
                  <FlexContainer>
                    {editTitle ? (
                      <FormControl fullWidth className="title-edit">
                        <div className="title-edit--item">
                          <TextField
                            type="text"
                            defaultValue={issue.title}
                            error={titleHasError}
                            onChange={(event) => {
                              setNewTitle(event.currentTarget.value);
                            }}
                          />
                        </div>

                        <div className="title-edit--item">
                          <Button
                            variant="outlined"
                            color="warning"
                            onClick={handleClickTitleDiscard}
                          >
                            Discard
                          </Button>

                          <Button
                            variant="outlined"
                            color="success"
                            onClick={handleClickTitleUpdate}
                          >
                            Save
                          </Button>
                        </div>
                      </FormControl>
                    ) : (
                      <>
                        <div>
                          <Typography variant="h4">
                            {issue.title} <PrefixedNumber number={issue.number} />
                          </Typography>
                        </div>

                        <div>
                          <Button variant="outlined" onClick={handleClickTitleEdit}>
                            Edit
                          </Button>

                          <Button variant="outlined" color="success">
                            New Issue
                          </Button>
                        </div>
                      </>
                    )}
                  </FlexContainer>

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

              <Grid item xs={8}>
                <div className="section section--main">
                  <IssueDescription description={issue.body} />
                </div>
              </Grid>

              <Grid item xs={4}>
                <IssueSidebar
                  issue={issue}
                  assignees={assignees}
                  labels={labels}
                  onAssigneesChange={handleAssigneesChange}
                  onLabelsChange={handleLabelsChange}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Navigate to={PATH_NOT_FOUND} />
        )}
      </Container>
    </Box>
  );
};

export default Issue;
