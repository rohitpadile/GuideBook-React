import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpToSignupEmail, verifySignupOtp, signupUser } from "../Services/userAccountApiService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/SignupCss.css"; // Import the CSS file

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState(""); // New state for retype password
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  // Password validation function
  const isPasswordValid = (password) => {
    const minLength = 10;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[~`!@#$%^&*()\-_+={}[\]|\\;:"<>,./?]/.test(password);
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      toast.error("Password does not meet the required criteria. Please correct it before proceeding.");
      return;
    }
    if (password !== retypePassword) {
      toast.error("Passwords do not match. Please retype your password.");
      return;
    }
    try {
      await sendOtpToSignupEmail(userEmail);
      toast.success("OTP sent successfully!");
      setOtpSent(true);
      setIsDisabled(true);
    } catch (error) {
      console.error("There was an error sending the OTP!", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifySignupOtp(userEmail, otp);
      toast.success("OTP verified successfully!");
      setIsOtpVerified(true);
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
      toast.error("Invalid OTP. Please check and try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isPasswordValid(password)) {
      toast.error("Password does not meet the required criteria. Please try again.");
      return;
    }
    try {
      await signupUser(userEmail, password);
      toast.success("Signup successful! Redirecting to login page...");
      setIsOtpVerified(false); // Reset state if needed
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 3 seconds
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error("There was an error signing up!", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={otpSent && isOtpVerified ? handleSignup : (otpSent ? handleVerifyOtp : handleSendOtp)}>
          <div className="form-group">
            <label>User Email</label>
            <input
              type="text"
              className="form-control"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              disabled={isDisabled}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isDisabled}
            />
            <small className="form-text text-muted">
              Password must be at least 10 characters long and include:
              <ul>
                <li>1 lower case letter [a-z]</li>
                <li>1 upper case letter [A-Z]</li>
                <li>1 numeric character [0-9]</li>
                <li>1 special character</li>
              </ul>
            </small>
          </div>
          <div className="form-group">
            <label>Retype Password</label>
            <input
              type="password"
              className="form-control"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
              disabled={isDisabled}
            />
          </div>
          {otpSent && (
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary btn-block mt-4"
          >
            {otpSent ? (isOtpVerified ? "Signup" : "Verify OTP") : "Send OTP"}
          </button>
          <div className="text-center mt-3">
            <button
              className="btn btn-link"
              onClick={() => navigate("/login")}
            >
              Login instead
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
