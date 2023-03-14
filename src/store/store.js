import { configureStore } from "@reduxjs/toolkit";
import { nodesSlice } from './slices/nodes';
import { sectionsSlice } from './slices/sections';

export const store = configureStore({
  reducer: {
    sections: sectionsSlice.reducer,
    nodes: nodesSlice.reducer,
  },
  preloadedState: {
    sections: {
      reference: []
    },
    nodes: {
      second: []
    }
  }
});