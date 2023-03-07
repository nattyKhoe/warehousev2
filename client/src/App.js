import './App.css';
import React, {useEffect, useState} from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import InvoiceOutForm from './components/Invoice/Invoice';



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
      {/* <Route exact path='/logout'
      element={<Logout handleLogin={handleLogin}/>} /> */}
      {/* <Route exact path='' */}
      {/* element={loggedIn ?<Dashboard user={user} onLogout={handleLogout}/> :<Login onLogin={handleLogin}/>}/> */}
      {/* <Route index exact path='/' element={
          <PrivateRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout}/>
          </PrivateRoute>
      }/>  */}
    </Routes>

    {/* <BrowserRouter>
      
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
        {/* <Route path='/dashboard' element={
          <PrivateRoute loggedIn={loggedIn}>
            <Dashboard user={user} onLogout={handleLogout}/>
          </PrivateRoute>
        }/> 
      </Routes>
    </BrowserRouter> */}
    </div>
      
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
    // <div>
    //   {loggedIn
    //     ? <Dashboard user={user} onLogout={handleLogout}/>
    //     : <Login onLogin={handleLogin}/>
    //   }
    //   {/* {loggedIn
    //   ? (<Routes>
    //             <Route exact path="/invoiceouts/new">
    //                 <InvoiceInForm user={user}/>
    //             </Route>
    //             <Route exact path="/">
    //                 <Dashboard/>
    //             </Route>
    //   </Routes>)
    //   :<Login onLogin={handleLogin}/>} */}
    // </div>
  );
}

export default App;
