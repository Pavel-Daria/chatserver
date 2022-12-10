import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './Form.css'

const Layout = () => {
  return <>
    <div id = "wrap">
    <header>
      <div className="title">Простой чат</div>
      <nav>
        <ul className="menu">
          <li>
            <Link className="linka" to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/message">Чат</Link>
          </li>

        </ul>
      </nav>
      <Outlet />
    </header>
    </div>

  </>;
};

export default Layout;