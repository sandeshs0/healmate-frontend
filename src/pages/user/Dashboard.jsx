import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileQuestion,
  Clock,
  CheckCircle,
  ArrowRight,
  User,
  MessageSquare,
} from "lucide-react";
import UserLayout from "../../layouts/UserLayout";
import { useAuth } from "../../contexts/AuthContext";
import { quizService } from "../../services/quizService";

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalBookings: 0,
    upcomingSessions: 0,
    completedSessions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      // Load user's quiz responses
      const quizResponses = await quizService.getMyResponses().catch(() => ({ responses: [] }));

      setStats({
        totalQuizzes: quizResponses?.responses?.length || 0,
        totalBookings: 0, // Will be implemented when booking APIs are ready
        upcomingSessions: 0,
        completedSessions: 0,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || "User"}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Quizzes Taken */}
          <Link
            to="/dashboard/quizzes"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileQuestion size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalQuizzes}
            </div>
            <div className="text-sm text-gray-500">Quizzes Taken</div>
          </Link>

          {/* Upcoming Sessions */}
          <Link
            to="/dashboard/bookings"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.upcomingSessions}
            </div>
            <div className="text-sm text-gray-500">Upcoming Sessions</div>
          </Link>

          {/* Completed Sessions */}
          <Link
            to="/dashboard/history"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.completedSessions}
            </div>
            <div className="text-sm text-gray-500">Completed Sessions</div>
          </Link>

          {/* Total Bookings */}
          <Link
            to="/dashboard/bookings"
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalBookings}
            </div>
            <div className="text-sm text-gray-500">Total Bookings</div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/healmate-quiz"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileQuestion size={20} className="text-primary" />
                  <span className="font-medium text-gray-900">Take a Quiz</span>
                </div>
                <ArrowRight size={18} className="text-gray-400" />
              </Link>
              <Link
                to="/our-doctors"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User size={20} className="text-primary" />
                  <span className="font-medium text-gray-900">Browse Doctors</span>
                </div>
                <ArrowRight size={18} className="text-gray-400" />
              </Link>
              <Link
                to="/dashboard/calendar"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-medium text-gray-900">View Calendar</span>
                </div>
                <ArrowRight size={18} className="text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FileQuestion size={20} className="text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Quiz Completed
                  </p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar size={20} className="text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Session Booked
                  </p>
                  <p className="text-xs text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

