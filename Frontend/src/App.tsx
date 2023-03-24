import { Route, Routes } from "react-router-dom"
import React, { useState } from 'react';
import './App.css';
// import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import RecoveryDiary from './pages/RecoveryDiary';
import RecoveryDiaryDetail from './pages/RecoveryDiaryDetail';
import LoginTestPage from './pages/LoginTestPage';

 {/* <Header/> */}
function App() {
  return (
        <div className="App">
        {/* <Header /> */}
          <Routes>
              {/* <Login/> */}
              {/* <Route path='/fundmain' element={<FundMain />} />
              <Route path='/funddetail' element={<FundDetail />} />
              <Route path='/fundpayment' element={<FundPayment />} /> */}
              <Route path="/login" element={<Login/>} />
              <Route path="/donate" element={ <LoginTestPage/>} />
              <Route path='/' element={<HomePage/>}/>
              <Route path='/diary' element={<RecoveryDiary/>}/>
              <Route path='/diarydetail/:index' element={<RecoveryDiaryDetail/>}/>
          </Routes>
        </div>
  );
}

export default App;

