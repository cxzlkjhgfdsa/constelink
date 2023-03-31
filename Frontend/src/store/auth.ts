import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
  isAuthenticated: boolean;
  nickname: string,
  profileImg: string,
  role: string
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  nickname: "",
  profileImg: "",
  role: ""

};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.nickname = action.payload.name;
      state.profileImg = action.payload.profileImg;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    update(state, action){
      state.nickname = action.payload.name;
      state.role = initialAuthState.role
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;