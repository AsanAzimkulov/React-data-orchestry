import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, setRef, Typography, useTheme } from '@material-ui/core';

import FormItem from './../../components/FormItem';
import FormItems from './../../components/FormItems';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import FormSubItems from '../../components/FormSubItems';
import { loadRawNodes } from '../../store/slices/nodes';

const Home = () => {
  const theme = useTheme();

  const columnStyle = {
    background: theme.palette.primary.dark,
    border: `2px solid ${theme.palette.accent.main}`,
    padding: '20px',
    marginBottom: '22px',
  };

  const [guides, setGuides] = useState([]);
  const [sections, setSections] = useState([]);

  const onRemoveGuide = (index) => {
    setGuides((prev) => prev.filter((_, i) => i !== index));
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const onAddGuide = (name) => {
    setGuides((prev) => [...prev, name.length === 0 ? 'Справочник ' + (prev.length + 1) : name]);
  };

  const onAddSection = (name) => {
    setSections((prev) => [...prev, name.length === 0 ? 'Раздел ' + (prev.length + 1) : name]);
  };

  const onRemoveSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  function saveNodes() {
    dispatch(
      loadRawNodes([
        ...guides.map((guide) => ({ name: guide, type: 'guide' })),
        ...sections((section) => ({ name: section, type: 'section' })),
      ]),
    );
    setTimeout(() => history.push('/linking'), 300);
  }

  return (
    <div className={style['container']}>
      <Typography variant='h1' hidden>
        Создание справочников и разделов
      </Typography>
      <div className={style['wrapper']}>
        <div className={style['two-columns']}>
          <div className={style['left']} style={columnStyle}>
            <Typography variant='h2' style={{ marginBottom: 17 }}>
              Справочники
            </Typography>
            <FormItems
              onRemove={onRemoveSection}
              onAdd={onAddSection}
              items={guides}
              setItems={onAddSection}
            />
          </div>
          <div className={style['right']} style={columnStyle}>
            <Typography variant='h2' style={{ marginBottom: 17 }}>
              Основные разделы
            </Typography>
            <FormSubItems items={sections} onAdd={onAddSection} onRemove={onRemoveSection} />
          </div>
        </div>
        <Button onClick={saveNodes} style={{ marginLeft: 'auto', display: 'block' }}>
          К следующему шагу
        </Button>
      </div>
    </div>
  );
};

export default Home;
