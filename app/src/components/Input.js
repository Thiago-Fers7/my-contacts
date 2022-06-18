import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  height: 5.2rem;

  background: #fff;

  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.04);

  border: 0.2rem solid #fff;
  border-radius: 0.4rem;

  outline: none;

  padding: 0 1.6rem;

  transition: border-color 0.2s ease-in;

  appearance: none;

  :focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}

  &[disabled] {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};;
  }
`;
