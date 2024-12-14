"use client";

import { Icon } from "@iconify/react";
import backgroundImage from "../../public/back2.jpg";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Ceo from "../../public/ceo.jpeg"

const Home: React.FC = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      {/* Landing Page Content */}
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between w-full ">
        {/* Left Side - Hero Section (Text) */}
        <div className="h-screen flex flex-col items-center lg:items-start justify-center lg:w-1/2 w-full text-center lg:text-left mt-0">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 leading-tight">
            Grow Your Wealth with MetaTask Investments
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-purple-200 mb-6">
            Start investing with as low as $10. Expert guidance at your
            fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="px-6 py-3 md:px-8 md:py-4 bg-purple-600 text-white rounded-full text-sm xs:text-md md:text-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            >
              
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 md:px-8 md:py-4 bg-transparent border border-purple-600 text-purple-600 rounded-full text-sm xs:text-md md:text-lg shadow-lg hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side - Hero Section (3D Vectors) */}
        <div className="hidden md:block lg:flex lg:w-1/2 items-center justify-center relative">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[300px] sm:h-[300px] flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-600 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-500">
              <Icon
                icon="mdi:rocket-launch"
                className="text-white text-[80px] xs:text-[100px] sm:text-[150px] animate-bounce"
              />
            </div>
            <div className="absolute top-[120px] xs:top-[150px] right-[-30px] xs:right-[-50px] w-[150px] lg:right-[50px] h-[150px] xs:w-[200px] xs:h-[200px] bg-gradient-to-r from-pink-400 to-purple-600 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-500">
              <Icon
                icon="mdi:shield-check"
                className="text-white text-[80px] xs:text-[100px] absolute inset-0 m-auto"
              />
            </div>
          </div>
        </div>

        {/* Mobile View Vectors (Hidden for screens 340px-820px) */}
        <div className="hidden sm:hidden lg:hidden w-full justify-center mt-8 gap-4">
          <Icon
            icon="mdi:rocket-launch"
            className="text-white text-[60px] xs:text-[80px] animate-bounce"
          />
          <Icon
            icon="mdi:shield-check"
            className="text-white text-[60px] xs:text-[80px]"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center">
              <Icon
                icon="arcticons:ldb-trust"
                className="text-purple-500 text-6xl mb-4"
              />
              <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-semibold mb-2">
                Trust & Transparency
              </h3>
              <p className="text-purple-200">
                At MetaTask, we prioritize your trust. Our transparent processes
                ensure you have a clear understanding of where and how your
                investments are managed.
              </p>
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center">
              <Icon
                icon="mdi:encryption-secure"
                className="text-purple-500 text-6xl mb-4"
              />
              <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-semibold mb-2">
                Secure Platform
              </h3>
              <p className="text-purple-200">
                Licensed by the City of Chicago, we adhere to all regulations,
                providing you with a secure environment to grow your
                investments.
              </p>
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="flex flex-col items-center">
              <Icon
                icon="tabler:arrow-guide"
                className="text-purple-500 text-6xl mb-4"
              />
              <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-semibold mb-2">
                Expert Guidance
              </h3>
              <p className="text-purple-200">
                Our team of experienced professionals is dedicated to guiding
                you through the investment process, ensuring informed decisions
                every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-12 px-8 mt-20 bg-black bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl max-w-6xl mx-auto transition-all duration-500 hover:shadow-3xl">
        <h2 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-center mb-14">
          About Us
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side - About Text */}
          <div className="lg:w-1/2 w-full space-y-8">
            <p className="text-purple-200 text-sm lg:text-[18px] leading-relaxed tracking-wide">
              MetaTask is a premier investment platform dedicated to helping you
              achieve your financial goals with ease. Our services are built on
              a foundation of trust, transparency, and commitment, providing a
              seamless investment experience tailored for each client.
            </p>
            <p className="text-purple-200 text-sm lg:text-[18px] leading-relaxed tracking-wide">
              Based in the heart of Chicago, MetaTask is fully licensed and
              regulated, offering a secure space for your investments. We strive
              to be your trusted partner in navigating the complexities of the
              financial world, ensuring every step you take with us is guided by
              integrity and professionalism.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="mt-6 px-6 py-3 md:px-8 md:py-4 bg-purple-600 text-white rounded-full text-sm xs:text-md md:text-lg shadow-lg hover:bg-purple-700 transition duration-300 ease-in-out"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side - About Image */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="relative w-[340px] h-[340px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-xl transform hover:scale-105 hover:rotate-2 transition-transform duration-700 ease-in-out">
              <Image
                src="/bitcoin-image.png"
                alt="About MetaTask"
                width={350}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-8 bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-xl shadow-x2l mt-20 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <Icon
            icon="mdi:rocket-launch-outline"
            className="text-6xl text-purple-400 mb-4"
          />
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8">
            Our Mission
          </h2>
          <p className="text-purple-200 text-lg lg:text-2xl leading-relaxed max-w-2xl">
            At <strong>MetaTask Investments</strong>, Our mission is to empower
            individuals and businesses to achieve their financial aspirations
            through innovative investment solutions. We believe in creating
            opportunities for our clients to grow their wealth while providing
            the highest level of transparency and customer service.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-8 bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl mt-16 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Integrity Card */}
            <div className="bg-gray-800 bg-opacity-10 p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:bg-opacity-20 transition duration-300 ease-in-out transform hover:scale-105">
              <Icon
                icon="mdi:shield-outline"
                className="text-6xl text-purple-400 mb-4"
              />
              <strong className="text-purple-400 text-xl mb-2">
                Integrity
              </strong>
              <p className="text-purple-200 text-base">
                We uphold the highest standards of honesty and transparency.
              </p>
            </div>

            {/* Expertise Card */}
            <div className="bg-gray-800 bg-opacity-10 p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:bg-opacity-20 transition duration-300 ease-in-out transform hover:scale-105">
              <Icon
                icon="mdi:brain"
                className="text-6xl text-purple-400 mb-4"
              />
              <strong className="text-purple-400 text-xl mb-2">
                Expertise
              </strong>
              <p className="text-purple-200 text-base">
                Our experienced team is dedicated to delivering top-tier
                financial solutions.
              </p>
            </div>

            {/* Client-Centric Card */}
            <div className="bg-gray-800 bg-opacity-10 p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:bg-opacity-20 transition duration-300 ease-in-out transform hover:scale-105">
              <Icon
                icon="mdi:account-heart-outline"
                className="text-6xl text-purple-400 mb-4"
              />
              <strong className="text-purple-400 text-xl mb-2">
                Client-Centric
              </strong>
              <p className="text-purple-200 text-base">
                Our services are customized to meet the unique needs of each
                client.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-8 justify-center bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl mt-16 max-w-6xl mx-auto">
        <div className="text-center">
          <Icon
            icon="mdi:account-group-outline"
            className="text-6xl text-purple-400 mb-4"
          />
          <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Meet Our Team
          </h2>
        </div>

        <div className="flex mt-10 justify-items-center">
          {/* Team Member */}
          <div className="flex flex-col bg-gray-800 bg-opacity-10 p-8 rounded-xl items-center justify-center text-center transform hover:scale-105 hover:bg-opacity-20 transition duration-300 ease-in-out">
          
            <Image
              src={Ceo}
              alt="Howard Griffin"
              className="object-cover h-[200px] w-[200px] mb-[40px] rounded-full"
            />
            <h3 className="text-xl font-bold text-purple-400">
              Howard Griffin
            </h3>
            <p className="text-purple-200">CEO & Founder</p>
            <p className="mt-4 text-purple-200">
              Howard has over 20 years of experience and is dedicated to helping
              clients grow their wealth.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className=" py-12 px-6 mt-[100px] bg-gray-800 bg-opacity-10 mb-[170px]">
        <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 font-bold text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <Icon
              icon="mdi:account-plus"
              className="text-blue-500 text-6xl mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">
              1. Create an Account
            </h3>
            <p className="text-gray-400 text-center">
              Sign up easily in just a few minutes.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Icon
              icon="mdi:currency-usd-circle"
              className="text-green-500 text-6xl mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">
              2. Choose an Investment
            </h3>
            <p className="text-gray-400 text-center">
              Pick an investment package that fits your goals.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Icon
              icon="mdi:chart-line"
              className="text-purple-500 text-6xl mb-4"
            />
            <h3 className="text-xl text-white font-semibold mb-2">
              3. Watch Your Wealth Grow
            </h3>
            <p className="text-gray-400 text-center">
              Track your investments and profits in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Faq Section */}
      <FAQ />
    </div>
  );
};

export default Home;
