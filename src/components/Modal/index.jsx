import { Modal, Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
const modalBoxStyles = {
  position: 'absolute',
  top: '75%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BaseModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose} style={{ overflow: 'scroll' }}>
      <Box sx={modalBoxStyles}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  );
};

export default BaseModal;
