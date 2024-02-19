import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createThunk } from "@reduxjs/toolkit";

import { usersService } from "../services/usersService";
import { authService } from "../services/authService";

export const usersThunk = createAsyncThunk(
    "usersReducer/createUsersAsyncThunk",
    async function () {
        // console.log(login, pass);
        const data = await usersService.getAllUsers();
        return data;
    }
);

export const deleteUserThunk = createAsyncThunk(
    "usersReducer/deleteUserThunk",
    async function (userId) {
        const data = await usersService.deleteUser(userId);
        return data;
    }
);

export const createNewUserThunk = createAsyncThunk(
    "usersReducer/createNewUserThunk",
    async function ({userName, authKey}) {
        console.log(userName, authKey);
        const data = await authService.sendRegisterData(userName, authKey);
        return data;
    }
);

export const updateUserRoleThunk = createAsyncThunk(
    "usersReducer/updateUserRoleThunk",
    async function ({userId, newRole}) {
        console.log(userId, newRole);
        const data = await usersService.updateUserRole(userId, newRole)
        return data;
    }
);



const UsersSlice = createSlice({
    name: "UsersSlice",
    initialState: {
        usersList: [],
        loading: false,
        error: null,
    },
    reducers: {
        UsersReducerEmpty(state) {
            return (state = {
                usersList: [],
                loading: false,
                error: null,
            });
        },
    },
    extraReducers: {
        [usersThunk.pending]: (state) => {
            console.log("usersThunk pending");
            state.loading = true;
            state.error = null;
        },
        [usersThunk.fulfilled]: (state, action) => {
            console.log("usersThunk fulfilled");
            state.loading = false;
            if (action.payload.status == 200) {
                // console.log("status 200");
                // console.log(action.payload);
                state.usersList = action.payload.usersList;
                state.error = null;
            } else {
                state.error = action.payload.message;
            }
        },
        [usersThunk.rejected]: (state, action) => {
            console.log("usersThunk rejected");
            console.log(action.payload);
        },
        [deleteUserThunk.pending]: (state) => {
            console.log("deleteUserThunk pending");
            state.loading = true;
            state.error = null;
        },
        [deleteUserThunk.fulfilled]: (state, action) => {
            console.log("deleteUserThunk fulfilled");
            state.loading = false;
            if (action.payload.status == 200) {
                console.log("status 200");
                console.log(action.payload);
                state.usersList = action.payload.users;
                state.error = null;
            } else {
                state.error = action.payload.message;
            }
        },
        [deleteUserThunk.rejected]: (state, action) => {
            console.log("usersThunk rejected");
            console.log(action.payload);
        },
        [createNewUserThunk.pending]: (state) => {
            console.log("createNewUserThunk pending");
            state.loading = true;
            state.error = null;
        },
        [createNewUserThunk.fulfilled]: (state, action) => {
            console.log("createNewUserThunk fulfilled");
            state.loading = false;
            if (action.payload.status == 200) {
                console.log("status 200");
                console.log(action.payload);
                state.usersList = action.payload.users;
                state.error = null;
            } else {
                state.error = action.payload.message;
            }
        },
        [createNewUserThunk.rejected]: (state, action) => {
            console.log("createNewUserThunk rejected");
            console.log(action.payload);
        },
        [updateUserRoleThunk.pending]: (state) => {
            console.log("updateUserRoleThunk pending");
            state.loading = true;
            state.error = null;
        },
        [updateUserRoleThunk.fulfilled]: (state, action) => {
            console.log("updateUserRoleThunk fulfilled");
            state.loading = false;
            if (action.payload.status == 200) {
                console.log("status 200");
                console.log(action.payload);
                state.usersList = action.payload.users;
                state.error = null;
            } else {
                state.error = action.payload.message;
            }
        },
        [updateUserRoleThunk.rejected]: (state, action) => {
            console.log("updateUserRoleThunk rejected");
            console.log(action.payload);
        },
    },
});

export default UsersSlice.reducer;
export const { UsersReducerEmpty } = UsersSlice.actions;
