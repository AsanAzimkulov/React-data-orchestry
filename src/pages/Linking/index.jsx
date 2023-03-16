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

import { selectReferenceSections } from '../../store/slices/sections/selectors';

import style from './index.module.scss';

import Canvas from './canvas';
import './index.css';
import './iconfont.css';
import 'butterfly-dag/dist/index.css';
import { BaseNode } from './node';
import { BaseNodeStatic } from './node';
import {
  addSectionChildNode,
  editSection,
  removeSectionChildNode,
} from '../../store/slices/sections';
import BaseModal from '../../components/Modal';
import FirstBlockForm from '../../components/FirstBlockForm';
import {
  addNode,
  addSubNode,
  deleteNode,
  deleteSubNode,
  editNode,
  editSubNode,
} from '../../store/slices/nodes';
import SecondBlockForm from '../../components/SecondBlockForm';
import { selectSecondNodes } from '../../store/slices/nodes/selectors';

const Linking = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);

  const handleFirstModalClose = () => setOpenFirstModal(false);
  const handleSecondModalClose = () => setOpenSecondModal(false);

  const [currentForm, setCurrentForm] = useState(1);

  const referenceSections = useSelector(selectReferenceSections);
  const [activeSection, setActiveSection] = useState(referenceSections[0]);

  const [activeSubNode, setActiveSubNode] = useState(null);

  const sideBarId = 'side-bar-slot';

  const [data, setData] = useState({
    nodes: [
      {
        id: '0',
        name: 'Справочники',
        top: 264,
        left: 172,
        slotSelector: '#' + sideBarId,
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
        setActiveSection(index) {},
        Class: BaseNodeStatic,
      },
    ],
  });

  const canvasRef = useState(null);

  // Первая загрузка

  // const secondNodes = useSelector(selectSecondNodes);

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
          addNode({
            variant: 'second',
            node: {
              data: node.data,
              id: node.id,
              name: node.name,
              parentSectionId: node.parentSectionId,
            },
          }),
        );
        dispatch(
          addSectionChildNode({
            block: 'reference',
            index: node.parentSectionId,
            id: node.id,
          }),
        );
      },
      addSubNode(variant, id, subNode) {
        dispatch(addSubNode({ variant, id, subNode }));
      },
      editSubNode(variant, id, subNodeIndex, subNode) {
        dispatch(editSubNode({ variant, id, subNodeIndex, subNode }));
      },

      deleteSubNode(variant, id, subNodeId, parentId) {
        dispatch(deleteSubNode({ variant, id, subNodeId }));
      },
      deleteNode(variant, id, parentId) {
        console.log(id, parentId);
        dispatch(
          removeSectionChildNode({
            block: 'reference',
            parentId,
            id,
          }),
        );

        dispatch(
          deleteNode({
            variant,
            id: parentId,
          }),
        );
      },
      onClickSecondSubNode(variant, id, subNodeIndex) {
        setCurrentForm(2);
        setActiveSubNode({ variant, id, subNodeIndex });
        setOpenSecondModal(true);
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

  function saveFirstBlockSettings(name, nameEng, checkboxes, childNodesIds) {
    dispatch(
      editSection({
        block: 'reference',
        index: activeSection.id,
        section: {
          options: { checkboxes },
          name,
          nameEng,
        },
      }),
    );

    let canvas = window.canvasRef;
    const node = canvas.getDataMap().nodes[0];
    console.log(activeSection.id);
    node.updateNode(activeSection.id, name);

    if (childNodesIds.length !== 0) {
      let canvas = window.canvasRef;

      childNodesIds.forEach((id) => {
        const node = canvas.getDataMap().nodes[id];
        node.updateBaseNode(activeSection.id, name);

        dispatch(editNode({ variant: 'second', id, node: { name } }));
      });
    }

    handleFirstModalClose();
  }

  function saveSecondBlockSettings(
    id,
    subNodeIndex,
    variant,
    name,
    nameEng,
    fieldType,
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
          content: name,
          nameEng: nameEng,
          fieldType,
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
      <div className={style.wrapper}>
        <div className={style.sideBarWrapper}>
          <div className={style.sideBar} style={{ backgroundColor: theme.palette.primary.main }}>
            <Typography variant='h2' style={{ marginBottom: 24 }}>
              Справочники
            </Typography>
            <div id={sideBarId}></div>
          </div>
        </div>
        <div className='flow-canvas' id='dag-canvas'></div>
      </div>
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
