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

    .editable-title {
      .title {
        display: flex;
        flex-wrap: wrap;

        h4 {
          flex: 1 0 calc(100% - 100px);
        }

        button {
          flex: 1 0 80px;
        }
      }

      .title-edit {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        & > div:first-child {
          flex: 1 0 calc(100% - 200px);
        }

        & > div:last-child {
          flex: 1 0 200px;
          justify-content: end;
        }
      }
    }

    .sidebar {
      .MuiScopedCssBaseline-root {
        margin: 20px 0;
      }
    }
  }
`;

export default IssueWrapper;
