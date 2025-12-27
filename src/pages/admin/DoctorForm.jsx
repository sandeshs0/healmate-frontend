import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { doctorService } from "../../services/doctorService";

const commonSpecialties = [
  "Erectile Dysfunction",
  "Premature Ejaculation",
  "Low Libido",
  "Performance Anxiety",
  "Intimacy Issues",
  "Sexual Health Counseling",
];

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    // User fields (only for new doctor)
    name: "",
    email: "",
    password: "",
    // Doctor fields
    bio: "",
    specialties: [],
    nmcNumber: "",
    profilePicture: "",
    scheduleRules: {
      timezone: "UTC",
      sessionDuration: 45,
      breakDuration: 15,
      workingHours: {},
      unavailableDates: [],
    },
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newUnavailableDate, setNewUnavailableDate] = useState("");

  useEffect(() => {
    if (isEditing) {
      loadDoctor();
    }
  }, [id]);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const { doctor } = await doctorService.getDoctorById(id);
      setFormData({
        name: doctor.user?.name || "",
        email: doctor.user?.email || "",
        password: "", // Not needed for editing
        bio: doctor.bio || "",
        specialties: doctor.specialties || [],
        nmcNumber: doctor.nmcNumber || "",
        profilePicture: doctor.profilePicture || "",
        scheduleRules: doctor.scheduleRules || {
          timezone: "UTC",
          sessionDuration: 45,
          breakDuration: 15,
          workingHours: {},
          unavailableDates: [],
        },
      });
      if (doctor.profilePicture) {
        setProfilePicturePreview(doctor.profilePicture);
      }
    } catch (error) {
      console.error("Failed to load doctor:", error);
      setError("Failed to load doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("scheduleRules.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        scheduleRules: {
          ...prev.scheduleRules,
          [field]:
            type === "number" ? parseInt(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (index) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const handleAddUnavailableDate = () => {
    if (newUnavailableDate && !formData.scheduleRules.unavailableDates.includes(newUnavailableDate)) {
      setFormData((prev) => ({
        ...prev,
        scheduleRules: {
          ...prev.scheduleRules,
          unavailableDates: [
            ...prev.scheduleRules.unavailableDates,
            newUnavailableDate,
          ],
        },
      }));
      setNewUnavailableDate("");
    }
  };

  const handleRemoveUnavailableDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      scheduleRules: {
        ...prev.scheduleRules,
        unavailableDates: prev.scheduleRules.unavailableDates.filter(
          (d) => d !== date
        ),
      },
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      scheduleRules: {
        ...prev.scheduleRules,
        workingHours: {
          ...prev.scheduleRules.workingHours,
          [day]: {
            ...prev.scheduleRules.workingHours[day],
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (isEditing) {
        // Update doctor profile
        const updateData = {
          bio: formData.bio,
          specialties: formData.specialties,
          nmcNumber: formData.nmcNumber || undefined,
          profilePicture: formData.profilePicture || undefined,
        };
        
        // Only include scheduleRules if workingHours exist
        if (Object.keys(formData.scheduleRules.workingHours || {}).length > 0) {
          updateData.scheduleRules = formData.scheduleRules;
        }
        
        await doctorService.updateDoctor(id, updateData);

        // Update user info if changed
        await doctorService.updateDoctorUser(id, {
          name: formData.name,
          email: formData.email,
        });
      } else {
        // Create new doctor
        if (!formData.name || !formData.email || !formData.password) {
          setError("Name, email, and password are required");
          setSaving(false);
          return;
        }
        if (formData.specialties.length === 0) {
          setError("At least one specialty is required");
          setSaving(false);
          return;
        }

        await doctorService.createDoctor(
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            bio: formData.bio,
            specialties: formData.specialties,
            nmcNumber: formData.nmcNumber || undefined,
            profilePicture: !profilePictureFile ? formData.profilePicture || undefined : undefined,
            scheduleRules: Object.keys(formData.scheduleRules.workingHours).length > 0
              ? formData.scheduleRules
              : undefined,
          },
          profilePictureFile
        );
      }
      navigate("/admin/doctors");
    } catch (error) {
      console.error("Failed to save doctor:", error);
      setError(
        error.response?.data?.error || "Failed to save doctor. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/admin/doctors")}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Doctors
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Doctor" : "Add New Doctor"}
          </h1>
          <p className="text-gray-500">
            {isEditing
              ? "Update doctor profile and information"
              : "Create a new doctor account and profile"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* User Information */}
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              Account Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name {!isEditing && "*"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email {!isEditing && "*"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 8 characters. Doctor can change this later.
                </p>
              </div>
            )}

            {/* Doctor Profile */}
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              Doctor Profile
            </h3>

            {/* Profile Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setProfilePictureFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfilePicturePreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="profilePicture"
                    />
                    <label
                      htmlFor="profilePicture"
                      className="cursor-pointer px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-block"
                    >
                      Choose File
                    </label>
                  </div>
                  {profilePictureFile && (
                    <span className="text-sm text-gray-600">
                      {profilePictureFile.name}
                    </span>
                  )}
                </div>
                {(profilePicturePreview || formData.profilePicture) && (
                  <div className="mt-3">
                    <img
                      src={profilePicturePreview || formData.profilePicture}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Upload a profile picture (JPG, PNG, max 5MB). Or enter a URL below.
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    OR
                  </span>
                  <input
                    type="url"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* NMC Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NMC Number (Optional)
              </label>
              <input
                type="text"
                name="nmcNumber"
                value={formData.nmcNumber}
                onChange={handleChange}
                placeholder="e.g., NMC-12345"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="mt-1 text-xs text-gray-500">
                National Medical Commission registration number
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Doctor's professional bio and background..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties *
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.specialties.map((spec, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {spec}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSpecialty();
                    }
                  }}
                  placeholder="Add specialty..."
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Quick add:</p>
                <div className="flex flex-wrap gap-2">
                  {commonSpecialties
                    .filter((s) => !formData.specialties.includes(s))
                    .map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => {
                          setNewSpecialty(spec);
                          handleAddSpecialty();
                        }}
                        className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors"
                      >
                        + {spec}
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Schedule Rules */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Schedule Settings
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    name="scheduleRules.timezone"
                    value={formData.scheduleRules.timezone}
                    onChange={handleChange}
                    placeholder="UTC"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Duration (min)
                  </label>
                  <input
                    type="number"
                    name="scheduleRules.sessionDuration"
                    value={formData.scheduleRules.sessionDuration}
                    onChange={handleChange}
                    min={15}
                    max={120}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Break Duration (min)
                  </label>
                  <input
                    type="number"
                    name="scheduleRules.breakDuration"
                    value={formData.scheduleRules.breakDuration}
                    onChange={handleChange}
                    min={0}
                    max={60}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Working Hours
                </label>
                <div className="space-y-2">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-24 text-sm font-medium text-gray-700 capitalize">
                        {day}
                      </div>
                      <input
                        type="time"
                        value={
                          formData.scheduleRules.workingHours[day]?.start || ""
                        }
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "start", e.target.value)
                        }
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={
                          formData.scheduleRules.workingHours[day]?.end || ""
                        }
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "end", e.target.value)
                        }
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Unavailable Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unavailable Dates
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.scheduleRules.unavailableDates.map((date) => (
                    <span
                      key={date}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                    >
                      {date}
                      <button
                        type="button"
                        onClick={() => handleRemoveUnavailableDate(date)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newUnavailableDate}
                    onChange={(e) => setNewUnavailableDate(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddUnavailableDate}
                    className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/doctors")}
              className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || formData.specialties.length === 0}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing ? "Update Doctor" : "Create Doctor"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

