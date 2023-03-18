import React, { useState, useEffect } from 'react';
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

  const [currentForm, setCurrentForm] = useState(1);

  const guidePos = new PositioningSystem();
  const sectionPos = new PositioningSystem();

  const data = {
    nodes: rawNodes.map(({ name, type }, i) => {
      let coords;

      if (type === 'guide') {
        coords = guidePos.getNextCoords();
      } else {
        coords = sectionPos.getNextCoords();
      }

      return {
        id: i,
        name,
        type,
        childData: [],
        top: coords.y,
        left: coords.x,
        prevCoords: { left: coords.x, top: coords.y },
        Class: BaseNode,

        onClickField(id, fieldIndex, type) {
          setActiveFieldIndex(fieldIndex);
          setActiveNodeId(id);
          setCurrentForm(1);

          setOpenSecondModal(true);
        },
        onClickNode(id) {
          setActiveNodeId(id);
          setCurrentForm(0);
          setOpenFirstModal(true);
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

  // Первая загрузка

  useEffect(() => {
    dispatch(
      addNodes({
        nodes: data.nodes.map(({ id, name, type }) => ({
          id,
          name,
          type,
          childData: [],
        })),
      }),
    );

    let root = document.getElementById('dag-canvas');

    const canvas = new Canvas({
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

    window.myCanv.canv = canvas;

    canvas.on('node-mounted', (id) => {
      if (id === rawNodes.length - 1 && !window.myCanv.canv.nodesLoaded) {
        filterNodes('guide');
        window.myCanv.canv.nodesLoaded = true;
      }
    });

    canvas.on('system.node.move', ({ nodes }) => {
      // Сохранения координат узла в собственной секции
      if (filterNodeType !== 'all') {
        nodes[0].options.prevCoords = { top: nodes[0].top, left: nodes[0].left };
      }
    });

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

  function saveFieldSettings({ name, nameEng, checkboxes, selectFieldType, selectDimension }) {
    dispatch(
      editField({
        id: activeNodeId,
        fieldIndex: activeFieldIndex,
        field: {
          options: { checkboxes, dimension: selectDimension, fieldType: selectFieldType },
          name,
          nameEng,
        },
      }),
    );

    const canvas = window.myCanv.canv;
    const node = canvas.getNode(activeNodeId);

    node.updateField(activeFieldIndex, name);

    handleSecondModalClose();
  }

  function saveNodeSettings({ name, nameEng, checkboxes }) {
    dispatch(
      editNode({
        id: activeNodeId,
        node: {
          options: { checkboxes },
          name,
          nameEng,
        },
      }),
    );

    const canvas = window.myCanv.canv;
    const node = canvas.getNode(activeNodeId);

    node.updateBaseNode(activeNodeId, name);

    handleFirstModalClose();
  }

  //

  function filterNodes(value) {
    setFilterNodeType(value);

    const allPos = new PositioningSystem();

    window.myCanv.canv.nodes.forEach((node) => {
      if (value === 'all') {
        const coords = allPos.getNextCoords();
        node.moveTo(coords.x, coords.y);
        node.dom.style.display = 'block';
      } else if (node.options.type === value || value === 'all') {
        node.moveTo(node.options.prevCoords.left, node.options.prevCoords.top);
        node.dom.style.display = 'block';
      } else {
        node.dom.style.display = 'none';
        node.moveTo(node.options.prevCoords.left, node.options.prevCoords.top);
      }
    });
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.sideBarWrapper}>
          <div className={style.sideBar} style={{ backgroundColor: theme.palette.primary.main }}>
            {[
              { label: 'Справочники', filterType: 'guide' },
              { label: 'Разделы', filterType: 'section' },
              { label: 'Всё вместе', filterType: 'all' },
            ].map(({ label, filterType }) => (
              <Button
                fullWidth
                style={{
                  marginBottom: 20,
                  backgroundColor:
                    filterNodeType === filterType
                      ? theme.palette.secondary.main
                      : theme.palette.primary.moreLighter,
                }}
                onClick={() => filterNodes(filterType)}>
                {label}
              </Button>
            ))}
          </div>
        </div>
        <div className='flow-canvas' id='dag-canvas'></div>
      </div>
      {currentForm === 0 ? (
        <BaseModal isOpen={openFirstModal} onClose={handleFirstModalClose}>
          <FirstBlockForm id={activeNodeId} onSubmit={saveNodeSettings} />
        </BaseModal>
      ) : (
        <BaseModal isOpen={openSecondModal} onClose={handleSecondModalClose}>
          <SecondBlockForm
            fieldParentType={filterNodeType}
            id={activeNodeId}
            fieldIndex={activeFieldIndex}
            onSubmit={saveFieldSettings}
          />
        </BaseModal>
      )}
    </div>
  );
};

export default Linking;
