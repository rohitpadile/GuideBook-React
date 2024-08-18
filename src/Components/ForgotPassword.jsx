import React, { useState } from "react";
import { forgotPassword } from "../Services/userAccountApiService"; // API service for forgot password
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/ForgotPasswordCss.css"; // Import the new CSS file
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
        Swal.fire({
            title: 'Processing',
            text: 'Please do not refresh the page while we process your request.',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
      await forgotPassword(email);
      Swal.fire('Success', 'Password reset link sent to your email.', 'success');
    } catch (error) {
    Swal.fire('Error', 'Failed to send reset link. Please try again.', 'error');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="forgot-password-form-group">
            <label className="forgot-password-label">Email</label>
            <input
              type="email"
              className="forgot-password-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="forgot-password-btn">
            Send Reset Link
          </button>
        </form>
      </div>
      <ToastContainer className="forgot-password-toast-container" />
    </div>
  );
}

export default ForgotPassword;
