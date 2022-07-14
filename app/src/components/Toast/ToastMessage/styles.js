import styled, { css } from 'styled-components';

const containerVariants = {
  success: css`
    background-color: ${({ theme }) => theme.colors.secondary.success.main};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
    `,
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
};

export const Container = styled.div`
  padding: 1.6rem 3.2rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0px 20px 20px -16px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  cursor: pointer;

  width: min-content;
  white-space: nowrap;
  margin: 0 auto;

  ${({ type }) => containerVariants[type] || containerVariants.default}

  & + & {
    margin-top: 1.2rem;
  }
`;
