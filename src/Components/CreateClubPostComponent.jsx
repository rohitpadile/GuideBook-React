import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateClubPostComponent = ({ show, handleClose, handleCreatePost }) => {
  const [postDescription, setPostDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('postDescription', postDescription);
    mediaFiles.forEach((file) => {
      formData.append('mediaFiles', file);
    });
    handleCreatePost(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postDescription">
            <Form.Label>Post Description</Form.Label>
            <Form.Control
              as="textarea"
              style={{ minHeight: '200px', maxHeight: '400px', resize: 'vertical' }}
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="mediaFiles">
            <Form.Label>Attach Media (Optional)</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateClubPostComponent;
