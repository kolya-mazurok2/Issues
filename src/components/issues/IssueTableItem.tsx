import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { PATH_ISSUES } from '../../routing/pathes';
import { Issue } from '../../types';
import AssigneeAvatarList from '../assignees/AssigneeAvatarList';
import FlexContainer from '../FlexContainer';
import LabelList from '../labels/LabelList';
import LabelListWrapper from '../labels/LabelListWrapper';
import IssueStatus from './IssueStatus';

interface Props {
  item: Issue;
}

const IssueTableItem = ({ item }: Props) => {
  return (
    <div className="issues-table--item">
      <Box className="main-info">
        <FlexContainer>
          <Typography variant="subtitle1">
            <Link href={`${PATH_ISSUES}${item.number}`}>{item.title}</Link>
          </Typography>

          {item.assignees.length > 0 && <AssigneeAvatarList assignees={item.assignees} />}
        </FlexContainer>

        <LabelListWrapper display="inline">
          <LabelList labels={item.labels} className="label-list label-list_inline" />
        </LabelListWrapper>
      </Box>
      <IssueStatus
        status={item.state}
        number={item.number}
        authorName={item.user ? item.user.login : undefined}
        closedBy={item.closed_by && item.closed_by.login}
        createdAt={item.created_at}
        closedAt={item.closed_at}
      />
    </div>
  );
};

export default IssueTableItem;
