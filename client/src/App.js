import './App.css';
import React, {useEffect, useState} from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [activePage, setActivePage] = useState(null);

  //to save user in the system
  useEffect(()=>{
    fetch('/me')
    .then((res)=>{
      if (res.ok){
        res.json().then((user)=> {
          setLoggedIn(true)
          setUser(user.first_name);
          setAccount(user.account_type);
        });
      }
    });
  }, [])
  
  function handleLogin (user){
    setUser(user.first_name);
    setAccount(user.account_type);
  }

  function handleLogout() {
    setUser(null);
    setLoggedIn(false)
  }

  return (
    <div>
      {loggedIn
        ? <Dashboard user="Nat" />
        : <Login onLogin={handleLogin}/>
      }
    </div>
  );
}

export default App;
