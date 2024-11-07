import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTelegram, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-gray-300 py-4 mb-[65px] md:mb-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-4 mb-3">
          {/* Logo and Branding */}
          <Link
            href="/"
            className="flex items-center mb-2 md:mb-0 cursor-pointer"
          >
            <Image
              src="/MetaLogo.png"
              alt="MetaTask Logo"
              width={40}
              height={40}
              className="transition-transform duration-300 transform hover:scale-110"
            />
            <p className="text-lg font-semibold text-gray-100 ml-2">
              Meta<span className="text-purple-400">Task</span>
            </p>
          </Link>

          {/* Contact Information */}
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-base font-semibold text-gray-100">
              Contact Us
            </h2>
            <p className="flex items-center text-xs md:text-sm">
              <FaEnvelope className="text-purple-400 mr-1" />
              <Link
                href="mailto:support@metatask.com"
                className="hover:text-purple-400 transition-colors"
              >
                support@metatask.com
              </Link>
            </p>
            <p className="flex items-center text-xs md:text-sm">
              <FaTelegram className="text-purple-400 mr-1" />
              <Link
                href="https://t.me/MetaTaskOfficial"
                className="hover:text-purple-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaTaskOfficial
              </Link>
            </p>
            <p className="flex items-center text-xs md:text-sm">
              <FaMapMarkerAlt className="text-purple-400 mr-1" />
              <span>5418N Warwick Ave., Suite C, Chicago, IL 60630</span>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-purple-500">
          &copy; 2024 MetaTask. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
