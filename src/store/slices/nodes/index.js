import { createSlice } from '@reduxjs/toolkit';


export const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    rawNodes: {

    },
    nodes: []
  },
  reducers: {
    addNodes(state,action){
      state.nodes = [...state.nodes, ...action.payload.nodes]
    },
    addNode(state, action) {
      state.nodes.push(action.payload.node);
    },
    deleteNode(state, action) {
      state.nodes = state.nodes.filter(({id}) => id != action.payload.id);
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

export const { addNodes, addNode, deleteNode, editNode, addField, editField, deleteField, loadRawNodes } = nodesSlice.actions;