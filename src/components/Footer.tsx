"use client";
import React from "react";
import Image from "next/image"; // Import Image component from Next.js

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 w-full mb-16 sm:mb-0 shadow-lg mt-auto">
      <div className="container mx-auto flex flex-col items-center px-4 md:px-0">
        {/* Logo Section */}
        <div className="flex items-center mb-4">
          <Image
            src="/MetaLogo.png"
            alt="MetaTask Logo"
            width={40}
            height={40}
            className="transition-transform duration-300 transform hover:scale-110"
          />
          <p className="text-[1.5rem] md:text-[2rem] text-purple-400 font-bold leading-none ml-3">
            Meta<span className="text-white">Task</span>.
          </p>
        </div>

        <div className="text-center text-purple-400">
          <p className="text-sm md:text-base">
            Join us on our journey to financial growth.
          </p>
          <p className="mt-2 text-xs md:text-sm">
            © 2024 MetaTask. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
