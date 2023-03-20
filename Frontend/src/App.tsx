import { BrowserRouter, Route, Routes } from "react-router-dom"

import React, { useState } from 'react';
import './App.css';
import MainLayout  from "./components/MainLayout";
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import RecoveryDiary from './pages/RecoveryDiary';
import RecoveryDiaryDetail from './pages/RecoveryDiaryDetail';


function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
              {/* <Login/> */}
              <Route element={<MainLayout />}>
                {/* <Route path='/fundmain' element={<FundMain />} />
                <Route path='/funddetail' element={<FundDetail />} />
                <Route path='/fundpayment' element={<FundPayment />} /> */}
                <Route path='/' element={<HomePage/>}/>
                <Route path='/diary' element={<RecoveryDiary/>}/>
                <Route path='/diarydetail/??' element={<RecoveryDiaryDetail/>}/>
              </Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;

