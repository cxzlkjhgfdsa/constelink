import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './pages/Login';
import NoticePage from './pages/NoticePage';
import {Routes, Route} from "react-router-dom";
import NoticeDetail from './pages/NoticeDetail';
import NoticeEdit from './pages/NoticeEdit';

function App() {
  return (
    <div className="App">
  
      <Header/>
      <Routes>
        <Route path="/notice/*" element={<NoticePage/>}/>
      </Routes>
 
    </div>
  );
}

export default App;
