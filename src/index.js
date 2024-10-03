import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles.css'; // Importowanie stylów, jeśli je dodasz

const root = createRoot(document.getElementById('root'));
root.render(<App />);