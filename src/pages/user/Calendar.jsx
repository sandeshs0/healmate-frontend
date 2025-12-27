import { Calendar as CalendarIcon } from "lucide-react";
import UserLayout from "../../layouts/UserLayout";

export default function UserCalendar() {
  return (
    <UserLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500">View your scheduled sessions and appointments</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <CalendarIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Calendar Coming Soon
          </h3>
          <p className="text-gray-500">
            This page will display a calendar view of all your scheduled sessions and appointments.
          </p>
        </div>
      </div>
    </UserLayout>
  );
}

