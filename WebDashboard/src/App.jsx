import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Footer from './components/footer/footer'; 
import Dashboard from './components/dashboard/dashboard';

function App() {

  return (
    <div className="app_container">
      <h1>ESP32-cam dashboard</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/home" exact element={<Dashboard/>} />
          <Route path="/dashboard" exact element={<Dashboard/>} />
          <Route path="/notifications" exact element={<Dashboard/>} />
          <Route path="/profile" exact element={<Dashboard/>} />
          <Route path="/signin" exact element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;