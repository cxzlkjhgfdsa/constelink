<<<<<<< HEAD
import { Route, Routes } from "react-router-dom"
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import MainLayout from "./components/MainLayout";
// import Header from './components/header/Header';
// import Login from './pages/Login';

// 병원 페이지
import HospitalPage from "./pages/HospitalPage";
import BenRegister from "./pages/BenRegister";
import FundRegister from "./pages/FundRegister";
import HosBenList from "./pages/HosBenList";
import HosFundList from "./pages/HosFundList";
import NoticePage from './pages/NoticePage';
import CustomerMyHome from './pages/CustomerMyHome';

import RecoveryDiary from './pages/RecoveryDiary';
import RecoveryDiaryDetail from './pages/RecoveryDiaryDetail';

function App() {
  return (
      <div className="App">
       
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/hospage' element={<HospitalPage />}/>
            <Route path='/benregi' element={<BenRegister />}/>
            <Route path='/fundregi' element={<FundRegister />}/>
            <Route path='/hosbenlist' element={<HosBenList />}/>
            <Route path='/hosfundlist' element={<HosFundList />}/>
            <Route path="/notice/*" element={<NoticePage/>}/>
            <Route path="/mypage/*" element={<CustomerMyHome/>}/>
            <Route path='/diary' element={<RecoveryDiary/>}/>
            <Route path='/diarydetail/:id' element={<RecoveryDiaryDetail/>}/>
          </Route >
         
           <Route path='/login' element={<Login />}/>
        </Routes>
      </div> 
  )}
=======
import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from 'react';
import './App.css';
import MainLayout  from "./components/MainLayout";
// import Header from './components/header/Header';
import Login from './pages/Login';
import FundMain from './pages/FundMain';
import FundDetail from "./pages/FundDetail";
import FundPayment from "./pages/FundPayment";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
              {/* <Login/> */}
              <Route element={<MainLayout />}>
                <Route path='/fundmain' element={<FundMain />} />
                <Route path='/funddetail' element={<FundDetail />} />
                <Route path='/fundpayment' element={<FundPayment />} />
              </Route>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

>>>>>>> feature-front/fund-main
export default App;

