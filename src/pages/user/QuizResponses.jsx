import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion, CheckCircle } from "lucide-react";
import UserLayout from "../../layouts/UserLayout";

export default function UserQuizResponses() {
  return (
    <UserLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quiz Responses</h1>
          <p className="text-gray-500">View all your quiz responses and results</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <FileQuestion size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Quiz Responses Coming Soon
          </h3>
          <p className="text-gray-500 mb-6">
            This page will display all your quiz responses, allowing you to review your answers and track your progress.
          </p>
          <Link
            to="/healmate-quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Take a Quiz
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}

