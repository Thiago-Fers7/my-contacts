import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 1.6rem;
  }

  small {
    display: block;
    margin-top: .8rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.danger.main};
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      right: 1.6rem;
      top: 1.8rem;
    }
  }
`;
