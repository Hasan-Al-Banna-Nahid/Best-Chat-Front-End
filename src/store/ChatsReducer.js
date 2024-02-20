import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createThunk } from "@reduxjs/toolkit";

import { chatsService } from "../services/chatsService";

export const allChatsThunk = createAsyncThunk(
  "chatsReducer/allChatAsyncThunk",
  async function () {
    const data = await chatsService.getAllChats();
    return data;
  }
);

export const createNewChatThunk = createAsyncThunk(
  "chatsReducer/createNewChatThunk",
  async function (chatName) {
    const data = await chatsService.createNewChat(chatName);
    return data;
  }
);

export const addUsersArrToChatThunk = createAsyncThunk(
  "chatsReducer/addUsersArrToChatThunk",
  async function ({ chatId, usersIdArr }) {
    const data = await chatsService.addUsersArrToChat(chatId, usersIdArr);
    return data;
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chatsReducer/deleteChatThunk",
  async function (chatId) {
    const data = await chatsService.deleteChat(chatId);
    return data;
  }
);

const ChatsSlice = createSlice({
  name: "ChatsSlice",
  initialState: {
    chatsList: [],
    loading: false,
    error: null,
  },
  reducers: {
    ChatsReducerEmpty(state) {
      return (state = {
        chatsList: [],
        loading: false,
        error: null,
      });
    },
  },
  extraReducers: {
    [allChatsThunk.pending]: (state) => {
      console.log("allChatsThunk pending");
      state.loading = true;
      state.error = null;
    },
    [allChatsThunk.fulfilled]: (state, action) => {
      console.log("allChatsThunk fulfilled");
      state.loading = false;
      if (action.payload?.status == 200) {
        // console.log("status 200");
        // console.log(action.payload);
        state.chatsList = action.payload.chatList;
        state.error = null;
      } else {
        state.error = action.payload?.message;
      }
    },
    [allChatsThunk.rejected]: (state, action) => {
      console.log("allChatsThunk rejected");
      console.log(action.payload);
    },
    [createNewChatThunk.pending]: (state) => {
      console.log("createNewChatThunk pending");
      state.loading = true;
      state.error = null;
    },
    [createNewChatThunk.fulfilled]: (state, action) => {
      console.log("createNewChatThunk fulfilled");
      state.loading = false;
      if (action.payload?.status == 200) {
        console.log(action.payload);
        state.chatsList = action.payload.chatsList;
        state.error = null;
      } else {
        state.error = action.payload?.message;
      }
    },
    [createNewChatThunk.rejected]: (state, action) => {
      console.log("createNewChatThunk rejected");
      console.log(action.payload);
    },
    [deleteChatThunk.pending]: (state) => {
      console.log("createNewChatThunk pending");
      state.loading = true;
      state.error = null;
    },
    [deleteChatThunk.fulfilled]: (state, action) => {
      console.log("createNewChatThunk fulfilled");
      state.loading = false;
      if (action.payload?.status == 200) {
        console.log(action.payload);
        state.chatsList = action.payload.chatsList;
        state.error = null;
      } else {
        state.error = action.payload?.message;
      }
    },
    [deleteChatThunk.rejected]: (state, action) => {
      console.log("createNewChatThunk rejected");
      console.log(action.payload);
    },
    [addUsersArrToChatThunk.pending]: (state) => {
      console.log("addUsersArrToChat pending");
      state.loading = true;
      state.error = null;
    },
    [addUsersArrToChatThunk.fulfilled]: (state, action) => {
      console.log("addUsersArrToChat fulfilled");
      state.loading = false;
      if (action.payload?.status == 200) {
        console.log(action.payload);
        const changedChatId = action.payload.chat._id;
        console.log(changedChatId);
        const indexOfChangedChatId = state.chatsList.findIndex(
          (el) => el._id === changedChatId
        );
        console.log(indexOfChangedChatId);
        state.chatsList[indexOfChangedChatId] = action.payload.chat;
        state.error = null;
      } else {
        state.error = action.payload?.message;
      }
    },
    [addUsersArrToChatThunk.rejected]: (state, action) => {
      console.log("addUsersArrToChat rejected");
      console.log(action.payload);
    },
  },
});

export default ChatsSlice.reducer;
export const { ChatsReducerEmpty } = ChatsSlice.actions;
