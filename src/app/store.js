import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import todoReducer from "../features/todo/todoSlice";
export default configureStore({
  reducer: {
    board: boardReducer,
    todo: todoReducer
  },
});
