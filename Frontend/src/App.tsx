import React from 'react';
import './App.css';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import RecoveryDiary from './pages/RecoveryDiary';
import RecoveryDiaryDetail from './pages/RecoveryDiaryDetail';


function App() {
  return (
    <div className="App">

      {/* <Login/> */}
      {/* <RecoveryDiary/> */}
      {/* <Login/> */}
      <Header/>
      <RecoveryDiaryDetail/>
    </div>
  );
}

export default App;

