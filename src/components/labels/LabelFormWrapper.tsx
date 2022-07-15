import styled from 'styled-components';

const LabelFormWrapper = styled.div`
  .label-form {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .label-form > div {
    margin-left: 20px;
  }

  .label-form > div:first-child {
    margin-left: 0;
  }

  .label-form .react-colorful {
    position: absolute;
    top: 56px;
    left: 0;
  }
`;

export default LabelFormWrapper;
