import { User } from "lucide-react";
import UserLayout from "../../layouts/UserLayout";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <UserLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500">Manage your account settings and profile information</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={48} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.name || "User"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Settings Coming Soon
            </h3>
            <p className="text-gray-500">
              This page will allow you to update your profile information, change your password, and manage your account settings.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

