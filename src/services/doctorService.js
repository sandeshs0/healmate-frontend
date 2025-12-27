import api from "../lib/api";

/**
 * Doctor Service
 * Handles all doctor-related API calls (Admin only)
 */

export const doctorService = {
  /**
   * Get all doctors (Public - for users to browse)
   * Supports pagination, search, and specialty filtering
   */
  getPublicDoctors: async (page = 1, limit = 12, search = "", specialty = "") => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) {
      params.append("search", search);
    }
    if (specialty) {
      params.append("specialty", specialty);
    }
    const response = await api.get(`/public/doctors?${params.toString()}`);
    return response.data;
  },

  /**
   * Get single doctor profile (Public)
   */
  getPublicDoctorById: async (id) => {
    const response = await api.get(`/public/doctors/${id}`);
    return response.data;
  },

  /**
   * Create a new doctor (creates User + Doctor profile)
   * Supports file upload for profile picture
   */
  createDoctor: async (data, profilePictureFile = null) => {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(data).forEach((key) => {
      if (key === "profilePicture" && profilePictureFile) {
        // Skip URL if file is provided
        return;
      }
      if (data[key] !== undefined && data[key] !== null) {
        if (typeof data[key] === "object") {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    
    // Append file if provided
    if (profilePictureFile) {
      formData.append("image", profilePictureFile);
    }
    
    const response = await api.post("/admin/doctors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Convert existing user to doctor
   */
  convertToDoctor: async (userId, data) => {
    const response = await api.post(`/admin/doctors/convert/${userId}`, data);
    return response.data;
  },

  /**
   * Get all doctors (paginated, searchable)
   */
  getDoctors: async (page = 1, limit = 20, search = "") => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) {
      params.append("search", search);
    }
    const response = await api.get(`/admin/doctors?${params.toString()}`);
    return response.data;
  },

  /**
   * Get doctor by ID
   */
  getDoctorById: async (id) => {
    const response = await api.get(`/admin/doctors/${id}`);
    return response.data;
  },

  /**
   * Update doctor profile
   */
  updateDoctor: async (id, data) => {
    const response = await api.put(`/admin/doctors/${id}`, data);
    return response.data;
  },

  /**
   * Update doctor's user info (name, email)
   */
  updateDoctorUser: async (id, data) => {
    const response = await api.put(`/admin/doctors/${id}/user`, data);
    return response.data;
  },

  /**
   * Regenerate Jitsi Room ID
   */
  regenerateJitsiRoomId: async (id) => {
    const response = await api.post(`/admin/doctors/${id}/regenerate-room`);
    return response.data;
  },

  /**
   * Delete doctor (removes profile, keeps user)
   */
  deleteDoctor: async (id) => {
    const response = await api.delete(`/admin/doctors/${id}`);
    return response.data;
  },

  /**
   * Upload profile picture
   */
  uploadProfilePicture: async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`/admin/doctors/${id}/upload-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

