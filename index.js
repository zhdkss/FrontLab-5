import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './lib/i18n/config';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
