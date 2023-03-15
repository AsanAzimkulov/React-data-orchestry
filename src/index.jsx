import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import { theme } from './theme/index.js';

render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
