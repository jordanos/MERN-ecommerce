import { createSlice } from "@reduxjs/toolkit";

export type Notify = {
  error: Error | null;
  id: Number;
};

const initialState: Notify = {
  error: null,
  id: Date.now(),
};

const notifySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createNotification: (state, { payload }) => {
      state.error = payload.error;
      state.id = Date.now();
    },
  },
});

export const { createNotification } = notifySlice.actions;

export default notifySlice.reducer;
