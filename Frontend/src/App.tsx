import React from 'react';
import './App.css';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header/>
      {/* <Test/> */}
      <HomePage/>
    </div>
  );
}

export default App;

