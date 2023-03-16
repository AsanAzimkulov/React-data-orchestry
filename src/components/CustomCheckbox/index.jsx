import { Checkbox, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
    padding: 0,
    paddingRight: 10,
  },
}));


const CustomCheckbox = (props) => {
  const classes = useStyles();
  return (
    <Checkbox
      classes={{ root: classes.root }}
      checkedIcon={
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <rect width='20' height='20' rx='4' fill='#2390DF' />
          <rect
            x='0.5'
            y='0.5'
            width='19'
            height='19'
            rx='3.5'
            stroke='white'
            stroke-opacity='0.2'
          />
          <path
            d='M7.36578 13.4303L4.52103 10.5855C4.37958 10.4489 4.19013 10.3733 3.99348 10.375C3.79684 10.3767 3.60873 10.4556 3.46967 10.5947C3.33061 10.7337 3.25174 10.9218 3.25003 11.1185C3.24832 11.3151 3.32392 11.5046 3.46053 11.646L6.83553 15.021C6.97618 15.1616 7.16691 15.2406 7.36578 15.2406C7.56466 15.2406 7.75539 15.1616 7.89603 15.021L16.146 6.77103C16.2827 6.62958 16.3582 6.44013 16.3565 6.24348C16.3548 6.04684 16.276 5.85873 16.1369 5.71967C15.9978 5.58061 15.8097 5.50174 15.6131 5.50003C15.4164 5.49832 15.227 5.57392 15.0855 5.71053L7.36578 13.4303Z'
            fill='white'
          />
        </svg>
      }
      icon={
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <rect x='0.5' y='0.5' width='19' height='19' rx='3.5' fill='#0F1015' stroke='#57585B' />
        </svg>
      }
      {...props}
    />
  );
};

export default CustomCheckbox;
