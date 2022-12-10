import React from 'react';
import {
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Home from "./views/Home";
import Layout from "./views/Layout";
import LoginView from "./views/LoginView";
import RegistrationView from "./views/RegistrationView";
import LongPulling from "./views/LongPulling";

function App() {
  return <>

    <div className="route">

      <Routes >
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginView/>} />
          <Route path='/registration' element={<RegistrationView/>} />
          <Route path='/message' element={<LongPulling/>}/>

        </Route>
      </Routes>

    </div>

  </>;
}

export default App;
