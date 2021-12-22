import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../apis/AxiosInstance";
export const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    status: "idle",
    error: null,
  },
  reducers: {
    get: (state) => {
      //fetch all boards from server
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(createBoard.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(editBoard.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteBoard.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await instance.get("/boards");
  return response.data;
});

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (payload, thunkAPI) => {
    const response = await instance.post("/board/create", payload.body);
    if (response.status === 200) thunkAPI.dispatch(fetchBoards());
    return response.data;
  }
);

export const editBoard = createAsyncThunk(
  "boards/edit",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/board/edit",
      method: "put",
      params: { id: payload.id },
      data: payload.body,
    });
    if (response.status === 200) thunkAPI.dispatch(fetchBoards());
    return response.data;
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/delete",
  async (payload, thunkAPI) => {
    const response = await instance.request({
      url: "/board/delete",
      method: "delete",
      params: { id: payload.id },
    });
    if (response.status === 200) thunkAPI.dispatch(fetchBoards());
    return response.data;
  }
);

export const selectBoards = (state) => state.board.boards;
export const selectBoardStatus = (state) => state.board.status;
export const selectBoardError = (state) => state.board.error;
export const { get } = boardSlice.actions;
export default boardSlice.reducer;
