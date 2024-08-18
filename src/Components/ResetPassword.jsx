import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../Services/userAccountApiService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/ResetPasswordCss.css"; // Import the CSS file
import Swal from "sweetalert2";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    try {
        Swal.fire({
            title: 'Processing',
            text: 'Please do not refresh the page while we reset your password.',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
      await resetPassword(token, password);
      Swal.fire('Success', 'Password reset successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
        Swal.fire('Error', 'Failed to reset password. Please try again.', 'error');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="reset-password-form-group">
            <label className="reset-password-label">New Password</label>
            <input
              type="password"
              className="reset-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="reset-password-form-group">
            <label className="reset-password-label">Confirm Password</label>
            <input
              type="password"
              className="reset-password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-password-btn">
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer className="reset-password-toast-container" />
    </div>
  );
}

export default ResetPassword;
