import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import ProjectDetailsPage from './components/ProjectDetailsPage/ProjectDetailsPage.tsx';
import './global-styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/project/:projectId' element={<ProjectDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
