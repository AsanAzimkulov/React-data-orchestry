import { styled, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import FormItem from '../FormItem';
import FormSubItem from '../FormSubItem';
import { SmallButton } from '../SmallButton';
import style from './index.module.scss';

const FormSubItems = ({ items, onAdd, onRemove, defaultValue }) => {
  const [value, setValue] = useState('');

  const handleAdd = (value) => {
    onAdd(value || defaultValue + ' ' + (items.length + 1));
    setValue('');
  };

  return (
    <>
      <div className={style.inputWrapper}>
        <TextField
          placeholder='Введите название'
          value={value}
          onInput={(e) => setValue(e.target.value)}
          style={{ marginRight: 12 }}
        />
        <SmallButton onClick={() => handleAdd(value.trim())}>Добавить</SmallButton>
      </div>
      {items.map((sectionName, index) => (
        <FormSubItem
          value={sectionName}
          onRemove={(index) => onRemove(index)}
          index={index}
          key={Math.random()}
        />
      ))}
    </>
  );
};

export default FormSubItems;
