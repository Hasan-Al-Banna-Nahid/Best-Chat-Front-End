import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import SpinnerReducer from "./SpinnerReducer";
import UsersReducer from "./UsersReducer";
import ChatsReducer from "./ChatsReducer";
import ChatReducer from "./ChatReducer";

const rootReducer = combineReducers({
    AuthReducer: AuthReducer,
    Spinner: SpinnerReducer,
    UsersReducer: UsersReducer,
    ChatsReducer: ChatsReducer,
    ChatReducer: ChatReducer
});

export const store = configureStore({
    reducer: rootReducer,
});
