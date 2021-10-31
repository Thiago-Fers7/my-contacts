import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 5.2rem;

  background: #fff;

  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.04);

  border: 0.2rem solid #fff;
  border-radius: 0.4rem;

  outline: none;

  padding: 0 1.6rem;

  transition: border-color 0.2s ease-in;

  :focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;
