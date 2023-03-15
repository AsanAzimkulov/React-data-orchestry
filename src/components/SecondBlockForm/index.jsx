import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { selectSecondNodes } from '../../store/slices/nodes/selectors';
import { INITIAL_FIRST_NODES } from '../../store/slices/nodes';

const SecondBlockForm = ({
  activeSubNodeInfo = { variant: 'second', id: null, subNodeIndex: null },
  onSubmit,
}) => {
  const initialCheckboxes = [
    { value: 'Обязательно или нет', checked: false },
    { value: 'Уникальное', checked: false },
    { value: 'Показывать в таблице', checked: false },
    { value: 'Редактируемое поле в таблице', checked: false },
    { value: 'Скрытое', checked: false },
    { value: 'Не добавлять во вью', checked: false },
    { value: 'Модуль карты', checked: false },
    { value: 'Пустышка', checked: false },
    { value: 'Автопополнение справочника', checked: false },
    { value: 'Динамическая форма в справочник', checked: false },
    { value: 'Подсказка из бд', checked: false },
    { value: 'Исключить из эскпорта', checked: false },
  ];
  const selectValues = [
    'Текст',
    'Связь со справочником',
    'Связь со справочником (теги)',
    'Связь со справочником тегами (Свободный ввод)',
    'Тэги свободный ввод,',
    'Дата',
    'Дата и время',
    'Выпадающий список',
    'Номер',
    'Файл',
    'Dropzone',
    'Большое текстовое поле',
    'Большое текстовое поле с тегами',
    'Большое текстовое поле с тегами (без редактора)',
    'Чекбокс',
    'Мультиполе',
    'GANTA',
    'Одиночное фото',
    'Динамическая форма',
    'Цвет',
    'Кнопочный список',
  ];

  const nodes = useSelector(selectSecondNodes);

  const activeSubNode =
    nodes[activeSubNodeInfo.id - INITIAL_FIRST_NODES].data.content[
      activeSubNodeInfo.subNodeIndex
    ] || {};

  const [selectFieldType, setSelectFieldType] = useState(
    activeSubNode.fieldType || selectValues[0],
  );

  const [name, setName] = useState(activeSubNode.content || '');

  const [nameEng, setNameEng] = useState(activeSubNode.nameEng || '');

  const [checkboxes, setCheckboxes] = useState(
    activeSubNode.checkboxes ? activeSubNode.checkboxes : initialCheckboxes,
  );

  const [selectDimension, setSelectDimension] = useState(activeSubNode.dimension || 1);
  const dimensions = new Array(12).fill(null).map((_, i) => i + 1);

  return (
    <>
      <Typography variant='h3' component='h3'>
        Настройки:
      </Typography>
      <TextField
        label='Наименование'
        value={name}
        onInput={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label='Наименование на Английском'
        value={nameEng}
        onInput={(e) => setNameEng(e.target.value)}
        fullWidth
        style={{
          marginBottom: '20px',
        }}
      />
      <div
        className={style.dropdown}
        style={{
          marginBottom: '20px',
        }}>
        <FormControl fullWidth>
          <InputLabel id='second-block-form-dropdown'>Тип поля</InputLabel>
          <Select
            labelId='second-block-form-dropdown'
            id='second-block-form-select'
            value={selectFieldType}
            label={'Тип поля'}
            onChange={(e) => setSelectFieldType(e.target.value)}>
            {selectValues.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.dropdownNumber}>
        {' '}
        <FormControl fullWidth>
          <InputLabel id='second-block-form-dropdown-number'>
            Размер на форме (от 1 до 12)
          </InputLabel>
          <Select
            labelId='second-block-form-dropdown-number'
            id='second-block-form-select'
            value={selectDimension}
            label={'Размер на форме (от 1 до 12)'}
            onChange={(e) => setSelectDimension(e.target.value)}>
            {dimensions.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={style.checkboxes}>
        {checkboxes.map(({ value, checked }, index) => (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  label={value}
                  checked={checked}
                  onChange={({ target }) =>
                    setCheckboxes((prev) =>
                      prev.map((item, id) => {
                        if (id === index) {
                          return { value, checked: target.checked };
                        }
                        return item;
                      }),
                    )
                  }
                />
              }
              label={value}
            />
          </FormGroup>
        ))}
      </div>
      <Button
        onClick={() =>
          onSubmit(
            activeSubNodeInfo.id,
            activeSubNodeInfo.subNodeIndex,
            activeSubNodeInfo.variant,
            name,
            nameEng,
            selectFieldType,
            selectDimension,
            checkboxes,
          )
        }>
        Применить
      </Button>
    </>
  );
};

export default SecondBlockForm;
