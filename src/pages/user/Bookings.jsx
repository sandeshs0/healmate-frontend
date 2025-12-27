import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import UserLayout from "../../layouts/UserLayout";

export default function UserBookings() {
  return (
    <UserLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500">View and manage your session bookings</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Bookings Coming Soon
          </h3>
          <p className="text-gray-500 mb-6">
            This page will display all your session bookings, upcoming appointments, and booking history.
          </p>
          <Link
            to="/our-doctors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            Browse Doctors
          </Link>
        </div>
      </div>
    </UserLayout>
  );
}

