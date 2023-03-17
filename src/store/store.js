import { configureStore } from "@reduxjs/toolkit";
import { nodesSlice } from './slices/nodes';


export const store = configureStore({
  reducer: {
    nodes: nodesSlice.reducer,
  },
});