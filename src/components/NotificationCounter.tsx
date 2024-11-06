import React from 'react'
import Link from 'next/link'
import { Icon } from "@iconify/react";
import { useGetUserDetailQuery } from "@/utils/apiRoutes/apiEndpoint";
import { useToken } from "@/utils/customHooks";

export default function NotificationCounter({ pathName }: { pathName: string }) {
  const { tokenObject } = useToken();
  const { data } = useGetUserDetailQuery(tokenObject?.user_id);

  const unreadCount =
    data?.notification.filter((notification: any) => !notification.read)
      .length || 0;
  return (
    <Link
      className={`${
        pathName === "/notification" ? "text-purple-800" : ""
      } relative flex items-center group hover:text-accent transition-all duration-300`}
      href="/notification"
    >
      <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
        <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
          <div className="text-[12px] leading-none font-semibold capitalize">
            notification
          </div>
          <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
        </div>
      </div>
      <div className="relative">
        <Icon icon="basil:notification-solid" className="text-[30px]" />
        {unreadCount >= 1 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 text-sm flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </div>
    </Link>
  );
}
