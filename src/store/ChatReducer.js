import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createThunk } from "@reduxjs/toolkit";

import { chatsService } from "../services/chatsService";

export const getChatThunk = createAsyncThunk(
  "chatReducer/getChatThunk",
  async function (chatId) {
    console.log(chatId);
    const data = await chatsService.getChat(chatId);
    return data;
  }
);

export const getFileThunk = createAsyncThunk(
  "chatReducer/getFileThunk",
  async function ({ messageId, fileId }) {
    console.log(fileId);
    const data = await chatsService.getFile(fileId);
    data.messageId = messageId;
    return data;
  }
);

const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState: {
    chat: {},
    loading: false,
    error: null,
  },
  reducers: {
    ChatReducerEmpty(state) {
      return (state = {
        chat: {},
        loading: false,
        error: null,
      });
    },
    PushLastMessageReducer(state, action) {
      console.log(action);
      state.chat.messages.push(action.payload);
    },
  },
  extraReducers: {
    [getChatThunk.pending]: (state) => {
      console.log("getChatThunk pending");
      state.loading = true;
      state.error = null;
    },
    [getChatThunk.fulfilled]: (state, action) => {
      console.log("getChatThunk fulfilled");
      state.loading = false;
      if (action.payload?.status === 200) {
        // console.log("status 200");
        // console.log(action.payload);
        state.chat = action.payload.chat;
        state.error = null;
      } else {
        console.log(action.payload);
        state.error = action.payload.chat.message;
      }
    },
    [getChatThunk.rejected]: (state, action) => {
      console.log("getChatThunk rejected");
      console.log(action.payload);
    },
    [getFileThunk.pending]: (state) => {
      console.log("getFileThunk pending");
      state.loading = true;
      state.error = null;
    },
    [getFileThunk.fulfilled]: (state, action) => {
      console.log("getFileThunk fulfilled");
      state.loading = false;
      if (action.payload?.status === 200) {
        let needMessagePlace = state.chat.messages.findIndex(
          (message) => message._id === action.payload.messageId
        );
        state.chat.messages[needMessagePlace].file = action.payload.file;
        state.error = null;
      } else {
        state.error = action.payload.message;
      }
    },
    [getFileThunk.rejected]: (state, action) => {
      console.log("getFileThunk rejected");
      console.log(action.payload);
    },
  },
});

export default ChatSlice.reducer;
export const { ChatReducerEmpty, PushLastMessageReducer } = ChatSlice.actions;
