import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button } from '@material-ui/core';

import FormItem from './../../components/FormItem';
import FormItems from './../../components/FormItems';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { changeSections } from '../../store/slices/sections';

const Home = () => {
  const [referenceSections, setReferenceSections] = useState(['Название раздела']);
  const [mainSections, setMainSections] = useState(['Название раздела']);
  const dispatch = useDispatch();
  const history = useHistory();

  const saveSections = () => {
    dispatch(
      changeSections({
        reference: referenceSections.slice(1).map((name, id) => ({ name, options: {}, id })),
        block: 'reference',
      }),
    );

    setTimeout(() => history.push('/linking'), 300);
  };
  return (
    <div className={style['container']}>
      <h2 className={style['title']}>Создание Разделов</h2>
      <div className={style['wrapper']}>
        <div className={style['left']}>
          <h3 className={style['subtitle']}>Справочные</h3>
          <FormItems items={referenceSections} setItems={setReferenceSections} />
        </div>
        <div className={style['right']}>
          <h3 className={style['subtitle']}>Основные</h3>
          <FormItems items={mainSections} setItems={setMainSections} />
        </div>
      </div>
      <Button variant='contained' color='primary' onClick={saveSections}>
        {/* <Link to='/linking' style={{ textDecoration: 'none', color: 'inherit' }}> */}
        Следующая страница
        {/* </Link> */}
      </Button>
    </div>
  );
};

export default Home;
