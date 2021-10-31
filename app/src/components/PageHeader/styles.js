import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2.4rem;

  a {
    display: flex;
    align-items: center;

    text-decoration: none;
    gap: .8rem;

    margin-bottom: .8rem;

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 2.4rem;
  }
`;
