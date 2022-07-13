import styled from 'styled-components';

interface Props {
  display?: string;
}

const LabelListWrapper = styled.div`
  display: ${(props: Props) => props.display || 'flex'};

  .label-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    &_inline {
      display: inline-flex;
      line-height: 1;
    }

    &--item {
      width: auto;
      margin: 4px;
      color: hsl(0deg, 0%, calc(var(--lightness-switch) * 100%));
      border-radius: 24px;
    }
  }
`;

export default LabelListWrapper;
