// // src/Components/PrivateRoute.js
// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { UserContext } from '../../Context/UserContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const { user } = useContext(UserContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default PrivateRoute;
