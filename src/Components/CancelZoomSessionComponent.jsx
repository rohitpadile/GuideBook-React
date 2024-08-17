import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CancelZoomSessionComponentCss.css';
import { cancelZoomSession, checkCancellationStatus } from '../Services/zoomSessionService';
import { verifyUserWithZoomSessionFormId } from '../Services/paymentApiService';
import { checkLoginStatus } from '../Services/userAccountApiService';
import { decrypt } from '../Services/encryptionForZoomSessionCancel';
import auth from '../auth';

const CancelZoomSessionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);
  const [zoomSessionFormId, setZoomSessionFormId] = useState(null);

  useEffect(() => {
    const checkLoginStatusResponse = async () => {
      try {
        const token = auth.getToken();
        const response = await checkLoginStatus(token);
        if (response !== true && response !== 'true') {
          const redirectUrl = window.location.pathname;
          navigate(`/login`, { state: { redirectUrl } });
        }
      } catch (error) {
        console.error('Please login first', error);
        const redirectUrl = window.location.pathname;
        navigate(`/login`, { state: { redirectUrl } });
      }
    };

    const delayCheck = setTimeout(() => {
      checkLoginStatusResponse();
    }, 2000);

    return () => clearTimeout(delayCheck);
  }, [navigate]);

  useEffect(() => {
    const encryptedData = location.pathname.split('/').pop();
    const decryptedData = decrypt(encryptedData);

    if (decryptedData) {
      const { zoomSessionFormId } = decryptedData;
      setZoomSessionFormId(zoomSessionFormId);
    }
  }, [location.pathname]);

  useEffect(() => {
    const verifyUserAndCheckStatus = async () => {
      if (zoomSessionFormId) {
        try {
          // Verify user access
          const token = auth.getToken();
          const isUserVerified = await verifyUserWithZoomSessionFormId(zoomSessionFormId, token);

          if (isUserVerified === false) {
            setMessage('You do not have access to cancel this session.');
            setIsCancelDisabled(true);
            return;
          } else if (isUserVerified === null) {
            setMessage('An error occurred during verification. Please try again later.');
            setIsCancelDisabled(true);
            return;
          }

          // Check session cancellation status if user is verified
          const response = await checkCancellationStatus(zoomSessionFormId);
          if (response.status === 1) {
            setIsCancelDisabled(true);
            setMessage('This session has already been cancelled.');
          } else if (response.status === 2) {
            setIsCancelDisabled(true);
            setMessage('This session has already been booked.\nPlease note that we do not have refund policies for booked sessions.\nWe have twice confirmed the session from your side already. Thank you.');
          }

        } catch (error) {
          console.error('Error in verification or cancellation check:', error);
          setMessage('An error occurred while verifying the session or checking the status.');
          setIsCancelDisabled(true);
        }
      }
    };

    verifyUserAndCheckStatus();
  }, [zoomSessionFormId]);

  const handleCancelSession = async () => {
    const encryptedData = location.pathname.split('/').pop();
    const { zoomSessionFormId, studentWorkEmail } = decrypt(encryptedData);

    if (zoomSessionFormId && studentWorkEmail) {
      setIsCancelDisabled(true);
      try {
        await cancelZoomSession({ zoomSessionFormId, studentWorkEmail });
        setMessage('Your session has been successfully cancelled.');
      } catch (error) {
        console.error('Error cancelling the session:', error);
        setMessage('Failed to cancel the session. Please try again later.');
        setIsCancelDisabled(false); // Re-enable button if cancel fails
      }
    } else {
      setMessage('Invalid cancellation link.');
    }
  };

  return (
    <div className="cancel-zoom-session-component-container">
      <div className="card cancel-zoom-session-component-card">
        <div className="card-body cancel-zoom-session-component-card-body">
          <h1 className="card-title cancel-zoom-session-component-card-title">
            {message ? message : 'Are you sure you want to cancel your session?'}
          </h1>
          {!message && (
            <button
              className="btn btn-danger cancel-zoom-session-component-button"
              onClick={handleCancelSession}
              disabled={isCancelDisabled}
            >
              Cancel Session
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CancelZoomSessionComponent;
