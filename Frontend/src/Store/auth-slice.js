import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialIsAdmin = localStorage.getItem("isAdmin");
const convertToBooleanIsAdmin = initialIsAdmin == "true";
const userIsLoggedIn = !!initialToken;

const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  isAdmin: convertToBooleanIsAdmin,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
