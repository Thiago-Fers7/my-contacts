import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 56.25%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 50%;
    }
  }

  body {
    font-size: 1.6rem;
    background: ${({ theme }) => theme.colors.backgroundBody};
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  button {
    cursor: pointer;
  }
`;
