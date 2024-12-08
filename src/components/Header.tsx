"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Nullable state to handle loading

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!Cookies.get("access-token"));
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("access-token");
    Cookies.remove("refresh-token");
    window.location.href = "/login";
  };

  if (
    typeof window !== "undefined" &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/activation" ||
      window.location.pathname === "/forgotPassword")
  ) {
    return null;
  }

  if (isLoggedIn === null) {
    return null; // Render nothing while checking login status
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-lg" : "bg-transparent"
      } flex items-center justify-between px-6 md:px-12 xl:px-0 h-[70px] mb-16`}
    >
      <div className="container mx-auto flex items-center gap-10 justify-between">
        <Link href="/" className="flex mb-6 mr-[40px] mt-12">
          <Image
            src="/MetaLogo.png" // Your logo image
            alt="MetaTask Logo"
            width={100} // Set desired width
            height={100} // Set desired height
            className="transition-transform duration-300 transform mt-[-20px] hover:scale-105"
          />
          <p className="text-[20px] text-purple-400 font-bold leading-none mt-4 mb-4">
            Meta<span className="text-white">Task</span>.
          </p>
        </Link>

        {isLoggedIn ? (
          <div className="relative flex items-center">
            <button
              ref={buttonRef}
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="flex items-center justify-center w-14 h-14 bg-transparent rounded-full shadow-md hover:bg-black transition-colors duration-200 mr-[-30px]"
            >
              <Icon
                icon="iconamoon:profile-fill"
                className="text-purple-400 w-6 h-6 "
              />
            </button>
            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-purple-400 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => setDropdownVisible(false)}
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      icon="iconamoon:profile-fill"
                      className="text-purple-400 w-5 h-5"
                    />
                    <span>Profile</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-purple-400 hover:bg-gray-200 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Icon
                      icon="mdi:logout"
                      className="text-purple-400 w-5 h-5"
                    />
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-white bg-purple-700 text-[10px] lg:w-[70px] w-[30%] text-center right-[200px] rounded-xl hover:bg-purple-500 p-4 transition-colors duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
