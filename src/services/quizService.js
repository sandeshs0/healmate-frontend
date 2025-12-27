import api from "../lib/api";

/**
 * Quiz Service
 * Handles all quiz-related API calls
 */

export const quizService = {
  // ==================== QUIZ SETS ====================

  /**
   * Get all active quizzes (public)
   */
  getQuizzes: async () => {
    const response = await api.get("/quiz");
    return response.data;
  },

  /**
   * Get all quizzes including inactive (admin)
   */
  getAllQuizzes: async () => {
    const response = await api.get("/quiz/all");
    return response.data;
  },

  /**
   * Get quiz by slug with questions
   */
  getQuizBySlug: async (slug) => {
    const response = await api.get(`/quiz/${slug}`);
    return response.data;
  },

  /**
   * Create a new quiz (admin)
   * Supports file upload for thumbnail
   */
  createQuiz: async (data, thumbnailFile = null) => {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(data).forEach((key) => {
      if (key === "thumbnail" && thumbnailFile) {
        // Skip URL if file is provided
        return;
      }
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Append file if provided
    if (thumbnailFile) {
      formData.append("image", thumbnailFile);
    }
    
    const response = await api.post("/quiz", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Update a quiz (admin)
   * Supports file upload for thumbnail
   */
  updateQuiz: async (id, data, thumbnailFile = null) => {
    const formData = new FormData();
    
    // Append all form fields
    Object.keys(data).forEach((key) => {
      if (key === "thumbnail" && thumbnailFile) {
        // Skip URL if file is provided
        return;
      }
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Append file if provided
    if (thumbnailFile) {
      formData.append("image", thumbnailFile);
    }
    
    const response = await api.put(`/quiz/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Upload quiz thumbnail (admin)
   */
  uploadQuizThumbnail: async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`/quiz/${id}/upload-thumbnail`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  /**
   * Delete a quiz (admin)
   */
  deleteQuiz: async (id) => {
    const response = await api.delete(`/quiz/${id}`);
    return response.data;
  },

  // ==================== QUESTIONS ====================

  /**
   * Add question to quiz (admin)
   */
  addQuestion: async (quizId, data) => {
    const response = await api.post(`/quiz/${quizId}/questions`, data);
    return response.data;
  },

  /**
   * Update a question (admin)
   */
  updateQuestion: async (questionId, data) => {
    const response = await api.put(`/quiz/questions/${questionId}`, data);
    return response.data;
  },

  /**
   * Delete a question (admin)
   */
  deleteQuestion: async (questionId) => {
    const response = await api.delete(`/quiz/questions/${questionId}`);
    return response.data;
  },

  /**
   * Reorder questions (admin)
   */
  reorderQuestions: async (quizId, order) => {
    const response = await api.put(`/quiz/${quizId}/questions/reorder`, { order });
    return response.data;
  },

  // ==================== RESPONSES ====================

  /**
   * Submit quiz response
   */
  submitResponse: async (data) => {
    const response = await api.post("/quiz/responses", data);
    return response.data;
  },

  /**
   * Get user's responses
   */
  getMyResponses: async () => {
    const response = await api.get("/quiz/responses");
    return response.data;
  },

  /**
   * Get user's response for a specific quiz
   */
  getMyQuizResponse: async (slug) => {
    const response = await api.get(`/quiz/${slug}/my-response`);
    return response.data;
  },

  /**
   * Get all responses for a quiz (admin)
   */
  getQuizResponses: async (quizId, page = 1, limit = 20) => {
    const response = await api.get(`/quiz/${quizId}/responses?page=${page}&limit=${limit}`);
    return response.data;
  },
};



