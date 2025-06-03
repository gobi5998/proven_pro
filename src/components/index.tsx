import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/loginSlice';
import validationReducer from '../store/slices/registerSlice';

// Import reducers here
// import userReducer from './slices/userSlice';

export type RootState = {
  auth: {
    isAuthenticated: boolean;
    user: any;
    loading: boolean;
    error: string | null;
  };
  validation: {
    login: {
      email: string;
      password: string;
      emailError: string | null;
      passwordError: string | null;
      loading: boolean;
      error: string | null;
    };
    register: {
      username: string;
      email: string;
      password: string;
      usernameError: string | null;
      emailError: string | null;
      passwordError: string | null;
      otpSent: boolean;
      otpVerified: boolean;
      loading: boolean;
      error: string | null;
    };
  };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    validation: validationReducer,
    // Add reducers here
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch; 