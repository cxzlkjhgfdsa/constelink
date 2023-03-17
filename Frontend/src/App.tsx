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

export default App;

