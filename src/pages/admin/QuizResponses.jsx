import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { quizService } from "../../services/quizService";

export default function QuizResponses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [selectedResponse, setSelectedResponse] = useState(null);

  useEffect(() => {
    loadData();
  }, [id, pagination.page]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load quiz details
      const { quizzes } = await quizService.getAllQuizzes();
      const quizMeta = quizzes.find((q) => q.id === id);
      if (!quizMeta) {
        navigate("/admin/quizzes");
        return;
      }
      const { quiz: quizData } = await quizService.getQuizBySlug(quizMeta.slug);
      setQuiz(quizData);

      // Load responses
      const { responses: responseData, pagination: paginationData } =
        await quizService.getQuizResponses(id, pagination.page, pagination.limit);
      setResponses(responseData || []);
      setPagination((prev) => ({
        ...prev,
        total: paginationData.total,
        totalPages: paginationData.totalPages,
      }));
    } catch (error) {
      console.error("Failed to load responses:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAnswerDisplay = (answer, question) => {
    if (!answer) return <span className="text-gray-400 italic">No answer</span>;
    
    if (typeof answer === "string") {
      // Single select or text
      if (question?.type === "text") {
        return <span className="text-gray-700">{answer}</span>;
      }
      // Find option text
      const option = question?.options?.find((opt) => opt.id === answer);
      return option ? (
        <span className="text-gray-700">{option.text}</span>
      ) : (
        <span className="text-gray-500">{answer}</span>
      );
    }
    
    if (Array.isArray(answer)) {
      // Multiple select
      const selectedOptions = question?.options?.filter((opt) =>
        answer.includes(opt.id)
      );
      if (selectedOptions && selectedOptions.length > 0) {
        return (
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((opt) => (
              <span
                key={opt.id}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
              >
                {opt.text}
              </span>
            ))}
          </div>
        );
      }
      return <span className="text-gray-500">{answer.join(", ")}</span>;
    }
    
    return <span className="text-gray-500">{JSON.stringify(answer)}</span>;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => navigate(`/admin/quizzes/${id}`)}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Quiz
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Quiz Responses
          </h1>
          <p className="text-gray-500">
            {quiz?.title} • {pagination.total} total responses
          </p>
        </div>

        {/* Responses List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : responses.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No responses yet</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Answers
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {responses.map((response) => (
                      <tr key={response.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User size={18} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {response.user?.name || "Anonymous"}
                              </p>
                              <p className="text-sm text-gray-500">
                                {response.user?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(response.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              response.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {response.completed ? "Completed" : "In Progress"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {response.answers?.length || 0} answers
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedResponse(response)}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.max(1, prev.page - 1),
                      }))
                    }
                    disabled={pagination.page === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.min(
                          pagination.totalPages,
                          prev.page + 1
                        ),
                      }))
                    }
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Response Detail Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Response Details
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedResponse.user?.name || "Anonymous"} •{" "}
                  {formatDate(selectedResponse.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedResponse(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {quiz?.questions
                ?.sort((a, b) => a.order - b.order)
                .map((question) => {
                  const answer = selectedResponse.answers?.find(
                    (a) => a.questionId === question.id
                  )?.answer;

                  return (
                    <div
                      key={question.id}
                      className="border-b border-gray-100 pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">
                          {question.order + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {question.prompt}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {question.type === "single"
                                ? "Single Select"
                                : question.type === "multiple"
                                ? "Multiple Select"
                                : "Text Input"}
                            </span>
                            {question.isRequired && (
                              <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                                Required
                              </span>
                            )}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            {answer ? (
                              getAnswerDisplay(answer, question)
                            ) : (
                              <span className="text-gray-400 italic">
                                No answer provided
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedResponse(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

