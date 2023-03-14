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
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { selectReferenceSections } from '../../store/slices/sections/selectors';

import style from './index.module.scss';

import Canvas from './canvas';
import './index.css';
import './iconfont.css';
import 'butterfly-dag/dist/index.css';
import { BaseNode } from './node';
import { BaseNodeStatic } from './node';
import { editSection, sectionsSlice } from '../../store/slices/sections';
import BaseModal from '../../components/Modal';
import FirstBlockForm from '../../components/FirstBlockForm';
import { addNode, addSubNode, deleteSubNode, editSubNode } from '../../store/slices/nodes';
import SecondBlockForm from '../../components/SecondBlockForm';

const Linking = () => {
  const dispatch = useDispatch();
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleFirstModalClose = () => setOpenFirstModal(false);
  const handleSecondModalClose = () => setOpenSecondModal(false);

  const [currentForm, setCurrentForm] = useState(1);

  const referenceSections = useSelector(selectReferenceSections);
  const [activeSection, setActiveSection] = useState(referenceSections[0]);

  const [activeSubNode, setActiveSubNode] = useState({});

  const [data, setData] = useState({
    nodes: [
      {
        id: '0',
        name: 'Справочные',
        top: 264,
        left: 172,
        data: {
          content: referenceSections.map(({ name }, index) => ({
            id: index.toString(),
            sourceNodeId: (index + 1).toString(),
            targeNodeId: (index + 2).toString(),
            content: name,
          })),
        },
        onClickSection(id) {
          setActiveSection(referenceSections[id]);
          setOpenFirstModal(true);
          setCurrentForm(1);
        },
        Class: BaseNodeStatic,
      },
    ],
  });

  const canvasRef = useState(null);

  // Первая загрузка
  useEffect(() => {
    let root = document.getElementById('dag-canvas');
    let canvas = canvasRef.current;

    canvas = new Canvas({
      root: root,
      disLinkable: true, // 可删除连线
      linkable: true, // 可连线
      draggable: true, // 可拖动
      zoomable: true, // 可放大
      moveable: true,
      addNode(variant, node) {
        dispatch(
          addNode({ variant: 'second', node: { data: node.data, id: node.id, name: node.name } }),
        );
      },
      addSubNode(variant, id, subNode) {
        dispatch(addSubNode({ variant, id, subNode }));
      },
      editSubNode(variant, id, subNodeIndex, subNode) {
        dispatch(editSubNode({ variant, id, subNodeIndex, subNode }));
      },
      deleteSubNode(variant, id, subNodeId) {
        dispatch(deleteSubNode({ variant, id, subNodeId }));
      },

      onClickSecondSubNode(variant, id, subNodeIndex) {
        setOpenSecondModal(true);
        setActiveSubNode({ variant, id, subNodeIndex });
        setCurrentForm(2);
      },

      theme: {
        edge: {
          shapeType: 'AdvancedBezier',
        },
      },
    });
    window.canvasRef = canvas;
    canvas.draw(data, () => {
      canvas.focusCenterWithAnimate();
    });
  }, []);
  //

  function saveFirstBlockSettings(name, nameEng, checkboxes) {
    dispatch(
      editSection({
        name: name,
        nameEng: nameEng,
        index: activeSection.id,
        block: 'reference',
        options: { checkboxes },
      }),
    );
    let canvas = window.canvasRef;
    const node = canvas.getDataMap().nodes[0];
    node.updateNode(activeSection.id, name);

    handleFirstModalClose();
  }

  function saveSecondBlockSettings(
    id,
    subNodeIndex,
    variant,
    name,
    nameEng,
    dimension,
    checkboxes,
  ) {
    console.log('saver', { id, subNodeIndex, variant, name, nameEng, dimension, checkboxes });
    dispatch(
      editSubNode({
        id,
        subNodeIndex,
        variant,
        subNode: {
          name,
          nameEng: nameEng,
          checkboxes,
          dimension,
        },
      }),
    );
    let canvas = window.canvasRef;
    const node = canvas.getDataMap().nodes[id];
    node.updateNode(subNodeIndex, name);

    handleSecondModalClose();
  }

  //

  return (
    <div className={style.container}>
      <div className='flow-canvas' id='dag-canvas'></div>
      {currentForm === 1 ? (
        <BaseModal isOpen={openFirstModal} onClose={handleFirstModalClose}>
          <FirstBlockForm activeSectionId={activeSection.id} onSubmit={saveFirstBlockSettings} />
        </BaseModal>
      ) : (
        <BaseModal isOpen={openSecondModal} onClose={handleSecondModalClose}>
          <SecondBlockForm activeSubNodeInfo={activeSubNode} onSubmit={saveSecondBlockSettings} />
        </BaseModal>
      )}
    </div>
  );
};

export default Linking;
