import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CancelZoomSessionComponentCss.css';
import { cancelZoomSession,checkCancellationStatus } from '../Services/zoomSessionService';
import { decrypt } from '../Services/encryptionForZoomSessionCancel';

const CancelZoomSessionComponent = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);

  useEffect(() => {
    const encryptedData = location.pathname.split('/').pop();
    const { zoomSessionFormId } = decrypt(encryptedData);

    if (zoomSessionFormId) {
      checkCancellationStatus(zoomSessionFormId).then((response) => {
        // console.log(response.status);
        if (response.status === 1) {
          setIsCancelDisabled(true);
          setMessage('This session has already been cancelled.');
        }
      });
    }
  }, [location.pathname]);

  const handleCancelSession = () => {
    const encryptedData = location.pathname.split('/').pop();
    const { zoomSessionFormId, studentWorkEmail } = decrypt(encryptedData);

    // console.log('Form ID:', zoomSessionFormId);
    // console.log('Student Work Email:', studentWorkEmail);

    if (zoomSessionFormId && studentWorkEmail) {
      setIsCancelDisabled(true);
      cancelZoomSession({ zoomSessionFormId, studentWorkEmail })
        .then(() => setMessage('Your session has been successfully cancelled.'))
        .catch(() => {
          setMessage('Failed to cancel the session. Please try again later.');
          setIsCancelDisabled(false); // Re-enable button if cancel fails
        });
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
