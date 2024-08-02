// // src/Components/TRLogin.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loginTRUser } from '../../Services/teamRecruiterApiService';

// const TRLogin = ({ setUser }) => {
//   const [form, setForm] = useState({
//     trUserFirstName: '',
//     trUserLastName: '',
//     trUserPassword: '',
//     trAdminPassword: ''
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await loginTRUser(form);
//       setUser(form);
//       navigate('/TRStudentApplicationForm');
//     } catch (err) {
//       setError('Invalid login credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input type="text" name="trUserFirstName" value={form.trUserFirstName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input type="text" name="trUserLastName" value={form.trUserLastName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="trUserPassword" value={form.trUserPassword} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Admin Password:</label>
//           <input type="password" name="trAdminPassword" value={form.trAdminPassword} onChange={handleChange} required />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default TRLogin;
