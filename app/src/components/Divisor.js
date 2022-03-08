import styled from 'styled-components';

export default styled.hr`
  background: ${({ theme }) => theme.colors.gray[100]};
  height: 2px;
  border: none;
  margin-top: ${({ marginY }) => marginY};
  margin-bottom: ${({ marginY }) => marginY};
`;
