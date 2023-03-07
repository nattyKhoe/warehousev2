import './App.css';
import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import InvoiceOutForm from './components/Invoice/Invoice';
import NotFound from './components/NotFound/NotFound';



function App() {
  const [user, setUser] = useState(null);

  //to save user in the system
  useEffect(()=>{
    fetch('/me')
    .then((res)=>{
      if (res.ok){
        res.json().then((user)=> {
          if (!user.error){
            setUser(user);
          }
          
        });
      }
    });
  }, [])//
  
  function handleLogin (user){
    setUser(user);
  }
  

  function handleLogout() {
    fetch('/logout',{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    .then(()=>{
      setUser(null);
    }).then(()=><Navigate to='/'/>);
    
  }

  return (
    <div>
    {console.log(user)}
    {user? <Header user={user} onLogout={handleLogout}/> : null }
    <Routes>
      <Route exact path='/'
      element={user? <Dashboard/> :<Login onLogin={handleLogin}/>}/>

      <Route exact path ='/invoiceouts/new'
        element={user? <InvoiceOutForm user={user}/>:<Login onLogin={handleLogin}/>} />

      <Route path='*' element={<NotFound/>}/>
    </Routes>

    
    </div>
    
  );
}

export default App;
