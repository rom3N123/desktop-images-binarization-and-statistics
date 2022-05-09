import React from 'react';
import { ThemeProvider } from '@emotion/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import theme from './theme/theme';
import AppContextProvider from './contexts/AppContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</ThemeProvider>
	</BrowserRouter>
);
