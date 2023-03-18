import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Typography,
  IconButton,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  useTheme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import style from './index.module.scss';

import Canvas from './canvas';
import './index.css';
import './iconfont.css';
import 'butterfly-dag/dist/index.css';
import { BaseNode, PositioningSystem } from './node';
import BaseModal from '../../components/Modal';
import FirstBlockForm from '../../components/FirstBlockForm';
import {
  addNode,
  addField,
  deleteNode,
  deleteField,
  editNode,
  editField,
  addNodes,
} from '../../store/slices/nodes';
import SecondBlockForm from '../../components/SecondBlockForm';
import { selectNodes, selectRawNodes } from '../../store/slices/nodes/selectors';

window.myCanv = {};

const Linking = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const rawNodes = useSelector(selectRawNodes);
  const nodes = useSelector(selectNodes);

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleFirstModalClose = () => setOpenFirstModal(false);
  const handleSecondModalClose = () => setOpenSecondModal(false);

  const [filterNodeType, setFilterNodeType] = useState('guide');
  window.myCanv.nodesFilterType = filterNodeType;

  const [activeNodeId, setActiveNodeId] = useState();
  const [activeFieldIndex, setActiveFieldIndex] = useState();

  const [activeField, setActiveField] = useState();

  const [currentForm, setCurrentForm] = useState(1);

  const data = {
    nodes: rawNodes.map(({ name, type }, i) => {
      return {
        id: i,
        name,
        type,
        data: {
          content: [],
        },
        top: 0,
        left: 0,
        Class: BaseNode,

        onClickField(id, fieldIndex, type) {
          setActiveFieldIndex(id);
          setActiveField(nodes[id].data.content[fieldIndex]);
          setActiveNodeId(id);
          setCurrentForm(type);
        },

        addNode(node) {
          dispatch(
            addNode({
              data: node.data,
              id: node.id,
              name: node.name,
            }),
          );
        },

        addField(id, field) {
          dispatch(addField({ id, field }));
        },

        editField(id, fieldIndex, field) {
          dispatch(editField({ id, fieldIndex, field }));
        },

        deleteField(id, fieldIndex, parentId) {
          dispatch(deleteField({ id, fieldIndex }));
        },

        deleteNode(id) {
          dispatch(
            deleteNode({
              id,
            }),
          );
        },
      };
    }),
  };

  const canvasRef = useState(null);

  // Первая загрузка

  useEffect(() => {
    dispatch(
      addNodes({ nodes: data.nodes.map(({ id, name, type, data }) => ({ id, name, type, data })) }),
    );

    let root = document.getElementById('dag-canvas');
    let canvas = canvasRef.current;

    canvas = new Canvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true, // 可连线
      draggable: true, // 可拖动
      zoomable: true, // 可放大
      moveable: true,
      theme: {
        edge: {
          shapeType: 'AdvancedBezier',
        },
      },
    });
    window.canvasRef = canvas;

    canvas.draw(data, () => {
      canvas.setGridMode(true, {
        isAdsorb: false,
        theme: {
          shapeType: 'circle',
          gap: 30, //
          background: '#1A1D23',
          circleRadiu: 3,
          circleColor: 'rgba(255, 255, 255, 0.2)',
        },
      });
    });
  }, []);
  //

  function saveFieldSettings(name, nameEng, checkboxes) {
    dispatch(
      editField({
        id: activeNodeId,
        fieldIndex: activeFieldIndex,
        field: {
          options: { checkboxes },
          name,
          nameEng,
        },
      }),
    );

    let canvas = window.canvasRef;
    const node = canvas.getNode(activeNodeId);

    node.updateField(activeNodeId, activeFieldIndex, name);

    handleFirstModalClose();
  }

  //

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.sideBarWrapper}>
          <div className={style.sideBar} style={{ backgroundColor: theme.palette.primary.main }}>
            <Button
              fullWidth
              style={{ marginBottom: 20 }}
              onClick={() => setFilterNodeType('guide')}>
              Справочники
            </Button>
            <Button
              fullWidth
              style={{ marginBottom: 20 }}
              onClick={() => setFilterNodeType('sections')}>
              Разделы
            </Button>
            <Button fullWidth style={{ marginBottom: 20 }} onClick={() => setFilterNodeType(null)}>
              Всё вместе
            </Button>
          </div>
        </div>
        <div className='flow-canvas' id='dag-canvas'></div>
      </div>
      {currentForm === 'guide' ? (
        <BaseModal isOpen={openFirstModal} onClose={handleFirstModalClose}>
          <FirstBlockForm field={activeField} onSubmit={saveFieldSettings} />
        </BaseModal>
      ) : (
        <BaseModal isOpen={openSecondModal} onClose={handleSecondModalClose}>
          <SecondBlockForm field={activeFieldIndex} onSubmit={saveFieldSettings} />
        </BaseModal>
      )}
    </div>
  );
};

export default Linking;
