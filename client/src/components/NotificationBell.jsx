import { Bell, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  useDeleteAllNotifications,
  useDeleteNotification,
  useNotifications,
} from "../queryHooks/notificationQueryHooks";
import { useQueryClient } from "@tanstack/react-query";

export const NotificationBell = () => {
  const [notifModal, setNotifModal] = useState(false);
  const queryClient = useQueryClient()

  const { data: notifData = [], isLoading: refreshing } = useNotifications();
  const { mutateAsync: deleteAll, isPending: deletingAll } = useDeleteAllNotifications();
  const { mutateAsync: deleteOne, isPending: deletingOne } = useDeleteNotification();

  return (
    <div className="relative">
      <button onClick={() => setNotifModal(!notifModal)} className="relative focus:outline-none">
        <Bell className="h-6 w-6 text-gray-700" />
        {notifData.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
            {notifData.length}
          </span>
        )}
      </button>

      {notifModal && (
        <div className="absolute left-1/2 mt-2 w-80 max-h-75 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 space-y-3 -translate-x-1/2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {queryClient.invalidateQueries({ queryKey: ['notifications'] });}}
                disabled={refreshing || deletingAll || deletingOne}
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                  refreshing ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <RotateCcw className={`h-4 w-4 ${refreshing && "animate-spin"}`} />
                Refresh
              </button>
              <button
                onClick={() => deleteAll()}
                disabled={refreshing || deletingAll || deletingOne}
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                  deletingAll ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:bg-red-50"
                }`}
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            </div>
          </div>

          {notifData.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">No notifications.</p>
          ) : (
            notifData.map((n) => (
              <div
                key={n.id}
                className="flex gap-3 border border-gray-100 rounded-lg p-3 hover:bg-gray-50 transition"
              >
                {n.image && (
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-16 h-16 object-contain rounded border border-gray-200"
                  />
                )}
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-800">{n.title}</p>
                  <p className="text-xs text-gray-600">
                    Price: {n.price} {n.currency}
                  </p>
                  <p className="text-xs text-gray-600">Condition: {n.condition}</p>
                  <a
                    href={n.itemWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline block mt-1"
                  >
                    View Item
                  </a>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {new Date(n.notificationDate).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteOne(n.id)}
                  disabled={refreshing || deletingAll || deletingOne}
                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
