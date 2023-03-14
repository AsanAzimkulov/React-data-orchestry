import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';

import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { selectReferenceSections } from '../../store/slices/sections/selectors';

const FirstBlockForm = ({ activeSectionId, onSubmit }) => {
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
      <Typography variant='h3' component='h3'>
        Настройки:
      </Typography>
      <TextField
        label='Название раздела'
        value={name}
        onInput={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label='Название на Английском'
        value={nameEng}
        onInput={(e) => setNameEng(e.target.value)}
        fullWidth
      />
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
      <Button onClick={() => onSubmit(name, nameEng, checkboxes)}>Применить</Button>
    </>
  );
};

export default FirstBlockForm;
