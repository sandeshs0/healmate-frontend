import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  RefreshCw,
  Mail,
  Calendar,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { doctorService } from "../../services/doctorService";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [deleteModal, setDeleteModal] = useState(null);
  const [regenerateModal, setRegenerateModal] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, [pagination.page, searchTerm]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const { doctors: doctorsData, pagination: paginationData } =
        await doctorService.getDoctors(
          pagination.page,
          pagination.limit,
          searchTerm
        );
      setDoctors(doctorsData || []);
      setPagination((prev) => ({
        ...prev,
        total: paginationData.total,
        totalPages: paginationData.totalPages,
      }));
    } catch (error) {
      console.error("Failed to load doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (doctor) => {
    try {
      await doctorService.deleteDoctor(doctor.id);
      setDoctors((prev) => prev.filter((d) => d.id !== doctor.id));
      setDeleteModal(null);
    } catch (error) {
      console.error("Failed to delete doctor:", error);
      alert(error.response?.data?.error || "Failed to delete doctor");
    }
  };

  const handleRegenerateRoomId = async (doctor) => {
    try {
      const { doctor: updatedDoctor } = await doctorService.regenerateJitsiRoomId(
        doctor.id
      );
      setDoctors((prev) =>
        prev.map((d) =>
          d.id === doctor.id
            ? { ...d, jitsiRoomId: updatedDoctor.jitsiRoomId }
            : d
        )
      );
      setRegenerateModal(null);
      alert("Jitsi Room ID regenerated successfully");
    } catch (error) {
      console.error("Failed to regenerate room ID:", error);
      alert(error.response?.data?.error || "Failed to regenerate room ID");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Doctors</h1>
            <p className="text-gray-500">Onboard and manage doctor profiles</p>
          </div>
          <Link
            to="/admin/doctors/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            <Plus size={20} />
            Add Doctor
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className="h-20 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <p className="text-gray-500">Loading doctors...</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm ? "No doctors found" : "No doctors onboarded yet"}
              </p>
              {!searchTerm && (
                <Link
                  to="/admin/doctors/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  <Plus size={20} />
                  Add First Doctor
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Specialties
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {doctor.profilePicture && (
                            <img
                              src={doctor.profilePicture}
                              alt={doctor.user?.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              Dr. {doctor.user?.name || "N/A"}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail size={14} />
                              {doctor.user?.email}
                            </p>
                            {doctor.nmcNumber && (
                              <p className="text-xs text-gray-400 mt-1">
                                NMC: {doctor.nmcNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {doctor.specialties?.slice(0, 2).map((spec, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                          {doctor.specialties?.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              +{doctor.specialties.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {doctor._count?.bookings || 0} bookings
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(doctor.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/doctors/${doctor.id}`}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            to={`/admin/doctors/${doctor.id}/edit`}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Doctor"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => setRegenerateModal(doctor)}
                            className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Regenerate Room ID"
                          >
                            <RefreshCw size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteModal(doctor)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Doctor"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-600">
              Showing page {pagination.page} of {pagination.totalPages} (
              {pagination.total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: Math.max(1, prev.page - 1),
                  }))
                }
                disabled={pagination.page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    page: Math.min(pagination.totalPages, prev.page + 1),
                  }))
                }
                disabled={pagination.page === pagination.totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Doctor?
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to remove "{deleteModal.user?.name}" as a
              doctor? This will remove their doctor profile but keep their user
              account. This action cannot be undone.
            </p>
            {deleteModal._count?.bookings > 0 && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                ⚠️ This doctor has {deleteModal._count.bookings} booking(s). You
                may need to handle these first.
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Delete Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Room ID Modal */}
      {regenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Regenerate Jitsi Room ID?
            </h3>
            <p className="text-gray-500 mb-4">
              This will generate a new Jitsi Room ID for "{regenerateModal.user?.name}". The old room ID will no longer
              work.
            </p>
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Current Room ID:</p>
              <p className="text-sm font-mono text-gray-700 break-all">
                {regenerateModal.jitsiRoomId}
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setRegenerateModal(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRegenerateRoomId(regenerateModal)}
                className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg font-medium transition-colors"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

