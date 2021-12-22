import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    get: (state, action) => {
      //fetch all todos for a boardId server
    },
    getAll: (state) => {
      //fetch all todos
    },
  },
});

export const { get, getAll } = todoSlice.actions;
export default todoSlice.reducer;
