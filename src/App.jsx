import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

// Quiz Pages
import QuizSelection from "./pages/QuizSelection";
import TakeQuiz from "./pages/TakeQuiz";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminQuizDetail from "./pages/admin/QuizDetail";
import AdminQuizForm from "./pages/admin/QuizForm";
import AdminQuizResponses from "./pages/admin/QuizResponses";
import AdminQuizzes from "./pages/admin/Quizzes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Quiz Routes */}
          <Route path="/healmate-quiz" element={<QuizSelection />} />
          <Route path="/quiz" element={<QuizSelection />} />
          <Route
            path="/quiz/:slug"
            element={
              <ProtectedRoute>
                <TakeQuiz />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizzes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes/new"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/quizzes/:id/responses"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminQuizResponses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
