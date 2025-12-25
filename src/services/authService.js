import api from "../lib/api";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * Sign up a new user
   * @param {string} name - User's full name
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} API response
   */
  signup: async (name, email, password) => {
    const response = await api.post("/auth/signup", { name, email, password });
    return response.data;
  },

  /**
   * Verify OTP code sent to user's email
   * @param {string} email - User's email address
   * @param {string} otp - 6-digit OTP code
   * @returns {Promise<{token: string, user: object}>} Auth token and user data
   */
  verifyOTP: async (email, otp) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },

  /**
   * Login with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{token: string, user: object}>} Auth token and user data
   */
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  /**
   * Request password reset
   * @param {string} email - User's email address
   * @returns {Promise} API response
   */
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  /**
   * Reset password with reset token
   * @param {string} token - Reset token from email
   * @param {string} password - New password
   * @returns {Promise} API response
   */
  resetPassword: async (token, password) => {
    const response = await api.post("/auth/reset-password", { token, password });
    return response.data;
  },

  /**
   * Get current user profile
   * @returns {Promise<object>} User data
   */
  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  /**
   * Update user profile
   * @param {object} data - User data to update
   * @returns {Promise<object>} Updated user data
   */
  updateProfile: async (data) => {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} API response
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

