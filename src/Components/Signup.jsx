import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/SignupCss.css"; // Import the CSS file

function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/user/sendOtpToSignupEmail", {
        userEmail: userEmail,
      });
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
      await axios.post("http://localhost:8080/api/v1/user/verifySignupOtp", {
        userEmail: userEmail,
        signupOtp: otp,
      });
      toast.success("OTP verified successfully!");
      setIsOtpVerified(true);
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
      toast.error("Invalid OTP. Please check and try again.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Add signup logic here
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
