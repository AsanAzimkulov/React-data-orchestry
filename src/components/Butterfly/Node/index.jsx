import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Delete';
import style from './index.module.scss';

const Node = (props) => {
  return (
    <div className={style['bf-node']}>
      <div className={style['bf-title']}>
        {props.onRemove && (
          <div>
            <IconButton onClick={props.onRemove}>
              <RemoveIcon />
            </IconButton>
          </div>
        )}
        {props.title}
        {props.onAdd && (
          <div>
            <IconButton onClick={props.onAdd}>
              <AddIcon />
            </IconButton>
          </div>
        )}
      </div>
      {props.children}
    </div>
  );
};

export default Node;
