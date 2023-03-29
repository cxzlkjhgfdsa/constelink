import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import { Provider } from 'react-redux';
import store from './store/index';
import {BrowserRouter} from 'react-router-dom'
=======
import {BrowserRouter} from 'react-router-dom';

>>>>>>> feature-front/notice
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<<<<<<< HEAD
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
=======
  <BrowserRouter>
    <App />
    </BrowserRouter>
);

>>>>>>> feature-front/notice
