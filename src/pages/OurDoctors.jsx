import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, Award, Mail, Calendar } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { doctorService } from "../services/doctorService";
import { SkeletonGrid, SkeletonDoctorCard } from "../components/ui/Skeleton";

const commonSpecialties = [
  "Erectile Dysfunction",
  "Premature Ejaculation",
  "Low Libido",
  "Performance Anxiety",
  "Intimacy Issues",
  "Sexual Health Counseling",
];

export default function OurDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadDoctors();
  }, [pagination.page, searchTerm, selectedSpecialty]);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const { doctors: doctorsData, pagination: paginationData } =
        await doctorService.getPublicDoctors(
          pagination.page,
          pagination.limit,
          searchTerm,
          selectedSpecialty
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

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSpecialtyFilter = (specialty) => {
    setSelectedSpecialty(specialty === selectedSpecialty ? "" : specialty);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Our Expert Doctors
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our team of qualified and experienced doctors dedicated to
              providing personalized guidance and support.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by doctor name..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </form>

            {/* Specialty Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {commonSpecialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => handleSpecialtyFilter(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedSpecialty === specialty
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {specialty}
                </button>
              ))}
              {selectedSpecialty && (
                <button
                  onClick={() => setSelectedSpecialty("")}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Doctors Grid */}
          {loading ? (
            <SkeletonGrid count={6} CardComponent={SkeletonDoctorCard} />
          ) : doctors.length === 0 ? (
            <div className="text-center py-20">
              <User size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No doctors found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all"
                  >
                    {/* Profile Picture */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        {doctor.profilePicture ? (
                          <img
                            src={doctor.profilePicture}
                            alt={doctor.user?.name || "Doctor"}
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={32} className="text-primary" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
                          Dr. {doctor.user?.name || "Doctor"}
                        </h3>
                        {doctor.nmcNumber && (
                          <p className="text-xs text-gray-500 mb-2">
                            NMC: {doctor.nmcNumber}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    {doctor.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {doctor.bio}
                      </p>
                    )}

                    {/* Specialties */}
                    {doctor.specialties && doctor.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {doctor.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                          {doctor.specialties.length > 3 && (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              +{doctor.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}`)}
                        className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                      >
                        View Profile
                      </button>
                      <button className="px-4 py-2.5 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.max(1, prev.page - 1),
                      }))
                    }
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: Math.min(prev.totalPages, prev.page + 1),
                      }))
                    }
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

