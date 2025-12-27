import api from "../lib/api";

/**
 * Review Service
 * Handles all review-related API calls
 */

export const reviewService = {
  /**
   * Get reviews for a doctor (Public)
   */
  getDoctorReviews: async (doctorId, page = 1, limit = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    const response = await api.get(
      `/public/doctors/${doctorId}/reviews?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Create a review (Authenticated)
   */
  createReview: async (doctorId, rating, comment = "") => {
    const response = await api.post("/reviews", {
      doctorId,
      rating,
      comment,
    });
    return response.data;
  },

  /**
   * Update a review (Authenticated - own review only)
   */
  updateReview: async (reviewId, rating, comment = "") => {
    const response = await api.put(`/reviews/${reviewId}`, {
      rating,
      comment,
    });
    return response.data;
  },

  /**
   * Delete a review (Authenticated - own review only)
   */
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

