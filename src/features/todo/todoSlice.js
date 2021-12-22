import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../apis/AxiosInstance";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getTodos.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "fulfilled";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(editTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/todo/create",
      method: "post",
      data: payload.body,
    });
    if (response.status === 200)
      thunkAPI.dispatch(getTodos({ boardId: payload.body.boardId }));
    return response.data;
  }
);

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/todos",
      method: "get",
      params: { boardId: payload.boardId },
    });
    return response.data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/todo/edit",
      method: "put",
      params: { id: payload.id },
      data: payload.body,
    });
    if (response.status === 200)
      thunkAPI.dispatch(getTodos({ boardId: payload.boardId }));
    return response.data;
  }
);

export const completeTodo = createAsyncThunk(
  "todo/complete",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/todo/complete",
      method: "put",
      params: {
        id: payload.id,
      },
    });

    if (response.status === 200)
      thunkAPI.dispatch(getTodos({ boardId: payload.boardId }));
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/todo/delete",
      method: "delete",
      params: { id: payload.id },
    });

    if (response.status === 200)
      thunkAPI.dispatch(getTodos({ boardId: payload.boardId }));
    return response.data;
  }
);

export const selectTodos = (state) => state.todo.todos;
export const selectTodoStatus = (state) => state.todo.status;
export const selectTodoError = (state) => state.todo.error;
export const { get, getAll } = todoSlice.actions;
export default todoSlice.reducer;
