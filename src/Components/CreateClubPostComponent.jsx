import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { uploadMediaFiles, createClubPost } from '../Services/apiServiceAdmin'; // Adjust the import path as necessary

const CreateClubPostComponent = ({ show, handleClose, clubName, handleCreatePost }) => {
  const [postDescription, setPostDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload media files
      const mediaPaths = await uploadMediaFiles(mediaFiles, clubName);

      // Create club post
      const newPost = await createClubPost(clubName, postDescription, mediaPaths);

      // Pass the created post to the parent component
      handleCreatePost(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
