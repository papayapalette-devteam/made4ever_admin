import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProfileModal = ({ show, onHide, data }) => {
  if (!data) return null;

  
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header >
        <Modal.Title>Msp Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              {/* LEFT (IMAGE) */}
              <div className="col-md-4 text-center">
                <img
                  src={data.id?.[0]}
                  alt="profile"
                  className="img-fluid rounded"
                />
              </div>

              {/* RIGHT (DETAILS) */}
              <div className="col-md-8">
                <table className="table table-bordered">
                  <tbody>
                    <tr><th>Name</th><td>{data.name}</td></tr>
                    <tr><th>Email</th><td>{data.email}</td></tr>
                    <tr><th>Mobile</th><td>{data.mobile_number}</td></tr>
                    <tr><th>Address</th><td>{data.address}</td></tr>
                    <tr><th>Business Name</th><td>{data.registered_business_name}</td></tr>
                    <tr><th>Current Plan</th><td>{data.current_plan || "No Plan"}</td></tr>
                    <tr><th>Credits</th><td>{data.credits}</td></tr>
                    <tr><th>Valid Till</th><td>{data.subscription_valid_till || "N/A"}</td></tr>
                    <tr><th>Created At</th><td>{new Date(data.createdAt).toLocaleString()}</td></tr>
                    <tr><th>Updated At</th><td>{new Date(data.updatedAt).toLocaleString()}</td></tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
