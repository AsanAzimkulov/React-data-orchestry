import { createSlice } from '@reduxjs/toolkit';


export const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    rawNodes: {

    },
    nodes: []
  },
  reducers: {
    addNode(state, action) {
      state.nodes.push(action.payload.node);
    },
    deleteNode(state, action) {
      state.nodes.splice(action.payload.id, 1);
    },
    editNode(state, action) {
      state.nodes[action.payload.id] = action.payload.node;
    },

    addField(state, action) {
      state.nodes[action.payload.id].data.content.push(action.payload.field);
    },

    editField(state, action) {
      state.nodes[action.payload.id].data.content[action.payload.fieldIndex] = { ...state.nodes[action.payload.id].data.content[action.payload.fieldIndex], ...action.payload.field };
    },

    deleteField(state, action) {
      state.nodes[action.payload.id].data.content.splice(action.payload.fieldIndex, 1);
    },

    loadRawNodes(state, action) {
      state.rawNodes = action.payload;
    }

  }
});

export const { addNode, deleteNode, editNode, addField, editField, deleteField, loadRawNodes } = nodesSlice.actions;