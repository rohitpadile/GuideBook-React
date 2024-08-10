// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// // Custom Protected Route component
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

//     return (
//         <Route 
//             {...rest} 
//             render={(props) =>
//                 isLoggedIn ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to={{
//                         pathname: "/login",
//                         state: { from: props.location }
//                     }} />
//                 )
//             }
//         />
//     );
// }

// export default ProtectedRoute;
