import React from 'react';
import Home from '../pages/Home';
import HomeWrapper from '../pages/HomeWrapper';
import NewIssue from '../pages/issues/NewIssue';
import { Navigate } from 'react-router-dom';
import Issue from '../pages/issues/Issue';
import NotFound from '../pages/NotFound';
import NotFoundWrapper from '../pages/NotFoundWrapper';
import { PATH_HOME, PATH_ISSUES, PATH_ISSUES_NEW, PATH_LABELS, PATH_NOT_FOUND } from './pathes';
import IssueWrapper from '../pages/issues/IssueWrapper';
import NewIssueWrapper from '../pages/issues/NewIssueWrapper';
import Labels from '../pages/labels/Labels';
import LabelsWrapper from '../pages/labels/LabelsWrapper';

interface IAppRoutes {
  path: string;
  element: React.ReactNode;
}

const appRoutes: Array<IAppRoutes> = [
  {
    path: PATH_HOME,
    element: (
      <HomeWrapper>
        <Home />
      </HomeWrapper>
    ),
  },
  {
    path: PATH_ISSUES,
    element: <Navigate to="/" />,
  },
  {
    path: `${PATH_ISSUES}:id`,
    element: (
      <IssueWrapper>
        <Issue />
      </IssueWrapper>
    ),
  },
  {
    path: PATH_ISSUES_NEW,
    element: (
      <NewIssueWrapper>
        <NewIssue />
      </NewIssueWrapper>
    ),
  },
  {
    path: PATH_LABELS,
    element: (
      <LabelsWrapper>
        <Labels />
      </LabelsWrapper>
    ),
  },
  {
    path: PATH_NOT_FOUND,
    element: (
      <NotFoundWrapper>
        <NotFound />
      </NotFoundWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/not-found" />,
  },
];

export { appRoutes };
