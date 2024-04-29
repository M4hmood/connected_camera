import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Sidebar from './components/sidebar/sidebar';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtcdHZURmNdWEx+WEA=");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sidebar />
    <App />
  </React.StrictMode>
);
