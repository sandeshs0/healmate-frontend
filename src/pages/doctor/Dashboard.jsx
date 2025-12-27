import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Users,
  ArrowRight,
  FileText,
} from "lucide-react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { bookingService } from "../../services/bookingService";
import { SkeletonCard } from "../../components/ui/Skeleton";
import { useAuth } from "../../contexts/AuthContext";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [statsData, bookingsData] = await Promise.all([
        bookingService.getDoctorStats(),
        bookingService.getDoctorUpcoming(5),
      ]);
      setStats(statsData.stats);
      setUpcomingBookings(bookingsData.bookings || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
      setBookingsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "paid":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DoctorLayout>
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. {user?.name || "Doctor"}</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Bookings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.totalBookings || 0}
              </div>
              <div className="text-sm text-gray-500">Total Bookings</div>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-yellow-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.upcomingBookings || 0}
              </div>
              <div className="text-sm text-gray-500">Upcoming Sessions</div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stats?.completedBookings || 0}
              </div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign size={24} className="text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${((stats?.totalRevenue || 0) / 100).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Total Revenue</div>
            </div>
          </div>
        )}

        {/* Rating Card */}
        {stats && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your Rating
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= Math.round(stats.averageRating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {stats.averageRating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-gray-500">
                    ({stats.totalReviews || 0} reviews)
                  </span>
                </div>
              </div>
              <Link
                to="/doctors/profile"
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                View Profile
              </Link>
            </div>
          </div>
        )}

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Sessions
            </h2>
            <Link
              to="/doctor/bookings"
              className="text-primary hover:text-primary-dark text-sm font-medium inline-flex items-center gap-1"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {bookingsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No upcoming sessions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {booking.user?.name || "Patient"}
                        </h3>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>
                            {booking.slot
                              ? formatDate(booking.slot.start)
                              : "No date set"}
                          </span>
                        </div>
                        {booking.payment && (
                          <div className="flex items-center gap-1">
                            <DollarSign size={16} />
                            <span>${booking.payment.amountUsd / 100}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Link
                      to={`/doctor/bookings/${booking.id}`}
                      className="text-primary hover:text-primary-dark text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
}

