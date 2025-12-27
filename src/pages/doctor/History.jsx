import { History as HistoryIcon } from "lucide-react";
import DoctorLayout from "../../layouts/DoctorLayout";

export default function DoctorHistory() {
  return (
    <DoctorLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">History</h1>
          <p className="text-gray-500">View your past sessions and interactions</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <HistoryIcon size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            History Coming Soon
          </h3>
          <p className="text-gray-500">
            This page will display your complete session history, including all past consultations, summaries, and patient interactions.
          </p>
        </div>
      </div>
    </DoctorLayout>
  );
}

