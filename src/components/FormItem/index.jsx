import React, { useState } from 'react';
import { TextField, IconButton } from '@material-ui/core';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const FormItem = ({ value, pinned, onAdd, onRemove, index }) => {
  const [inputValue, setInputValue] = useState(value);
  return (
    <div className={styles.container}>
      <TextField
        id='outlined-basic'
        value={inputValue}
        onInput={(e) => {
          setInputValue(e.target.value);
        }}
        variant='outlined'
        disabled={pinned}
      />
      {pinned ? (
        <IconButton color='secondary' onClick={() => onRemove(index)}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton color='primary' onClick={() => onAdd(inputValue)}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
};

export default FormItem;
