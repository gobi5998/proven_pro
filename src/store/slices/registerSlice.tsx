import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../api/authService';

interface ValidationState {
  login: {
    email: string;
    password: string;
    emailError: string | null;
    passwordError: string | null;
    loading: boolean;
    error: string | null;
  };
  register: {
    email: string;
    password: string;
    username: string;
    emailError: string | null;
    passwordError: string | null;
    usernameError: string | null;
    loading: boolean;
    error: string | null;
    otpSent: boolean;
    otpVerified: boolean;
  };
}

const initialState: ValidationState = {
  login: {
    email: '',
    password: '',
    emailError: null,
    passwordError: null,
    loading: false,
    error: null
  },
  register: {
    email: '',
    password: '',
    username: '',
    emailError: null,
    passwordError: null,
    usernameError: null,
    loading: false,
    error: null,
    otpSent: false,
    otpVerified: false
  }
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'validation/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'validation/registerUser',
  async ({ email, password, username }: { email: string; password: string; username: string }, { rejectWithValue }) => {
    try {
      console.log('Starting registration process...');
      const response = await authService.register({ email, password, username });
      console.log('Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration process failed:', error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.details?.email?.[0] ||
                          error.response?.data?.details?.username?.[0] ||
                          error.message || 
                          'Registration failed. Please try again.';
      return rejectWithValue(errorMessage);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'validation/verifyOTP',
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOTP(email, otp);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'OTP verification failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const resendOTP = createAsyncThunk(
  'validation/resendOTP',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.resendOTP(email);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Failed to resend OTP';
      return rejectWithValue(errorMessage);
    }
  }
);

const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    validateLoginEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.login.email = email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      state.login.emailError = emailRegex.test(email) ? null : 'Please enter a valid email address';
    },
    validateLoginPassword: (state, action: PayloadAction<string>) => {
      const password = action.payload;
      state.login.password = password;
      state.login.passwordError = password.length >= 8 ? null : 'Password must be at least 8 characters';
    },
    validateRegisterEmail: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.register.email = email;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      state.register.emailError = emailRegex.test(email) ? null : 'Please enter a valid email address';
    },
    validateRegisterPassword: (state, action: PayloadAction<string>) => {
      const password = action.payload;
      state.register.password = password;
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
      const isLengthValid = password.length >= 8;
      
      if (!isLengthValid) {
        state.register.passwordError = 'Password must be at least 8 characters';
      } else if (!hasSpecialChar) {
        state.register.passwordError = 'Password must contain at least one special character';
      } else {
        state.register.passwordError = null;
      }
    },
    validateRegisterUsername: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      if (!username) {
        state.register.usernameError = 'Username is required';
      } else if (username.length < 2) {
        state.register.usernameError = 'Username must be at least 2 characters';
      } else {
        state.register.usernameError = null;
      }
      state.register.username = username;
    },
    resetValidation: (state) => {
      state.login = initialState.login;
      state.register = initialState.register;
    },
    preserveLoginForm: (state) => {
      state.login.emailError = null;
      state.login.passwordError = null;
    },
    preserveRegisterForm: (state) => {
      state.register.emailError = null;
      state.register.passwordError = null;
      state.register.usernameError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.otpSent = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload as string;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.register.loading = false;
        state.register.otpVerified = true;
        // Clear form data after successful verification
        state.register.email = '';
        state.register.password = '';
        state.register.username = '';
        state.register.otpSent = false;
        state.register.otpVerified = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload as string;
      });
  },
});

export const {
  validateLoginEmail,
  validateLoginPassword,
  validateRegisterEmail,
  validateRegisterPassword,
  validateRegisterUsername,
  resetValidation,
  preserveLoginForm,
  preserveRegisterForm,
} = validationSlice.actions;

export default validationSlice.reducer; 