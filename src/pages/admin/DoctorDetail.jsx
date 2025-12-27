import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Mail,
  Calendar,
  Clock,
  MapPin,
  RefreshCw,
  Copy,
  CheckCircle,
  Upload,
  User,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { doctorService } from "../../services/doctorService";

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadDoctor();
  }, [id]);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const { doctor: doctorData } = await doctorService.getDoctorById(id);
      setDoctor(doctorData);
    } catch (error) {
      console.error("Failed to load doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(doctor.jitsiRoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      const { doctor: updatedDoctor } = await doctorService.uploadProfilePicture(
        id,
        file
      );
      setDoctor(updatedDoctor);
      alert("Profile picture uploaded successfully");
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert(error.response?.data?.error || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset input
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="space-y-6">
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!doctor) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Doctor not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {doctor.profilePicture && (
              <img
                src={doctor.profilePicture}
                alt={doctor.user?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            )}
            <div>
              <button
                onClick={() => navigate("/admin/doctors")}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-2"
              >
                <ArrowLeft size={20} />
                Back to Doctors
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Dr. {doctor.user?.name || "Doctor Details"}
              </h1>
              <p className="text-gray-500">{doctor.user?.email}</p>
              {doctor.nmcNumber && (
                <p className="text-sm text-gray-400 mt-1">
                  NMC: {doctor.nmcNumber}
                </p>
              )}
            </div>
          </div>
          <Link
            to={`/admin/doctors/${id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Edit size={18} />
            Edit Doctor
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="text-gray-900">{doctor.user?.name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </label>
                  <p className="text-gray-900">{doctor.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bio
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {doctor.bio || "No bio provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doctor.specialties?.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Rules */}
            {doctor.scheduleRules && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock size={20} />
                  Schedule Settings
                </h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Timezone
                      </label>
                      <p className="text-gray-900">
                        {doctor.scheduleRules.timezone || "UTC"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Session Duration
                      </label>
                      <p className="text-gray-900">
                        {doctor.scheduleRules.sessionDuration || 45} minutes
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Break Duration
                      </label>
                      <p className="text-gray-900">
                        {doctor.scheduleRules.breakDuration || 15} minutes
                      </p>
                    </div>
                  </div>

                  {doctor.scheduleRules.workingHours &&
                    Object.keys(doctor.scheduleRules.workingHours).length > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 mb-2 block">
                          Working Hours
                        </label>
                        <div className="space-y-2">
                          {Object.entries(
                            doctor.scheduleRules.workingHours
                          ).map(([day, hours]) => (
                            <div
                              key={day}
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
                            >
                              <span className="w-24 text-sm font-medium text-gray-700 capitalize">
                                {day}
                              </span>
                              <span className="text-sm text-gray-600">
                                {hours.start} - {hours.end}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {doctor.scheduleRules.unavailableDates?.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-2 block">
                        Unavailable Dates
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {doctor.scheduleRules.unavailableDates.map((date) => (
                          <span
                            key={date}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
                          >
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Statistics
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Total Bookings</span>
                    <span className="text-lg font-bold text-gray-900">
                      {doctor._count?.bookings || 0}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Available Slots</span>
                    <span className="text-lg font-bold text-gray-900">
                      {doctor._count?.slots || 0}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Calendar size={14} />
                    Joined
                  </div>
                  <p className="text-sm text-gray-900">
                    {formatDate(doctor.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Picture Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Profile Picture
              </h2>
              <div className="space-y-3">
                {doctor.profilePicture ? (
                  <div className="text-center">
                    <img
                      src={doctor.profilePicture}
                      alt={doctor.user?.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50">
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        {doctor.profilePicture ? "Change Picture" : "Upload Picture"}
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Jitsi Room ID Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Jitsi Room ID
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Room ID:</p>
                  <p className="text-sm font-mono text-gray-900 break-all">
                    {doctor.jitsiRoomId}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyRoomId}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={async () => {
                      if (
                        confirm(
                          "Are you sure you want to regenerate the Jitsi Room ID? The old one will stop working."
                        )
                      ) {
                        try {
                          const { doctor: updated } =
                            await doctorService.regenerateJitsiRoomId(id);
                          setDoctor(updated);
                          alert("Room ID regenerated successfully");
                        } catch (error) {
                          alert("Failed to regenerate room ID");
                        }
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                  >
                    <RefreshCw size={16} />
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

