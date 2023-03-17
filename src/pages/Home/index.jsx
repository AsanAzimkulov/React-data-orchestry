import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Button, setRef, Typography, useTheme } from '@material-ui/core';

import FormItem from './../../components/FormItem';
import FormItems from './../../components/FormItems';
import style from './index.module.scss';
import { useDispatch } from 'react-redux';
import { changeSections } from '../../store/slices/sections';
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

  const [referenceSections, setReferenceSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [subnodes, setSubnodes] = useState([]);

  const onRemoveSection = (index) => {
    setActiveSection(0);
    setSubnodes((prev) => prev.filter((_, i) => index !== i));
    setReferenceSections((prev) =>
      prev
        .filter((_, i) => index !== i)
        .map((section, i) => {
          if (i === 0) {
            return { name: section.name, active: true };
          }
          return { name: section.name, active: false };
        }),
    );
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const onSelectSection = (index) => {
    setReferenceSections((prev) =>
      prev.map((item, i) => {
        if (index === i) {
          return { name: item.name, active: true };
        }
        return { name: item.name, active: false };
      }),
    );
    setActiveSection(index);
  };

  const onAddSection = (section) => {
    setReferenceSections((prev) => [...prev, section]);
    setSubnodes((prev) => [...prev, []]);
  };

  const onAddSubnode = (value) => {
    setSubnodes((prev) =>
      prev.map((x, i) => {
        if (i === activeSection) {
          return [...prev[activeSection], value];
        }
        return x;
      }),
    );
  };

  const onRemoveSubnode = (index) => {
    setSubnodes((prev) =>
      prev.map((x, i) => {
        if (activeSection == i) {
          return x.filter((_, ind) => ind != index);
        }

        return x;
      }),
    );
  };

  const saveSections = () => {
    dispatch(
      changeSections({
        reference: referenceSections.map(({ name }, id) => ({ name, options: {}, id })),
        block: 'reference',
      }),
    );

    dispatch(loadRawNodes(subnodes));

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
              onSelect={onSelectSection}
              onRemove={onRemoveSection}
              onAdd={onAddSection}
              items={referenceSections}
              setItems={onAddSection}
              defaultValue={'Справочник'}
            />
          </div>
          <div className={style['right']} style={columnStyle}>
            <Typography variant='h2' style={{ marginBottom: 17 }}>
              Основные разделы
            </Typography>
            <FormSubItems
              items={subnodes.length === 0 ? [] : subnodes[activeSection]}
              onAdd={onAddSubnode}
              onRemove={onRemoveSubnode}
              defaultValue={'Раздел'}
            />
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
