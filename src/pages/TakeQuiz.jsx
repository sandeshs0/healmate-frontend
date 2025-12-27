import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { quizService } from "../services/quizService";
import { useAuth } from "../contexts/AuthContext";

export default function TakeQuiz() {
  const { slug } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Filter questions based on conditional logic
  const [visibleQuestions, setVisibleQuestions] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { returnTo: `/quiz/${slug}` } });
      return;
    }
    loadQuiz();
  }, [slug, token]);

  useEffect(() => {
    if (quiz?.questions) {
      filterVisibleQuestions();
    }
  }, [quiz, answers]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const { quiz: quizData } = await quizService.getQuizBySlug(slug);
      setQuiz(quizData);
      
      // Load existing response if any
      try {
        const { response } = await quizService.getMyQuizResponse(slug);
        if (response && response.answers) {
          const answerMap = {};
          response.answers.forEach((ans) => {
            answerMap[ans.questionId] = ans.answer;
          });
          setAnswers(answerMap);
          if (response.completed) {
            setSubmitted(true);
          }
        }
      } catch (e) {
        // No existing response, that's fine
      }
    } catch (error) {
      console.error("Failed to load quiz:", error);
      setError("Failed to load quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterVisibleQuestions = () => {
    if (!quiz?.questions) return;

    const visible = [];
    const questionMap = {};
    quiz.questions.forEach((q) => {
      questionMap[q.id] = q;
    });

    quiz.questions
      .sort((a, b) => a.order - b.order)
      .forEach((question) => {
        // If no conditional logic, always show
        if (!question.conditionalOn) {
          visible.push(question);
          return;
        }

        // Check if conditional is met
        const previousAnswer = answers[question.conditionalOn];
        if (previousAnswer) {
          // For single select, check if answer matches conditionalValue
          if (typeof previousAnswer === "string") {
            if (previousAnswer === question.conditionalValue) {
              visible.push(question);
            }
          }
          // For multiple select (array), check if conditionalValue is in array
          else if (Array.isArray(previousAnswer)) {
            if (previousAnswer.includes(question.conditionalValue)) {
              visible.push(question);
            }
          }
        }
      });

    setVisibleQuestions(visible);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveProgress = async () => {
    setSaving(true);
    setError("");

    try {
      const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      await quizService.submitResponse({
        quizId: quiz.id,
        answers: answerArray,
        completed: false,
      });

      // Show success message briefly
      const successMsg = document.createElement("div");
      successMsg.className =
        "fixed top-20 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
      successMsg.textContent = "Progress saved!";
      document.body.appendChild(successMsg);
      setTimeout(() => {
        document.body.removeChild(successMsg);
      }, 2000);
    } catch (error) {
      console.error("Failed to save progress:", error);
      setError("Failed to save progress. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!confirm("Are you sure you want to submit? You won't be able to change your answers.")) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      // Check required questions
      const requiredQuestions = visibleQuestions.filter((q) => q.isRequired);
      const missingRequired = requiredQuestions.filter(
        (q) => !answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0)
      );

      if (missingRequired.length > 0) {
        setError(`Please answer all required questions. ${missingRequired.length} remaining.`);
        setSaving(false);
        return;
      }

      await quizService.submitResponse({
        quizId: quiz.id,
        answers: answerArray,
        completed: true,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      setError(error.response?.data?.error || "Failed to submit quiz. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="space-y-2 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-20">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="text-gray-500">{error}</p>
          <button
            onClick={() => navigate("/healmate-quiz")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Back to Quizzes
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / visibleQuestions.length) * 100;
  const canGoNext = currentQuestionIndex < visibleQuestions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const isLastQuestion = currentQuestionIndex === visibleQuestions.length - 1;
  const currentAnswer = answers[currentQuestion?.id];

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-green-50 rounded-2xl p-12">
              <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Quiz Submitted Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for completing the assessment. Our doctors will review
                your responses and you can proceed to book a session.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/healmate-quiz")}
                className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Take Another Quiz
              </button>
                <button
                  onClick={() => navigate("/doctors")}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {visibleQuestions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Quiz Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/healmate-quiz")}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft size={20} />
              Back to Quizzes
            </button>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              {quiz.title}
            </h1>
            {quiz.description && (
              <p className="text-gray-600">{quiz.description}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Question Card */}
          {currentQuestion && (
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentQuestion.prompt}
                </h2>
                {currentQuestion.isRequired && (
                  <span className="inline-block px-2 py-1 bg-red-50 text-red-600 rounded text-xs font-medium">
                    Required
                  </span>
                )}
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestion.type === "text" ? (
                  <textarea
                    value={currentAnswer || ""}
                    onChange={(e) =>
                      handleAnswer(currentQuestion.id, e.target.value)
                    }
                    rows={4}
                    placeholder="Type your answer here..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                ) : currentQuestion.type === "single" ? (
                  currentQuestion.options?.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        currentAnswer === option.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.id}
                        checked={currentAnswer === option.id}
                        onChange={() => handleAnswer(currentQuestion.id, option.id)}
                        className="w-5 h-5 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span className="flex-1 text-gray-700">{option.text}</span>
                    </label>
                  ))
                ) : (
                  // Multiple selection
                  currentQuestion.options?.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        Array.isArray(currentAnswer) && currentAnswer.includes(option.id)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(currentAnswer) &&
                          currentAnswer.includes(option.id)
                        }
                        onChange={(e) => {
                          const current = Array.isArray(currentAnswer)
                            ? currentAnswer
                            : [];
                          if (e.target.checked) {
                            handleAnswer(currentQuestion.id, [...current, option.id]);
                          } else {
                            handleAnswer(
                              currentQuestion.id,
                              current.filter((id) => id !== option.id)
                            );
                          }
                        }}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="flex-1 text-gray-700">{option.text}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={20} />
              Previous
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleSaveProgress}
                disabled={saving}
                className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Progress"}
              </button>
            </div>

            {canGoNext ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving || !currentAnswer}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? "Submitting..." : "Submit Quiz"}
                <CheckCircle size={20} />
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

