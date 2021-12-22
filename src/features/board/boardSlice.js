import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
  },
  reducers: {
    get: (state) => {
      //fetch all boards from server
    },
  },
});
export const selectBoards = (state) => state.board.boards;
export const { get } = boardSlice.actions;
export default boardSlice.reducer;
