import React, {useEffect, useRef, useState} from 'react';
import { API } from "../servises/api";
import './Form.css'
import {Link, Outlet} from "react-router-dom";

function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogged] = useState(false);
  const  [messages, setMessages] = useState([]);

  useEffect(() => {
    const userRequest = async () => {
      setLogged(false);
      setResult("");
      setError("");
      try {
        const user = await API.user.getCurrentUser();
        setResult(`Добро пожаловать, ${user.login}`);
        setLogged(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    userRequest();
  }, []);

  const handleLogout = () => {
    const logoutRequest = async () => {
      try {
        await API.auth.logout();
        setLogged(false);
        setResult("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    };
    logoutRequest();
  };

  return <>
  <div className="res">

    {result && <div>{result}</div>}
    {error && <div>{error}</div>}
    {isLogged && <button onClick={handleLogout}>Разлогиниться</button>}
  </div>
    <div className="forum">
    </div>

  </>;
}

export default Home;