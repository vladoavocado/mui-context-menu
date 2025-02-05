import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './global-styles';
import { Main } from './components';
import { Layout } from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{}} />
      <CssBaseline />
      <Layout>
        <Main />
      </Layout>
    </ThemeProvider>
  );
}

const rootNode = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(rootNode);

const render = () => {
  root.render(<App />);

  return root;
};

render();
