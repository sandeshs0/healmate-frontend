import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileQuestion, ArrowRight, Lock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { quizService } from "../services/quizService";
import { useAuth } from "../contexts/AuthContext";

export default function QuizSelection() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const { quizzes } = await quizService.getQuizzes();
      setQuizzes(quizzes || []);
    } catch (error) {
      console.error("Failed to load quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeQuiz = (slug) => {
    if (!token) {
      navigate("/login", { state: { returnTo: `/quiz/${slug}` } });
      return;
    }
    navigate(`/quiz/${slug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Choose Your Assessment
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the quiz that matches your concern. Our doctors will use
              your responses to provide personalized guidance.
            </p>
          </div>

          {/* Quizzes Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-20">
              <FileQuestion size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No quizzes available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FileQuestion size={24} className="text-primary" />
                    </div>
                    <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      {quiz.problemTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                    {quiz.title}
                  </h3>
                  {quiz.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {quiz._count?.questions || 0} questions
                    </span>
                    <button
                      onClick={() => handleTakeQuiz(quiz.slug)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors group-hover:gap-3"
                    >
                      {token ? "Take Quiz" : "Login to Start"}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Section */}
          {!token && (
            <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
              <Lock size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Login Required
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                You need to be logged in to take a quiz. Your responses are
                kept confidential and help our doctors provide better guidance.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Login to Continue
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

