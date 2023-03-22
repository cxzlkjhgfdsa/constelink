import React from 'react';
import './App.css';
import Header from './components/header/Header';

import Login from './pages/Login';
import CustomerMyHome from './pages/CustomerMyHome';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Header/>
      <CustomerMyHome/>
    </div>
  );
}

export default App;
