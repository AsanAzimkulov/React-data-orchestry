import { createSlice } from '@reduxjs/toolkit';

export const sectionsSlice = createSlice({
  name: "sections",
  initialState: {},
  reducers: {
    changeSections: (state, action) => {
      state[action.payload.block] = action.payload[action.payload.block];
    },
    editSection: (state, action) => {
      const section = state[action.payload.block][action.payload.index];
      console.log(action, section)

      section.name = action.payload.name;
      section.nameEng = action.payload.nameEng;
      section.options = action.payload.options;
    }
  }
});

export const { changeSections, editSection } = sectionsSlice.actions;