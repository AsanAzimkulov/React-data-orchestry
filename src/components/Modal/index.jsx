import { Modal, Box, IconButton, useTheme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useRef } from 'react';
import CircleButton from '../CircleButton';
import style from './index.module.scss';

const BaseModal = ({ isOpen, onClose, children }) => {
  const theme = useTheme();

  const modalBoxStyles = {
    overflowY: 'scroll',
    height: '100vh',
    position: 'absolute',
    width: '100vw',
    top: 0,
    left: 0,
  };

  const modalBodyStyles = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    border: `2px solid ${theme.palette.accent.light}`,
    background: theme.palette.primary.main,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box style={modalBoxStyles}>
        <div className={style.body} style={modalBodyStyles}>
          <CircleButton
            onClick={onClose}
            color={theme.palette.primary.light}
            className={style.close}>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              style={{ position: 'absolute' }}>
              <path
                d='M0.507442 0.648742L0.573142 0.573142C0.687431 0.458826 0.83895 0.389321 1.00015 0.377264C1.16135 0.365207 1.32152 0.411399 1.45154 0.507442L1.52714 0.573142L6.00014 5.04524L10.4731 0.572242C10.5875 0.458061 10.7391 0.388722 10.9003 0.37683C11.0615 0.364939 11.2216 0.411284 11.3515 0.507442L11.4271 0.573142C11.5415 0.687431 11.611 0.83895 11.623 1.00015C11.6351 1.16135 11.5889 1.32152 11.4928 1.45154L11.4271 1.52714L6.95504 6.00014L11.428 10.4731C11.5422 10.5875 11.6116 10.7391 11.6235 10.9003C11.6353 11.0615 11.589 11.2216 11.4928 11.3515L11.4271 11.4271C11.3129 11.5415 11.1613 11.611 11.0001 11.623C10.8389 11.6351 10.6788 11.5889 10.5487 11.4928L10.4731 11.4271L6.00014 6.95504L1.52714 11.428C1.41274 11.5422 1.26116 11.6116 1.09997 11.6235C0.938772 11.6353 0.778661 11.589 0.648742 11.4928L0.573142 11.4271C0.458826 11.3129 0.389321 11.1613 0.377264 11.0001C0.365207 10.8389 0.411399 10.6788 0.507442 10.5487L0.573142 10.4731L5.04524 6.00014L0.572242 1.52714C0.458061 1.41274 0.388722 1.26116 0.37683 1.09997C0.364939 0.938772 0.411284 0.778661 0.507442 0.648742L0.573142 0.573142L0.507442 0.648742Z'
                fill='white'
                fill-opacity='0.7'
              />
            </svg>
          </CircleButton>
          {children}
        </div>
        <div className={style.scrollSpace}></div>
      </Box>
    </Modal>
  );
};

export default BaseModal;
