import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { usersService } from "../services/usersService";

export const loginThunk = createAsyncThunk(
  "authReducer/createAsyncThunk",
  async function ({ pass }) {
    // console.log(login, pass);
    const data = await authService.sendLoginData(pass);
    return data;
  }
);

export const registerThunk = createAsyncThunk(
  "authReducer/createRegisterAsyncThunk",
  async function ({ username, authKey }) {
    // console.log(username, authKey);
    const data = await authService.sendRegisterData(username, authKey);
    return data;
  }
);

export const checkJwt = createAsyncThunk(
  "authReducer/createCheckJwtThunk",
  async function (jwt) {
    const data = await authService.checkJwt(jwt);
    return data;
  }
);

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    isAuth: null,
    jwt: localStorage.getItem("jwt") || null,
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    AuthTrue(state) {
      return (state = state.isAuth.true);
    },
    AuthFalse(state) {
      return (state = state.isAuth.false);
    },
    AuthReducerEmpty(state) {
      return (state = {
        isAuth: null,
        jwt: null,
        user: {},
        loading: false,
        error: null,
      });
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state) => {
      console.log("loginThunk pending");
      state.loading = true;
      state.error = null;
    },
    [loginThunk.fulfilled]: (state, action) => {
      console.log("loginThunk fulfilled");
      state.loading = false;
      // console.log(action.payload);
      if (action.payload?.status == 200) {
        console.log("status 200");
        state.user = action.payload.user;
        state.jwt = action.payload.token;
        // console.log(action.payload);
        state.isAuth = true;
        localStorage.setItem("jwt", action.payload.token);
      }
      state.error = action.payload?.message;
    },
    [loginThunk.rejected]: (state, action) => {
      console.log("loginThunk rejected");
      console.log(action.payload);
    },
    [registerThunk.pending]: (state) => {
      console.log("registerThunk pending");
      state.loading = true;
      state.error = null;
    },
    [registerThunk.fulfilled]: (state, action) => {
      console.log("registerThunk fulfilled");
      state.loading = false;
      console.log(action.payload);
      if (action.payload?.status == 200) {
        console.log("status 200");
        alert("Registration successful");
      }
      state.error = action.payload?.message;
    },
    [registerThunk.rejected]: (state, action) => {
      console.log("registerThunk rejected");
      state.loading = false;
      console.log(action.payload);
    },
    [checkJwt.pending]: (state) => {
      console.log("checkJwt pending");
      state.loading = true;
      state.error = null;
    },
    [checkJwt.fulfilled]: (state, action) => {
      console.log("checkJwt fulfilled");
      state.loading = false;
      console.log(action);
      console.log(action.payload);
      if (action.payload?.status == 200) {
        // console.log("status 200");
        state.user = action.payload.user;
        state.jwt = action.payload.token;
        // console.log(action.payload);
        state.isAuth = true;
        localStorage.setItem("jwt", action.payload.token);
        state.error = null;
      }
      if (action.payload?.status == 400) {
        // console.log("status 200");
        state.user = {};
        state.jwt = null;
        // console.log(action.payload);
        state.isAuth = false;
        state.error = action.payload?.message;
      }
    },
    [checkJwt.rejected]: (state, action) => {
      console.log("checkJwt rejected");
      console.log(action.payload);
    },
  },
});

export default AuthSlice.reducer;
export const { AuthTrue, AuthFalse, AuthReducerEmpty } = AuthSlice.actions;
