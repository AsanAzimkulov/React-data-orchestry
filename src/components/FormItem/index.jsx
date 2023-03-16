import React, { useState } from 'react';
import { TextField, IconButton, Typography, useTheme, SvgIcon } from '@material-ui/core';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CircleButton from '../CircleButton';

const FormItem = ({ value, onRemove, index, active, onSelect }) => {
  const theme = useTheme();

  const handleClick = () => {
    if (!active) onSelect(index);
  };
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className={styles.container}>
      <div
        className={styles.text}
        onClick={handleClick}
        style={{
          backgroundColor: active
            ? theme.palette.secondary.main
            : theme.palette.primary.moreLighter,
        }}>
        <Typography variant={'body1'}>{value}</Typography>
      </div>
      <CircleButton onClick={() => onRemove(index)} color={theme.palette.primary.lighter}>
        <svg
          width='10'
          height='11'
          viewBox='0 0 10 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ position: 'absolute' }}>
          <path
            d='M0.117726 0.743326L0.176126 0.676126C0.277717 0.574512 0.4124 0.512729 0.555687 0.502012C0.698974 0.491295 0.84135 0.532355 0.956926 0.617726L1.02413 0.676126L5.00013 4.65133L8.97613 0.675326C9.07782 0.573832 9.21255 0.512197 9.35584 0.501627C9.49912 0.491057 9.64144 0.532253 9.75693 0.617726L9.82413 0.676126C9.92574 0.777717 9.98752 0.9124 9.99824 1.05569C10.009 1.19897 9.9679 1.34135 9.88253 1.45693L9.82413 1.52413L5.84893 5.50013L9.82493 9.47613C9.92642 9.57782 9.98806 9.71255 9.99863 9.85584C10.0092 9.99912 9.968 10.1414 9.88253 10.2569L9.82413 10.3241C9.72254 10.4257 9.58785 10.4875 9.44456 10.4982C9.30128 10.509 9.1589 10.4679 9.04333 10.3825L8.97613 10.3241L5.00013 6.34893L1.02413 10.3249C0.922435 10.4264 0.7877 10.4881 0.644416 10.4986C0.501131 10.5092 0.35881 10.468 0.243326 10.3825L0.176126 10.3241C0.074512 10.2225 0.0127295 10.0879 0.00201228 9.94456C-0.0087049 9.80128 0.032355 9.6589 0.117726 9.54333L0.176126 9.47613L4.15133 5.50013L0.175326 1.52413C0.0738318 1.42244 0.012197 1.2877 0.0016268 1.14442C-0.00894338 1.00113 0.0322528 0.85881 0.117726 0.743326L0.176126 0.676126L0.117726 0.743326V0.743326Z'
            fill='white'
            fill-opacity='0.6'
          />
        </svg>
        <svg
          width='10'
          height='11'
          viewBox='0 0 10 11'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{ position: 'absolute' }}>
          <path
            d='M0.117726 0.743326L0.176126 0.676126C0.277717 0.574512 0.4124 0.512729 0.555687 0.502012C0.698974 0.491295 0.84135 0.532355 0.956926 0.617726L1.02413 0.676126L5.00013 4.65133L8.97613 0.675326C9.07782 0.573832 9.21255 0.512197 9.35584 0.501627C9.49912 0.491057 9.64144 0.532253 9.75693 0.617726L9.82413 0.676126C9.92574 0.777717 9.98752 0.9124 9.99824 1.05569C10.009 1.19897 9.9679 1.34135 9.88253 1.45693L9.82413 1.52413L5.84893 5.50013L9.82493 9.47613C9.92642 9.57782 9.98806 9.71255 9.99863 9.85584C10.0092 9.99912 9.968 10.1414 9.88253 10.2569L9.82413 10.3241C9.72254 10.4257 9.58785 10.4875 9.44456 10.4982C9.30128 10.509 9.1589 10.4679 9.04333 10.3825L8.97613 10.3241L5.00013 6.34893L1.02413 10.3249C0.922435 10.4264 0.7877 10.4881 0.644416 10.4986C0.501131 10.5092 0.35881 10.468 0.243326 10.3825L0.176126 10.3241C0.074512 10.2225 0.0127295 10.0879 0.00201228 9.94456C-0.0087049 9.80128 0.032355 9.6589 0.117726 9.54333L0.176126 9.47613L4.15133 5.50013L0.175326 1.52413C0.0738318 1.42244 0.012197 1.2877 0.0016268 1.14442C-0.00894338 1.00113 0.0322528 0.85881 0.117726 0.743326L0.176126 0.676126L0.117726 0.743326V0.743326Z'
            fill='white'
            fill-opacity='0.6'
          />
        </svg>
      </CircleButton>
    </div>
  );
};

export default FormItem;
