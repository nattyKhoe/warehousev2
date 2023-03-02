import './App.css';
import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //setup mock user first
  // const usermock = {
  //   first_name: "Nat",
  //   last_name: "admin",
  //   username: "NatKhoe",
  //   account_type:"admin",
  //   date_of_birth: "29/12/1993",
  // }
  const [activePage, setActivePage] = useState(null);

  //to save user in the system
  useEffect(()=>{
    fetch('/me')
    .then((res)=>{
      if (res.ok){
        res.json().then((user)=> {
          setUser(user);
        });
      }
    });
  }, [loggedIn])
  
  function handleLogin(user){
    setLoggedIn(true);
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
    setLoggedIn(false);
    fetch('/logout',{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
  }

  return (
    // <Routes>
    //   <Route exact path ='/login'>
    //     <Login onLogin={handleLogin}/>
    //   </Route>
    //   <PrivateRoute
    //     exact path ='/dashboard'
    //     component={Dashboard}
    //     isAuthenticated={loggedIn}
    //     onLogout={handleLogout}
    //     user={user}
    //     />
    // </Routes>
    <div>
      {loggedIn
        ? <Dashboard user={user} onLogout={handleLogout}/>
        : <Login onLogin={handleLogin}/>
      }
      {/* {loggedIn
      ? (<Routes>
                <Route exact path="/invoiceouts/new">
                    <InvoiceInForm user={user}/>
                </Route>
                <Route exact path="/">
                    <Dashboard/>
                </Route>
      </Routes>)
      :<Login onLogin={handleLogin}/>} */}
    </div>
  );
}

export default App;
