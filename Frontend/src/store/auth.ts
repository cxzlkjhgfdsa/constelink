import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
  isAuthenticated: boolean;
  nickname: string,
  profileImg: string,
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  nickname: "",
  profileImg: ""
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.nickname = action.payload.name;
      state.profileImg = action.payload.profileImg;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;