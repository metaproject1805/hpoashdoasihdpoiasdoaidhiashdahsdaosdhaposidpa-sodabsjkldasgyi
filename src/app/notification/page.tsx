"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  useGetUserDetailQuery,
  useReadNotificationMutation,
} from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";
import { NotificationIcon } from "@/components/NotificationIcon";
import { getNotificationClass } from "@/utils/functions";

const NotificationPage = () => {
  const { tokenObject } = useToken();
  const { data, isLoading } = useGetUserDetailQuery(tokenObject?.user_id);

  const [readNotification] = useReadNotificationMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  const sortedNotifications = Array.isArray(data?.notification)
    ? [...data.notification].sort((a, b) =>
        a.read === b.read ? 0 : a.read ? 1 : -1
      )
    : [];

  const handleTitleClick = (message: string, notificationId: string) => {
    setSelectedMessage(message);
    setModalVisible(true);
    readNotification({ id: notificationId });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMessage(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = sortedNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const totalPages = Math.ceil(
    sortedNotifications.length / notificationsPerPage
  );

  const LoaderModal = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black bg-opacity-10 p-4 sm:p-6 flex justify-center items-start">
      <LoaderModal isLoading={isLoading} />
      <div className="w-full sm:w-[80%] mt-[60px] sm:mt-[100px] mx-auto rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg relative z-10">
        <h1 className="flex gap-4 text-2xl sm:text-3xl font-extrabold text-purple-500 mb-4 sm:mb-6">
          <Icon icon="mdi:markunread" className="text-purple-500 text-4xl" />
          Notifications
        </h1>
        <div>
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-center border-l-4 p-4 border-purple-400 sm:p-6 mb-4 rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 ${getNotificationClass(
                  notification.type
                )} ${notification.read ? "opacity-60" : ""}`}
              >
                <div className="flex-shrink-0">
                  {NotificationIcon(notification.type)}
                </div>
                <div
                  className="ml-4 cursor-pointer flex-1 text-base sm:text-lg font-semibold text-purple-500"
                  onClick={() =>
                    handleTitleClick(notification.message, notification.id)
                  }
                >
                  <h3>{notification.title}</h3>
                </div>
                {notification.read && (
                  <Icon
                    icon="ion:checkmark-done-circle-sharp"
                    className="text-purple-500 text-lg sm:text-xl ml-2"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">
              No notifications available.
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
          )}

          <p className="text-purple-500">
            Page {currentPage} of {totalPages}
          </p>

          {currentPage < totalPages && (
            <button
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded"
              onClick={handleNextPage}
            >
              Next
            </button>
          )}
        </div>

        {modalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            {/* Modal */}
            <div className="relative bg-black/100 rounded-2xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-bold text-purple-400">
                  Notification Message
                </h2>
                <button
                  className="text-red-400 hover:text-red-600 transition-colors duration-300"
                  onClick={closeModal}
                >
                  <Icon icon="mdi:close-circle" className="text-4xl" />
                </button>
              </div>
              <div className="text-purple-400 leading-relaxed">
                <p>{selectedMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
