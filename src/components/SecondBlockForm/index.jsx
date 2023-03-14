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

const SecondBlockForm = ({ activeSubNodeInfo, onSubmit }) => {
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
    "self::TYPE_TEXT => 'Текст'",
    "self::TYPE_BOOK => 'Связь со справочником'",
    "self::TYPE_BOOK_TAGS => 'Связь со справочником (теги)'",
    "self::TYPE_BOOK_TAGS_FREE => 'Связь со справочником тегами (Свободный ввод)'",
    "self::TYPE_TAGS_FREE => 'Тэги свободный ввод',",
    "self::TYPE_DATE => 'Дата'",
    "self::TYPE_DATETIME => 'Дата и время'",
    "self::TYPE_DROPDOWN => 'Выпадающий список'",
    "self::TYPE_NUMBER => 'Номер'",
    "self::TYPE_FILE => 'Файл'",
    "self::TYPE_DROPZONE => 'Dropzone'",
    "self::TYPE_BIG_TEXT => 'Большое текстовое поле'",
    "self::TYPE_BIG_TEXT_TAGS => 'Большое текстовое поле с тегами'",
    "self::TYPE_BIG_TEXT_TAGS_NO_EDIT => 'Большое текстовое поле с тегами (без редактора)'",
    "self::TYPE_CHECKBOX => 'Чекбокс'",
    "self::TYPE_MULTIPLE => 'Мультиполе'",
    "self::TYPE_GANTA => 'GANTA'",
    "self::TYPE_SINGLE_PHOTO => 'Одиночное фото'",
    "self::TYPE_DYNAMIC_FORM => 'Динамическая форма'",
    "self::TYPE_COLOR => 'Цвет'",
    "self::TYPE_BUTTONS_LIST => 'Кнопочный список'",
  ];
  console.log('form', activeSubNodeInfo);
  const [selectFieldType, setSelectFieldType] = useState(selectValues[0]);
  const nodes = useSelector(selectSecondNodes);

  const activeSubNode =
    nodes[activeSubNodeInfo.id - INITIAL_FIRST_NODES].data.content[
      activeSubNodeInfo.subNodeIndex
    ] || {};

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
            nodes[activeSubNodeInfo.id - INITIAL_FIRST_NODES].data.content.findIndex(
              (subNode) => subNode.id == activeSubNodeInfo[activeSubNodeInfo.subNodeIndex],
            ),
            activeSubNodeInfo.variant,
            name,
            nameEng,
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
