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
  useTheme,
} from '@material-ui/core';

import CustomCheckbox from '../CustomCheckbox';

import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { selectSecondNodes } from '../../store/slices/nodes/selectors';
import { INITIAL_FIRST_NODES } from '../../store/slices/nodes';
import { SmallButtonWide } from '../SmallButton';

import './mui-overrides.css';

const SecondBlockForm = ({
  activeSubNodeInfo = { variant: 'second', id: null, subNodeIndex: null },
  onSubmit,
}) => {
  const theme = useTheme();

  const InputProps = {
    ...theme.props.MuiTextField.InputProps,
    style: {
      ...theme.props.MuiTextField.InputProps.style,
      backgroundColor: theme.palette.primary.light,
    },
  };

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
    <div className='secondBlockForm'>
      <Typography variant='h2' style={{ marginBottom: 18 }}>
        Настройки:
      </Typography>
      <div className={style.inputs}>
        <div className={style.inputFirst}>
          <Typography
            variant='subtitle1'
            style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', display: 'block' }}>
            Название Раздела:
          </Typography>
          <TextField
            value={name}
            onInput={(e) => setName(e.target.value)}
            placeholder={'Введите'}
            fullWidth
          />
        </div>
        <div className={style.inputSecond}>
          <Typography
            variant='subtitle1'
            style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', display: 'block' }}>
            Название на английском:
          </Typography>
          <TextField
            value={nameEng}
            onInput={(e) => setNameEng(e.target.value)}
            placeholder={'Введите'}
            fullWidth
          />
        </div>
      </div>

      <div className={style.dropdowns + ' dropdowns'}>
        <div
          className={style.dropdownFieldType}
          style={{
            marginBottom: '20px',
          }}>
          <Typography
            variant='subtitle1'
            style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', display: 'block' }}>
            Тип поля
          </Typography>
          <FormControl fullWidth>
            <Select
              variant='filled'
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
          <FormControl fullWidth>
            <Typography
              variant='subtitle1'
              style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', display: 'block' }}>
              Размер на форме (от 1 до 12)
            </Typography>
            <Select
              variant='filled'
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
      </div>

      <div className={style.checkboxes}>
        <div className={style.checkBoxesLeft}>
          {checkboxes
            .slice(0, Math.floor(checkboxes.length / 2))
            .map(({ value, checked }, index) => (
              <FormGroup className={style.checkbox}>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      label={value}
                      checked={checked}
                      onChange={({ target }) =>
                        setCheckboxes((prev) =>
                          prev.map((item, id) => {
                            if (value === item.value) {
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
        <div className={style.checkBoxesRight}>
          {checkboxes
            .slice(Math.floor(checkboxes.length / 2))
            .slice(0, Math.floor(checkboxes.length / 2))
            .map(({ value, checked }, index) => (
              <FormGroup className={style.checkbox}>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      label={value}
                      checked={checked}
                      onChange={({ target }) =>
                        setCheckboxes((prev) =>
                          prev.map((item, id) => {
                            if (value === item.value) {
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
      </div>
      <SmallButtonWide
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
        }
        style={{ marginLeft: 'auto', display: 'block' }}>
        Сохранить
      </SmallButtonWide>
    </div>
  );
};

export default SecondBlockForm;
