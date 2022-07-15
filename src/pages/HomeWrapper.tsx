import styled from 'styled-components';

const HomeWrapper = styled.div`
  .page--home {
    padding: 20px 0;

    .issue-filter {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      & > div {
        flex 1 0 auto;
        max-width: 100%;
        margin: 8px 12px;
      }
    }

    .counter {
      margin: 20px 0 0;
    }

    .pagination {
      display: flex;
      justify-content: center;
    }

    .issues-table {
      &--item {
        .main-info {
          & > div:first-child {
            width: 100%;

            & > div:first-child {
              width: calc(100% - 60px);
            }
          }

          & > div:last-child {
            margin-top: 4px;
          }
        }

        .issue-state-info {
          margin-top: 12px;
        }
      }
    }
  }
`;

export default HomeWrapper;
