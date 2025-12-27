import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileQuestion,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { quizService } from "../../services/quizService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    quizzes: 0,
    loading: true,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { quizzes } = await quizService.getAllQuizzes();
      setStats({
        quizzes: quizzes?.length || 0,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      label: "Total Quizzes",
      value: stats.quizzes,
      icon: FileQuestion,
      color: "bg-blue-500",
      href: "/admin/quizzes",
    },
    {
      label: "Active Doctors",
      value: 0,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/doctors",
    },
    {
      label: "Total Bookings",
      value: 0,
      icon: Calendar,
      color: "bg-purple-500",
      href: "/admin/bookings",
    },
    {
      label: "This Month",
      value: 0,
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "/admin/bookings",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {stats.loading ? "..." : stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/quizzes/new"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FileQuestion size={20} className="text-primary" />
              <span className="font-medium text-gray-700">Create New Quiz</span>
            </Link>
            <Link
              to="/admin/doctors"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users size={20} className="text-primary" />
              <span className="font-medium text-gray-700">Manage Doctors</span>
            </Link>
            <Link
              to="/admin/bookings"
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar size={20} className="text-primary" />
              <span className="font-medium text-gray-700">View Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}



