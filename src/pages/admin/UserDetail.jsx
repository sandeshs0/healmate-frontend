import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  FileQuestion,
  CheckCircle,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";
import { SkeletonProfile } from "../../components/ui/Skeleton";

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const { user: userData } = await userService.getUserById(id);
      setUser(userData);
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "doctor":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBookingStatusColor = (status) => {
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="max-w-6xl">
          <SkeletonProfile />
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="max-w-6xl">
          <div className="text-center py-20">
            <User size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">User not found</p>
            <button
              onClick={() => navigate("/admin/users")}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Back to Users
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/users")}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Users
          </button>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User size={40} className="text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "No name"}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Mail size={16} />
                <span>{user.email}</span>
                {user.emailVerified ? (
                  <span className="inline-flex items-center gap-1 text-green-600 text-sm ml-2">
                    <CheckCircle size={14} />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-400 text-sm ml-2">
                    <XCircle size={14} />
                    Unverified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user.consentAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} />
                    <span>
                      Consent: {new Date(user.consentAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {user._count?.quizResponses || 0}
              </div>
              <div className="text-sm text-gray-500">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {user._count?.bookings || 0}
              </div>
              <div className="text-sm text-gray-500">Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {user.bookings?.filter((b) => b.status === "completed").length || 0}
              </div>
              <div className="text-sm text-gray-500">Completed Sessions</div>
            </div>
          </div>
        </div>

        {/* Doctor Profile (if applicable) */}
        {user.doctor && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Doctor Profile
            </h3>
            <div className="space-y-3">
              {user.doctor.bio && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Bio:</span>
                  <p className="text-gray-700 mt-1">{user.doctor.bio}</p>
                </div>
              )}
              {user.doctor.specialties && user.doctor.specialties.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.doctor.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {user.doctor.nmcNumber && (
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    NMC Number:
                  </span>
                  <span className="text-gray-700 ml-2">{user.doctor.nmcNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quiz Responses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileQuestion size={20} />
            Quiz Responses ({user.quizResponses?.length || 0})
          </h3>
          {user.quizResponses && user.quizResponses.length > 0 ? (
            <div className="space-y-4">
              {user.quizResponses.map((response) => (
                <div
                  key={response.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {response.quiz.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {response.quiz.problemTag}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {response.completed ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle size={14} />
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-sm">
                          <Clock size={14} />
                          In Progress
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(response.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <details className="cursor-pointer">
                      <summary className="text-sm text-primary hover:text-primary-dark">
                        View Answers
                      </summary>
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                          {JSON.stringify(response.answers, null, 2)}
                        </pre>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileQuestion size={48} className="mx-auto text-gray-300 mb-2" />
              <p>No quiz responses yet</p>
            </div>
          )}
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Bookings ({user.bookings?.length || 0})
          </h3>
          {user.bookings && user.bookings.length > 0 ? (
            <div className="space-y-4">
              {user.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Dr. {booking.doctor?.user?.name || "Unknown Doctor"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {booking.slot
                          ? new Date(booking.slot.start).toLocaleString()
                          : "No slot assigned"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  {booking.summary && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Session Summary:
                      </p>
                      <p className="text-sm text-gray-600">{booking.summary}</p>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-400">
                    Created: {new Date(booking.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto text-gray-300 mb-2" />
              <p>No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

