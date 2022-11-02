import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudentsContextProvider } from './context/StudentsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StudentsContextProvider>
       <App />
     </StudentsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)