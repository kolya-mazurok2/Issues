import styled from 'styled-components';

const LabelListWrapper = styled.div`
  .label-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    &--item {
      width: auto;
      margin: 4px;
      color: hsl(0deg, 0%, calc(var(--lightness-switch) * 100%));
      border-radius: 24px;
    }
  }
`;

export default LabelListWrapper;
