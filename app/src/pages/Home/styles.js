import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 2.4rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;

    border: 0.2rem solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 0.4rem;

    padding: 0.8rem 1.6rem;

    transition: all 0.2s ease-in;

    &:hover {
      color: #fff;
      background: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const ListContainer = styled.header`
  margin-top: 2.4rem;

  > header {
    margin-bottom: 0.8rem;
    > button {
      display: flex;
      align-items: center;
      gap: 0.85rem;

      background: transparent;
      border: none;

      span {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
  }
`;

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

export const InputSearchContainer = styled.form`
  margin-top: 4.9rem;
  margin-bottom: 3.2rem;
  width: 100%;

  input {
    width: 100%;
    height: 5rem;

    border: none;
    border-radius: 2.5rem;
    background: white;

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    outline: none;
    padding: 0 1.6rem;

    ::placeholder {
      color: #bcbcbc;
    }
  }
`;
