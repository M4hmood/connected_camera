import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {
  return (
    <div className='app_container'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;