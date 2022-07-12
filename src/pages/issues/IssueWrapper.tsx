import styled from 'styled-components';

const IssueWrapper = styled.div`
  .page--issue-single {
    padding: 20px 0 0;

    .section--hero {
      padding: 12px 0;
    }

    .issue-state-info {
      margin-top: 8px;
    }

    .MuiScopedCssBaseline-root {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.87);
    }

    .section--main {
      margin-top: 20px;
    }

    .MuiFormControl-root {
      width: 100%;
    }

    .MuiInputLabel-root {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      max-width: 100%;
      margin-top: 12px;
      position: relative;
      transform: none;
      pointer-events: all;

      h6,
      svg {
        cursor: pointer;
      }
    }

    .title-edit {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      &--item {
        &:first-child {
          width: calc(100% - 200px);
        }
      }
    }
  }
`;

export default IssueWrapper;
