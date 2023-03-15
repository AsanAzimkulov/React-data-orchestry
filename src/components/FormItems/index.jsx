import { styled, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import FormItem from '../FormItem';
import { SmallButton } from '../SmallButton';
import style from './index.module.scss';

const FormItems = ({ items, setItems, defaultValue }) => {
  const [value, setValue] = useState('');
  const onAddLeft = (value) => {
    setItems((prev) => [...prev, value || defaultValue + ' ' + (items.length + 1)]);
    setValue('');
  };
  const onRemoveLeft = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
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
        <SmallButton onClick={() => onAddLeft(value.trim())}>Добавить</SmallButton>
      </div>
      {items.map((sectionName, index) => (
        <FormItem value={sectionName} onRemove={onRemoveLeft} index={index} key={Math.random()} />
      ))}
    </>
  );
};

export default FormItems;
