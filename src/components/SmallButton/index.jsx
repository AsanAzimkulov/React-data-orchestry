import { Button, useTheme, withStyles } from '@material-ui/core';
import React from 'react';

const SmallButton = withStyles({
  root: {
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '17px',
  },
})(Button);

const SmallButtonWide = withStyles({
  root: {
    padding: '10px 31px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '17px',
  },
})(Button);

export { SmallButton, SmallButtonWide };
