import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as BufferModule from 'buffer';

window.Buffer = BufferModule.Buffer;

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Element dengan id "root" tidak ditemukan.');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  console.log('App dirender');
}
