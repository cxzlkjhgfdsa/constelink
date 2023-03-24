import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './pages/Login';
import {Routes, Route} from 'react-router-dom';
import LoginTestPage from './pages/LoginTestPage';

 {/* <Header/> */}
function App() {
  return (
    <div className="App">
  
       <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/donate" element={ <LoginTestPage/>} />
        </Routes>

       
      {/* <Login/> */}
  
    </div>
  );
}

export default App;
