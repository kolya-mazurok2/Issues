import styled from 'styled-components';

const NewIssueWrapper = styled.div`
  .page--new-issue {
    padding: 20px 0 0;

    .new-issue-form {
      & > .MuiFormControl-root {
        margin-top: 20px;

        &:first-child {
          margin-top: 0;
        }
      }

      button[type='submit'] {
        margin-top: 20px;
      }

      .form-control--labels {
        .MuiFormGroup-root {
          flex-direction: row;
        }
      }
    }
  }
`;

export default NewIssueWrapper;
