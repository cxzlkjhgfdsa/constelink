import { Route, Routes } from "react-router-dom"

import React from 'react';
import './App.css';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainLayout from "./components/MainLayout";
// import Header from './components/header/Header';
// import Login from './pages/Login';

// 병원 페이지
import HospitalPage from "./pages/HospitalPage";
import BenRegister from "./pages/BenRegister";
import FundRegister from "./pages/FundRegister";
import HosFundList from "./pages/HosFundList";
import NoticePage from './pages/NoticePage';

import NoticeDetail from './pages/NoticeDetail';
import NoticeEdit from './pages/NoticeEdit';
import CustomerMyPage from "./pages/CustomerMyPage";
import CustomerMyHome from './pages/CustomerMyHome';

function App() {
  return (
      <div className="App">
       
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/hospage' element={<HospitalPage />}/>
            <Route path='/benregi' element={<BenRegister />}/>
            <Route path='/hosfundlist' element={<HosFundList />} />
            <Route path="/notice/*" element={<NoticePage/>}/>
            <Route path='/fundregi' element={<FundRegister />}/>
            <Route path="/mypage/*" element={<CustomerMyHome/>}/>
          </Route >
         
           <Route path='/login' element={<Login />}/>
        </Routes>
      </div> 



  )}
export default App;

