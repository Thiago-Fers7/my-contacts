import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};

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

      img {
        height: 1.7rem;
        transition: 0.2s;

        transform: ${({ orderBy }) => (orderBy === 'asc' && 'rotate(180deg)')};
      }
    }
  }
`;

export const EmptyListContainer = styled.div`
  img {
    height: 7.7rem;
    width: 11rem;
    display: block;
    margin: 0 auto;
  }

  p {
    margin-top: 0.8rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main}
    }
  }
`;

export const InputSearchContainer = styled.div`
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

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;

  strong {
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.danger.main};
    display: block;
  }

  button {
    margin-top: 0.8rem;
    width: min-content;
  }

  & > img {
    height: 8.4rem;
    width: 8.4rem;
  }
`;

export const SearchNotFoundContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;

  span {
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
