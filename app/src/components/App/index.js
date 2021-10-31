import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';

import defaultTheme from '../../assets/styles/theme/default';
import Header from '../Header';
import ContactsList from '../ContactsList';

import { Conatainer } from './styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Conatainer>
        <Header />
        <ContactsList />
      </Conatainer>
    </ThemeProvider>
  );
}

export default App;
