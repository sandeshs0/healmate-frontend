import { FileText, Plus } from "lucide-react";
import DoctorLayout from "../../layouts/DoctorLayout";

export default function DoctorNotes() {
  return (
    <DoctorLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <p className="text-gray-500">Manage your patient notes and observations</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Notes Coming Soon
          </h3>
          <p className="text-gray-500">
            This page will allow you to create, view, and manage notes about your patients and sessions.
          </p>
        </div>
      </div>
    </DoctorLayout>
  );
}

