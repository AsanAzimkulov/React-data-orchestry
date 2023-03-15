import React from 'react';
import { IconButton } from '@material-ui/core';

const CircleButton = ({ color, onClick, children, className }) => {
  return (
    <IconButton
      className={className}
      style={{
        width: '28px',
        height: '28px',
        position: 'relative',
        backgroundColor: color,
      }}
      sx={{
        '&& .MuiTouchRipple-rippleVisible': {
          animationDuration: '100ms',
        },
      }}
      onClick={() => setTimeout(() => onClick(), 150)}>
      {children}
    </IconButton>
  );
};

export default CircleButton;
