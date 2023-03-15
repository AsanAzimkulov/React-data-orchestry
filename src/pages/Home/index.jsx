import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, Typography, useTheme } from '@material-ui/core';

import FormItem from './../../components/FormItem';
import FormItems from './../../components/FormItems';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { changeSections } from '../../store/slices/sections';

const Home = () => {
  const theme = useTheme();

  const columnStyle = {
    background: theme.palette.primary.dark,
    border: `2px solid ${theme.palette.accent.main}`,
    padding: '20px',
    marginBottom: '22px',
  };

  const [referenceSections, setReferenceSections] = useState([]);
  const [mainSections, setMainSections] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const saveSections = () => {
    dispatch(
      changeSections({
        reference: referenceSections.map((name, id) => ({ name, options: {}, id })),
        block: 'reference',
      }),
    );

    setTimeout(() => history.push('/linking'), 300);
  };
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
              items={referenceSections}
              setItems={setReferenceSections}
              defaultValue={'Справочник'}
            />
          </div>
          <div className={style['right']} style={columnStyle}>
            <Typography variant='h2' style={{ marginBottom: 17 }}>
              Основные разделы
            </Typography>
            <FormItems items={mainSections} setItems={setMainSections} defaultValue={'Раздел'} />
          </div>
        </div>
        <Button onClick={saveSections} style={{ marginLeft: 'auto', display: 'block' }}>
          К следующему шагу
        </Button>
      </div>
    </div>
  );
};

export default Home;
