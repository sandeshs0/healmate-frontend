import { MessageSquare } from "lucide-react";
import UserLayout from "../../layouts/UserLayout";

export default function UserChat() {
  return (
    <UserLayout>
      <div className="max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
          <p className="text-gray-500">Communicate with your doctors</p>
        </div>

        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
          <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Chat Coming Soon
          </h3>
          <p className="text-gray-500">
            This page will provide a messaging interface to communicate with your doctors and get support.
          </p>
        </div>
      </div>
    </UserLayout>
  );
}

