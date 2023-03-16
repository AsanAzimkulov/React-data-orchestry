import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_FIRST_NODES = 1;

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    second: []
  },
  reducers: {
    addNode(state, action) {
      state[action.payload.variant].push(action.payload.node);
    },
    deleteNode(state, action) {
      state[action.payload.variant].splice(action.payload.id - INITIAL_FIRST_NODES, 1);
    },
    editNode(state, action) {
      state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES] = {
        ...state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES],
        node: action.payload.node
      }
    },
    addSubNode(state, action) {
      state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES].data.content.push(action.payload.subNode);
    },
    editSubNode(state, action) {
      state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES].data.content[action.payload.subNodeIndex] = { ...state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES].data.content[action.payload.subNodeIndex], ...action.payload.subNode };
    },
    deleteSubNode(state, action) {

      const subNodeIndex = state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES].data.content.findIndex((subNode) => subNode.id == action.payload.subNodeId);
      state[action.payload.variant][action.payload.id - INITIAL_FIRST_NODES].data.content.splice(subNodeIndex, 1);
    },
    loadRawNodes(state, action) {
      state.rawNodes = action.payload;
    }
  }
});

export const { addNode, deleteNode, editNode, addSubNode, editSubNode, deleteSubNode, loadRawNodes } = nodesSlice.actions;