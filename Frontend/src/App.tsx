import React from 'react';
import './App.css';
import Header from './components/header/Header';
import ParentComponent from './components/modal/Modal';
import CustomerMyPage from './pages/CustomerMyPage';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header/>
      {/* <ParentComponent/> */}
      {/* <CustomerMyPage/> */}
    </div>
  );
}

export default App;
