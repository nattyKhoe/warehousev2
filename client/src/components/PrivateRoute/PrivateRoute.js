import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({component, loggedIn}){
    return loggedIn ? component : <Navigate to="/"/>
    // <Route {...rest} render={(props) => (
    //     LoggedIn === true
    //     ? <Component {...props} />
    //     : <Navigate to="/login"/>
    // )} />
};

// function PrivateRoute ({component:Component, loggedIn, ...rest}){
//     return(
//     <Route {...rest} render={(props) => (
//         loggedIn
//         ? <Component {...props} />
//         : <Navigate to="/login"/>
//     )} />
//     );
// };

export default PrivateRoute;