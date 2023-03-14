import React, { useState } from 'react';
import FormItem from '../FormItem';

const FormItems = ({ defaultValue, items, setItems }) => {
  const onAddLeft = (value) => {
    setItems((prev) => [...prev, value]);
  };
  const onRemoveLeft = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      {items.map((sectionName, index) => (
        <FormItem
          value={sectionName}
          pinned={index !== 0}
          onAdd={onAddLeft}
          onRemove={onRemoveLeft}
          index={index}
          key={Math.random()}
        />
      ))}
    </>
  );
};

export default FormItems;
