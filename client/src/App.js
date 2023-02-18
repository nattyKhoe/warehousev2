import './App.css';
import React, {useEffect, useState} from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  //setup mock user first
  const usermock = {
    first_name: "Nat",
    last_name: "admin",
    username: "NatKhoe",
    account_type:"admin",
    date_of_birth: "29/12/1993",
  }
  const [activePage, setActivePage] = useState(null);

  //to save user in the system
  useEffect(()=>{
    fetch('/me')
    .then((res)=>{
      if (res.ok){
        res.json().then((user)=> {
          setLoggedIn(true);
          setUser(user);
        });
      }
    });
  }, [])
  
  function handleLogin (user){
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
    setLoggedIn(false)
  }

  return (
    <div>
      {loggedIn
        ? <Dashboard user={usermock} onLogout={handleLogout}/>
        : <Login onLogin={handleLogin}/>
      }
    </div>
  );
}

export default App;
