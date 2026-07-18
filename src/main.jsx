import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './local-ai.css';
import './connections.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
