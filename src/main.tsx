import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import { BookshelfProvider } from './context/BookshelfContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <BookshelfProvider>
        <App />
      </BookshelfProvider>
    </BrowserRouter>
  </React.StrictMode>
);
