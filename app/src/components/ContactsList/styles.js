import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  box-shadow: 0 4px 10px #0000000a;
  padding: 1.6rem;
  border-radius: 0.4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 1.6rem;
  }

  div.info {
    > div {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 0.4rem;
        border-radius: 0.4rem;
      }
    }

    span {
      display: block;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  div.actions {
    display: flex;
    align-items: center;
    gap: .8rem;

    button {
      background: transparent;
      border: none;
    }
  }
`;
