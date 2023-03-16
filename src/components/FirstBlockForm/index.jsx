import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Button,
  useTheme,
} from '@material-ui/core';

import CustomCheckbox from '../CustomCheckbox';

import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { selectReferenceSections } from '../../store/slices/sections/selectors';
import { SmallButtonWide } from '../SmallButton';
import { theme } from '../../theme';


const FirstBlockForm = ({ activeSectionId, onSubmit }) => {
  const theme = useTheme();

  const InputProps = {
    ...theme.props.MuiTextField.InputProps,
    style: {
      ...theme.props.MuiTextField.InputProps.style,
      backgroundColor: theme.palette.primary.light,
    },
  };

  const initialCheckboxes = [
    { value: 'Видимость поиска', checked: false },
    { value: 'Показ суммы у таблицы', checked: false },
    { value: 'Скрыть кнопку добавить', checked: false },
    { value: 'Исключить из ролей', checked: false },
    { value: 'Скрыть панель у таблицы', checked: false },
    { value: 'Убрать действия у columns', checked: false },
    { value: 'Большое модальное окно', checked: false },
    { value: 'Кнопка добавить в панели', checked: false },
    { value: 'Страница под каждую компанию', checked: false },
    { value: 'Модуль импорта', checked: false },
    { value: 'Скрыть CRUD', checked: false },
    { value: 'Создавать миграцию перед пользователем', checked: false },
    { value: 'Не отображать в меню', checked: false },
    { value: 'Модуль экспорта', checked: false },
    { value: 'Редирект во внутрь после создания', checked: false },
    { value: 'Копирование строк', checked: false },
    { value: 'Логировать раздел', checked: false },
    { value: 'Отключить фильтрацию по компании', checked: false },
    { value: 'Переход по двойному клику', checked: false },
    { value: 'Только создание', checked: false },
    { value: 'Убрать из мобильного приложения', checked: false },
  ];

  const sections = useSelector(selectReferenceSections);
  const activeSection = sections[activeSectionId];
  const [name, setName] = useState(activeSection.name);
  const [nameEng, setNameEng] = useState(activeSection.nameEng || '');
  const [checkboxes, setCheckboxes] = useState(
    activeSection.options && activeSection.options.checkboxes
      ? activeSection.options.checkboxes
      : initialCheckboxes,
  );

  return (
    <>
      <Typography variant='h2' style={{ marginBottom: 18 }}>
        Настройки:
      </Typography>
      <div className={style.inputs}>
        <div className={style.inputFirst}>
          <Typography
            variant='subtitle1'
            style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '5px', display: 'block' }}>
            Название справочника:
          </Typography>
          <TextField
            InputProps={InputProps}
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
            InputProps={InputProps}
            value={nameEng}
            onInput={(e) => setNameEng(e.target.value)}
            placeholder={'Введите'}
            fullWidth
          />
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
        onClick={() => onSubmit(name, nameEng, checkboxes, activeSection.childNodesIds)}
        style={{ marginLeft: 'auto', display: 'block' }}>
        Сохранить
      </SmallButtonWide>
    </>
  );
};

export default FirstBlockForm;
