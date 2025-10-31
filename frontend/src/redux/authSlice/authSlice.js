import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [],
  loading: true,
  error: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action) => {
      (state.userData = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    deleteUser: (state) => {
      (state.userData = []), (state.loading = false), (state.error = false);
    },
  },
});

export const { createUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
