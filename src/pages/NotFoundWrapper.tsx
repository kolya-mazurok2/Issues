import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  .page--not-found {
    .MuiContainer-root {
      height: calc(100vh - 64px);
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
`;

export default NotFoundWrapper;
