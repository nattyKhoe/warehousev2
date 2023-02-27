import React, { useState } from 'react';
import styles from './styles.css';
import logo from '../../others/logo.png'

function Login({onLogin}){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        response.json().then((user) => onLogin(user));
      }
      if (!response.ok) {
        const errorData = response.json();
        throw new Error(errorData.message);
      }
    })
    .catch(error=>{
      setError(error.message);
    });
    };

    return (
        <div className='container'>
          <img src={logo} alt="company-logo"/>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="Username">Username:</label>
              <input type="username" id="username" name="username" value={username} onChange={handleUsernameChange} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            </div>
            {error && <div>{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
  };



export default Login