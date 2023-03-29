import React from 'react';
import './App.css';
import Header from './components/header/Header';

import Login from './pages/Login';
import CustomerMyHome from './pages/CustomerMyHome';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header/>
      <Routes>
        <Route path='/mypage/*' element={<CustomerMyHome/>}/>
      </Routes>
  
    </div>
  );
}

export default App;
