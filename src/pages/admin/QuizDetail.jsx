import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { quizService } from "../../services/quizService";

const questionTypes = [
  { value: "single", label: "Single Selection" },
  { value: "multiple", label: "Multiple Selection" },
  { value: "text", label: "Text Input" },
];

export default function AdminQuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [questionForm, setQuestionForm] = useState({
    prompt: "",
    type: "single",
    options: [
      { id: "opt1", text: "" },
      { id: "opt2", text: "" },
    ],
    isRequired: true,
    conditionalOn: "",
    conditionalValue: "",
  });

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      // Fetch all quizzes and find by ID to get slug
      const { quizzes } = await quizService.getAllQuizzes();
      const quizMeta = quizzes.find((q) => q.id === id);
      if (!quizMeta) {
        navigate("/admin/quizzes");
        return;
      }
      const { quiz } = await quizService.getQuizBySlug(quizMeta.slug);
      setQuiz(quiz);
    } catch (error) {
      console.error("Failed to load quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      prompt: "",
      type: "single",
      options: [
        { id: "opt1", text: "" },
        { id: "opt2", text: "" },
      ],
      isRequired: true,
      conditionalOn: "",
      conditionalValue: "",
    });
    setEditingQuestion(null);
    setShowQuestionForm(false);
  };

  const handleEditQuestion = (question) => {
    setQuestionForm({
      prompt: question.prompt,
      type: question.type,
      options: question.options || [
        { id: "opt1", text: "" },
        { id: "opt2", text: "" },
      ],
      isRequired: question.isRequired,
      conditionalOn: question.conditionalOn || "",
      conditionalValue: question.conditionalValue || "",
    });
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleAddOption = () => {
    const newId = `opt${Date.now()}`;
    setQuestionForm((prev) => ({
      ...prev,
      options: [...prev.options, { id: newId, text: "" }],
    }));
  };

  const handleRemoveOption = (index) => {
    if (questionForm.options.length <= 2) return;
    setQuestionForm((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleOptionChange = (index, value) => {
    setQuestionForm((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, text: value } : opt
      ),
    }));
  };

  const handleSaveQuestion = async () => {
    setError("");
    setSaving(true);

    try {
      const data = {
        prompt: questionForm.prompt,
        type: questionForm.type,
        isRequired: questionForm.isRequired,
        conditionalOn: questionForm.conditionalOn || undefined,
        conditionalValue: questionForm.conditionalValue || undefined,
      };

      if (questionForm.type !== "text") {
        data.options = questionForm.options.filter((o) => o.text.trim());
        if (data.options.length < 2) {
          setError("At least 2 options are required");
          setSaving(false);
          return;
        }
      }

      if (editingQuestion) {
        await quizService.updateQuestion(editingQuestion.id, data);
      } else {
        data.order = quiz.questions?.length || 0;
        await quizService.addQuestion(id, data);
      }

      await loadQuiz();
      resetQuestionForm();
    } catch (error) {
      console.error("Failed to save question:", error);
      setError(error.response?.data?.error || "Failed to save question");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      await quizService.deleteQuestion(questionId);
      await loadQuiz();
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (!quiz) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Quiz not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/admin/quizzes")}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2"
            >
              <ArrowLeft size={20} />
              Back to Quizzes
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-500">
              {quiz.questions?.length || 0} questions · {quiz.problemTag}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/admin/quizzes/${id}/edit`}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
            >
              <Edit size={18} />
              Edit Details
            </Link>
            <button
              onClick={() => setShowQuestionForm(true)}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Add Question
            </button>
          </div>
        </div>

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </h3>
                <button
                  onClick={resetQuestionForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {/* Question Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    value={questionForm.prompt}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({
                        ...prev,
                        prompt: e.target.value,
                      }))
                    }
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Enter your question..."
                  />
                </div>

                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer Type *
                  </label>
                  <select
                    value={questionForm.type}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {questionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Options (for single/multiple) */}
                {questionForm.type !== "text" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options *
                    </label>
                    <div className="space-y-2">
                      {questionForm.options.map((option, index) => (
                        <div key={option.id} className="flex gap-2">
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            placeholder={`Option ${index + 1}`}
                          />
                          {questionForm.options.length > 2 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(index)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="mt-2 text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                {/* Conditional Logic */}
                {quiz.questions?.length > 0 && (
                  <div className="border-t border-gray-100 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Conditional Display (optional)
                    </label>
                    <p className="text-xs text-gray-500 mb-3">
                      Show this question only if a specific answer was selected
                      in a previous question.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <select
                        value={questionForm.conditionalOn}
                        onChange={(e) =>
                          setQuestionForm((prev) => ({
                            ...prev,
                            conditionalOn: e.target.value,
                            conditionalValue: "",
                          }))
                        }
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Always show</option>
                        {quiz.questions
                          .filter((q) => q.id !== editingQuestion?.id)
                          .map((q) => (
                            <option key={q.id} value={q.id}>
                              {q.prompt.substring(0, 50)}...
                            </option>
                          ))}
                      </select>
                      {questionForm.conditionalOn && (
                        <select
                          value={questionForm.conditionalValue}
                          onChange={(e) =>
                            setQuestionForm((prev) => ({
                              ...prev,
                              conditionalValue: e.target.value,
                            }))
                          }
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">Select trigger answer</option>
                          {quiz.questions
                            .find((q) => q.id === questionForm.conditionalOn)
                            ?.options?.map((opt) => (
                              <option key={opt.id} value={opt.id}>
                                {opt.text}
                              </option>
                            ))}
                        </select>
                      )}
                    </div>
                  </div>
                )}

                {/* Required */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={questionForm.isRequired}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({
                        ...prev,
                        isRequired: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="isRequired" className="text-sm text-gray-700">
                    This question is required
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={resetQuestionForm}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuestion}
                  disabled={saving || !questionForm.prompt.trim()}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      {editingQuestion ? "Update Question" : "Add Question"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {quiz.questions?.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No questions added yet</p>
              <button
                onClick={() => setShowQuestionForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                <Plus size={20} />
                Add First Question
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {quiz.questions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                  <div
                    key={question.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 text-gray-400 pt-1">
                        <GripVertical size={18} className="cursor-grab" />
                        <span className="text-sm font-medium w-6">
                          {index + 1}.
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 mb-2">
                          {question.prompt}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {question.type === "single"
                              ? "Single Select"
                              : question.type === "multiple"
                              ? "Multi Select"
                              : "Text Input"}
                          </span>
                          {question.isRequired && (
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded">
                              Required
                            </span>
                          )}
                          {question.conditionalOn && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                              Conditional
                            </span>
                          )}
                        </div>
                        {question.options && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {question.options.map((opt) => (
                              <span
                                key={opt.id}
                                className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                              >
                                {opt.text}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditQuestion(question)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

