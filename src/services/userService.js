import api from "../lib/api";

/**
 * User Service
 * Handles all user-related API calls (Admin only)
 */

export const userService = {
  /**
   * Get all users (paginated, searchable)
   */
  getUsers: async (page = 1, limit = 20, search = "", role = "") => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) {
      params.append("search", search);
    }
    if (role) {
      params.append("role", role);
    }
    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },

  /**
   * Get user by ID with all related data
   */
  getUserById: async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
};

