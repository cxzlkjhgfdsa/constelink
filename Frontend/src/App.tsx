import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from 'react';
import './App.css';
import MainLayout from "./components/MainLayout";
// import Header from './components/header/Header';
// import Login from './pages/Login';

// 병원 페이지
import HospitalPage from "./pages/HospitalPage";
import BenRegister from "./pages/BenRegister";
import FundRegister from "./pages/FundRegister";
import HosFundList from "./pages/HosFundList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Login/> */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/hospage' element={<HospitalPage />}/>
            <Route path='/benregi' element={<BenRegister />}/>
            <Route path='/hosfundlist' element={<HosFundList />} />
            <Route path='/fundregi' element={<FundRegister />}/>
          </Route>
        </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
