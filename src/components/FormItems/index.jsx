import { styled, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import FormItem from '../FormItem';
import { SmallButton } from '../SmallButton';
import style from './index.module.scss';

const FormItems = ({ items, setItems, defaultValue, onRemove, onSelect, onAdd }) => {
  const [value, setValue] = useState('');

  const handleAdd = (value) => {
    onAdd({
      name: value || defaultValue + ' ' + (items.length + 1),
      active: items.length === 0 ? true : false,
    });

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
      {items.map(({ name, active }, index) => (
        <FormItem
          active={active}
          value={name}
          onSelect={onSelect}
          onRemove={onRemove}
          index={index}
          key={Math.random()}
        />
      ))}
    </>
  );
};

export default FormItems;
