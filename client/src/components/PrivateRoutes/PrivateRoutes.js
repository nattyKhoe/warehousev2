import React from "react";
import {Route, Navigate} from 'react-router-dom';

// function PrivateRoute ( {component: Component, isAuthenticated, onLogout, user}) {
//     return (
//         <Route
//         render={(props)=>
//             isAuthenticated
//             ? <Component {...props} onLogout={onLogout} user={user}/>
//             : <Navigate
//             to= {{
//                 pathname: '/login',
//                 state: {from: props.location},
//             }}
//             />
//         }
//         />
//     )
// };
// export default PrivateRoute;