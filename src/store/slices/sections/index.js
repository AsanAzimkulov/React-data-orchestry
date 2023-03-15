import { createSlice } from '@reduxjs/toolkit';

export const sectionsSlice = createSlice({
  name: "sections",
  initialState: {},
  reducers: {
    changeSections: (state, action) => {
      state[action.payload.block] = action.payload[action.payload.block].map(x => ({ ...x, childNodesIds: [] }));
    },
    addSectionChildNode: (state, action) => {
      state[action.payload.block][action.payload.index].childNodesIds.push(action.payload.id);
    },
    removeSectionChildNode: (state, action) => {
      console.log(action.payload);
      
      const index = state[action.payload.block].findIndex(section => section.id == action.payload.parentId);
      console.log(action.payload, index)
      state[action.payload.block][index].childNodesIds = state[action.payload.block][index].childNodesIds.filter(id => id != action.payload.id);
    },
    editSection: (state, action) => {
      state[action.payload.block][action.payload.index] = { ...state[action.payload.block][action.payload.index], ...action.payload.section }
    }
  }
});

export const { changeSections, editSection, addSectionChildNode, removeSectionChildNode } = sectionsSlice.actions;