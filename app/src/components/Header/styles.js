import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 7.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 20rem;
  }
`;

export const InputSearchContainer = styled.form`
  margin-top: 4.9rem;
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
