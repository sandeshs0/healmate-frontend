import api from "../lib/api";

/**
 * Booking Service
 * Handles all booking-related API calls
 */

export const bookingService = {
  /**
   * Get doctor's bookings (Doctor only)
   */
  getDoctorBookings: async (status = "", page = 1, limit = 20) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) {
      params.append("status", status);
    }
    const response = await api.get(`/doctor/bookings?${params.toString()}`);
    return response.data;
  },

  /**
   * Get doctor dashboard stats
   */
  getDoctorStats: async () => {
    const response = await api.get("/doctor/stats");
    return response.data;
  },

  /**
   * Get upcoming bookings for doctor
   */
  getDoctorUpcoming: async (limit = 10) => {
    const response = await api.get(`/doctor/upcoming?limit=${limit}`);
    return response.data;
  },

  /**
   * Update booking summary (Doctor only)
   */
  updateBookingSummary: async (bookingId, summary) => {
    const response = await api.put(`/doctor/bookings/${bookingId}/summary`, {
      summary,
    });
    return response.data;
  },
};

