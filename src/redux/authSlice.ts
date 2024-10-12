// redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define User and Content interfaces
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
  skill: string[];
  certification: string[];
  bookingJob: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null, // Store the token separately
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user; // Save user data
      state.token = action.payload.token; // Save the token
      localStorage.setItem("token",JSON.stringify(state.token))
    },
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear both user and token on logout
      localStorage.removeItem("token")
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
