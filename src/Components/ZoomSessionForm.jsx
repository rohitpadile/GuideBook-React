import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useParams } from 'react-router-dom';

const ZoomSessionForm = () => {
  const { studentName } = useParams(); // Get the student name from URL parameters
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientMiddleName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhoneNumber: '',
    clientAge: '',
    clientCollege: '',
    clientProofDoc: null,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreeTerms) { //IF CONDITION ON AGREE TERMS. THIS ONLY POP'S UP ONCE ////////
      // Handle form submission
      console.log(formData);
      setShowConfirmation(true);
      setShowTermsModal(false); // Hide terms modal if shown
    } else {
      // Show terms modal if terms are not agreed
      setShowTermsModal(true);
      setShowConfirmation(false); // Ensure confirmation modal is hidden
    }
  };

  const handleModalClose = () => {
    setShowConfirmation(false);
    setShowTermsModal(false);
    // Optionally, reset form data here if needed
  };

  return (
    <div className="container mt-5">
      <div className="card book-session-card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-header book-session-header text-center">
          <h4>Book a 1:1 Zoom Session</h4>
          <h4>{studentName}</h4> {/* Display student name */}
        </div>
        <div className="card-body book-session-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="clientFirstName" className="col-sm-4 col-form-label">First Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientFirstName"
                  name="clientFirstName"
                  value={formData.clientFirstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientMiddleName" className="col-sm-4 col-form-label">Middle Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientMiddleName"
                  name="clientMiddleName"
                  value={formData.clientMiddleName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientLastName" className="col-sm-4 col-form-label">Last Name</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientLastName"
                  name="clientLastName"
                  value={formData.clientLastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientEmail" className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="clientEmail"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientPhoneNumber" className="col-sm-4 col-form-label">Phone Number</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientPhoneNumber"
                  name="clientPhoneNumber"
                  value={formData.clientPhoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientAge" className="col-sm-4 col-form-label">Age</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="clientAge"
                  name="clientAge"
                  value={formData.clientAge}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientCollege" className="col-sm-4 col-form-label">College</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="clientCollege"
                  name="clientCollege"
                  value={formData.clientCollege}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="clientProofDoc" className="col-sm-4 col-form-label">Proof Document</label>
              <div className="col-sm-8">
                <input
                  type="file"
                  className="form-control"
                  id="clientProofDoc"
                  name="clientProofDoc"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-12 text-center">
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Terms and Conditions */}
      {showTermsModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Terms and Conditions</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h6>Terms of Service</h6>
                <ul>
                  <li>Session timings may vary.</li>
                  <li>We reserve the right to cancel sessions.</li>
                </ul>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeTermsCheckbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />
                  <label className="form-check-label" htmlFor="agreeTermsCheckbox">I agree to all terms and conditions</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Book Session</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Confirmation */}
      {showConfirmation && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>We will right away contact <strong>{formData.clientFirstName} {formData.clientLastName}</strong>. You will be notified via Email about the Session confirmation and its timing.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTermsModal && <div className="modal-backdrop fade show"></div>}
      {showConfirmation && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ZoomSessionForm;
