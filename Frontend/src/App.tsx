import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './pages/Login';
import RecoveryDiary from './pages/RecoveryDiary';

function App() {
  return (
    <div className="App">
      <Login/>
      <RecoveryDiary/>
      {/* <Login/> */}
      <Header/>

    </div>
  );
}

export default App;
