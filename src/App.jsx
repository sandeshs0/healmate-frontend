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

// Public Pages
import OurDoctors from "./pages/OurDoctors";
import DoctorProfile from "./pages/DoctorProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDoctorDetail from "./pages/admin/DoctorDetail";
import AdminDoctorForm from "./pages/admin/DoctorForm";
import AdminDoctors from "./pages/admin/Doctors";
import AdminQuizDetail from "./pages/admin/QuizDetail";
import AdminQuizForm from "./pages/admin/QuizForm";
import AdminQuizResponses from "./pages/admin/QuizResponses";
import AdminQuizzes from "./pages/admin/Quizzes";
import AdminUsers from "./pages/admin/Users";
import AdminUserDetail from "./pages/admin/UserDetail";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorBookings from "./pages/doctor/Bookings";
import DoctorHistory from "./pages/doctor/History";
import DoctorCalendar from "./pages/doctor/Calendar";
import DoctorEarnings from "./pages/doctor/Earnings";
import DoctorNotes from "./pages/doctor/Notes";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import UserBookings from "./pages/user/Bookings";
import UserQuizResponses from "./pages/user/QuizResponses";
import UserCalendar from "./pages/user/Calendar";
import UserHistory from "./pages/user/History";
import UserProfile from "./pages/user/Profile";
import UserChat from "./pages/user/Chat";

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

          {/* Public Pages */}
          <Route path="/our-doctors" element={<OurDoctors />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />

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
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDoctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors/new"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDoctorForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDoctorDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors/:id/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDoctorForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUserDetail />
              </ProtectedRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/bookings"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/history"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/calendar"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/earnings"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorEarnings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/notes"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorNotes />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/bookings"
            element={
              <ProtectedRoute>
                <UserBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/quizzes"
            element={
              <ProtectedRoute>
                <UserQuizResponses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/calendar"
            element={
              <ProtectedRoute>
                <UserCalendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <ProtectedRoute>
                <UserHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/chat"
            element={
              <ProtectedRoute>
                <UserChat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
