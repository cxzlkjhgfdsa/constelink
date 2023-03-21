import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from 'react';
import './App.css';
import MainLayout from "./components/MainLayout";
// import Header from './components/header/Header';
import Login from './pages/Login';
import HospitalPage from "./pages/HospitalPage";
import BenRegister from "./pages/BenRegister";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Login/> */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path='/hospage' element={<HospitalPage />}/>
            <Route path='/benregi' element={<BenRegister />}/>
          </Route>
        </Routes>
      </div> 
    </BrowserRouter>
  );
}

export default App;
