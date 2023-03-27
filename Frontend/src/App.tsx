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
      {/* <Login/> */}
      <Header/>

      <Routes>
        <Route path="/notice" element={<NoticePage/>}/>
        <Route path="/notice/:id" element={<NoticeDetail/>}/>
        <Route path="/notice/:id/edit" element={<NoticeEdit/>}/>
      </Routes>
      {/* <NoticePage/> */}
    </div>
  );
}

export default App;
