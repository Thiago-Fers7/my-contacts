import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  width: 100%;
  height: 5.2rem;
  padding: 0 1.6rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 0.4rem;
  outline: none;

  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.04);

  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;

  transition: background 0.2s ease-in;

  :hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  :active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  :disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  ${({ danger, theme }) => danger && css`
    background: ${theme.colors.danger.main};

    :hover {
      background: ${theme.colors.danger.light};
    }

    :active {
      background: ${theme.colors.danger.dark};
    }
  `}
`;
