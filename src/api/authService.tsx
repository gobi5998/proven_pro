// import api from './config';

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterCredentials {
//   email: string;
//   password: string;
//   username: string;
// }

// export const authService = {
//   login: (credentials: LoginCredentials) => api.post('login/', credentials),
  
//   register: async (credentials: RegisterCredentials) => {
//     try {
//       console.log('Registering user with:', credentials);
//       const response = await api.post('register/', credentials);
//       console.log('Registration response:', response.data);
//       return response;
//     } catch (error: any) {
//       console.error('Registration error:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },

//   verifyOTP: async (email: string, otp: string) => {
//     try {
//       console.log('Verifying OTP for:', email);
//       const response = await api.post('register/', { email, otp });
//       console.log('OTP verification response:', response.data);
//       return response;
//     } catch (error: any) {
//       console.error('OTP verification error:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },

//   resendOTP: async (email: string) => {
//     try {
//       console.log('Resending OTP to:', email);
//       const response = await api.post('otp/resend/', { email });
//       console.log('Resend OTP response:', response.data);
//       return response;
//     } catch (error: any) {
//       console.error('Resend OTP error:', {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
//       throw error;
//     }
//   },

//   forgotPassword: (email: string) => api.post('forgot-password/', { email }),
//   resetPassword: (token: string, newPassword: string) => 
//     api.post('reset-password/', { token, newPassword }),
//   logout: () => api.post('logout/')
// }; 


// /services/authService.ts
import api from './config';

export const authService = {
  login: (credentials: { email: string; password: string }) => api.post('login/', credentials),

  register: async (credentials: { email: string; password: string; username: string }) => {
    return await api.post('register/', credentials);
  },

  verifyOTP: async (email: string, otp: string) => {
    return await api.post('register/verify/', { email, otp });
  },

  resendOTP: async (email: string) => {
    return await api.post('register/resend/', { email });
  },

  logout: () => api.post('logout/')
};
