import styled from 'styled-components';

const AssigneeListWrapper = styled.div`
  .assignee-list {
    .MuiListItemAvatar-root {
      min-width: auto;
    }

    .MuiAvatar-root {
      width: 24px;
      height: 24px;
      margin: 0 0 0;
    }

    .assignee-list {
      padding: 0 !important;

      &--item {
        padding: 4px 0;
      }

      &--login {
        margin-left: 8px;
      }
    }
  }
`;

export default AssigneeListWrapper;
