import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  FileQuestion,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { quizService } from "../../services/quizService";

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const { quizzes } = await quizService.getAllQuizzes();
      setQuizzes(quizzes || []);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (quiz) => {
    try {
      await quizService.updateQuiz(quiz.id, { isActive: !quiz.isActive });
      setQuizzes((prev) =>
        prev.map((q) =>
          q.id === quiz.id ? { ...q, isActive: !q.isActive } : q
        )
      );
    } catch (error) {
      console.error("Failed to toggle quiz:", error);
    }
  };

  const handleDelete = async (quiz) => {
    try {
      await quizService.deleteQuiz(quiz.id);
      setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
      setDeleteModal(null);
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.problemTag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Quizzes</h1>
            <p className="text-gray-500">Create and manage assessment quizzes</p>
          </div>
          <Link
            to="/admin/quizzes/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Plus size={20} />
            Create Quiz
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Quizzes Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <p className="text-gray-500">Loading quizzes...</p>
            </div>
          ) : filteredQuizzes.length === 0 ? (
            <div className="p-12 text-center">
              <FileQuestion size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No quizzes found" : "No quizzes created yet"}
              </p>
              {!searchTerm && (
                <Link
                  to="/admin/quizzes/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  <Plus size={20} />
                  Create First Quiz
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Problem Tag
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Responses
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredQuizzes.map((quiz) => (
                    <tr key={quiz.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {quiz.title}
                          </p>
                          <p className="text-sm text-gray-500">{quiz.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {quiz.problemTag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {quiz._count?.questions || 0}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {quiz._count?.responses || 0}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(quiz)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            quiz.isActive
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {quiz.isActive ? (
                            <>
                              <ToggleRight size={14} />
                              Active
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={14} />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/quizzes/${quiz.id}/responses`}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Responses"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/admin/quizzes/${quiz.id}`}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            title="View & Edit Questions"
                          >
                            <FileQuestion size={18} />
                          </Link>
                          <Link
                            to={`/admin/quizzes/${quiz.id}/edit`}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Quiz"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => setDeleteModal(quiz)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Quiz"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Quiz?
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete "{deleteModal.title}"? This will
              also delete all questions and responses. This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Delete Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

