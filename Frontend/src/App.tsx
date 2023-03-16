import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Login from './pages/Login';
import NoticePage from './pages/NoticePage';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header/>
      <NoticePage/>
    </div>
  );
}

export default App;
