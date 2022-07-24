import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);

  display: grid;
  place-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 45rem;

  background: #fff;
  border-radius: .4rem;
  padding: 2.4rem;

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

  > h1 {
    font-size: 2.4rem;
    color: ${({ theme, danger }) => (danger ? (
    theme.colors.danger.main
  ) : (
    theme.colors.gray[900]
  ))};
  }

  .modal-body {
    margin-top: 3.2rem;
  }
`;

export const Footer = styled.div`
  margin-top: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;

  button {
    :first-child {
      background: transparent;
      border: none;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.gray[200]};
    }

    :last-child {
      width: min-content;
      padding: 0 1.6rem;
    }
  }
`;
