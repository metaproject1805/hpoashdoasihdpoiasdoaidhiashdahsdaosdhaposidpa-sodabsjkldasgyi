"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import LoadingComponent from "./LoadingComponent";
import Link from "next/link";
import Cookies from "js-cookie";
import NotificationCounter from "./NotificationCounter";


const Navbar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false); // New state to check if the component is mounted
  const accessToken = Cookies.get("access-token");

  // Decode the token to get userId
  useEffect(() => {
    setIsMounted(true);
  }, [accessToken]);

  // Hide Navbar on specific pages
  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgotPassword"
  ) {
    return null;
  }

  // Render navbar only after the component is mounted
  if (!isMounted) {
    return null;
  }

  if (accessToken) {
    return (
      <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen">
        <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full">
          {/* Home Link */}
          <Link
            className={`${
              pathname === "/" ? "text-purple-800" : ""
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href="/"
          >
            <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] text-purple-400 leading-none font-semibold capitalize">
                  home
                </div>
                <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
              </div>
            </div>
            <div>
              <Icon icon="tabler:home-filled" className="text-[30px]" />
            </div>
          </Link>

          {/* Notification Link with Unread Count */}
          <NotificationCounter pathName={pathname} />

          {/* Investment Link */}
          <Link
            className={`${
              pathname === "/investment" ? "text-purple-800" : ""
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href="/investment"
          >
            <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  Investment
                </div>
                <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
              </div>
            </div>
            <div>
              <Icon
                icon="streamline:investment-selection-solid"
                className="text-[30px]"
              />
            </div>
          </Link>

          {/* Packages Link */}
          <Link
            className={`${
              pathname === "/packages" ? "text-purple-800" : ""
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href="/packages"
          >
            <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  packages
                </div>
                <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
              </div>
            </div>
            <div>
              <Icon icon="raphael:package" className="text-[30px]" />
            </div>
          </Link>

          {/* Mine Link */}
          <Link
            className={`${
              pathname === "/videos" ? "text-purple-800" : ""
            } relative flex items-center group hover:text-accent transition-all duration-300`}
            href="/videos"
          >
            <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
              <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                <div className="text-[12px] flex leading-none font-semibold capitalize">
                  Video
                </div>
                <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
              </div>
            </div>
            <div>
              <Icon icon="ph:video-fill" width="1.5rem" height="1.5rem" />
            </div>
          </Link>
        </div>
      </nav>
    );
  }

  return null;
};

export default Navbar;
