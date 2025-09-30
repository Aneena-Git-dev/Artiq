import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext.jsx';
import { ArtworkProvider } from './context/ArtworkContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>          
      <GlobalProvider>
        <ArtworkProvider>
        <App />
        </ArtworkProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
