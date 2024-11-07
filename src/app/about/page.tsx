import React from "react";
import Certificate from "../../../public/Certificate.jpeg";
import Image from "next/image";
import { Icon } from "@iconify/react";

const AboutPage = () => {
  return (
    <div className="p-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="py-12 px-8 mt-10 ">
          <h2 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 text-center mb-14">
            About Us
          </h2>
          <div className="text-center py-12 px-8 max-w-4xl bg-black bg-opacity-10 backdrop-blur-lg mx-auto transition-all duration-500 hover:shadow-3xl shadow-2xl">
            <p className="text-purple-200 text-sm lg:text-[18px] leading-relaxed tracking-wide">
              MetaTask is a premier investment platform dedicated to helping you
              achieve your financial goals with ease. Our services are built on
              a foundation of trust, transparency, and commitment, providing a
              seamless investment experience tailored for each client.
            </p>
            <br />
            <p className="text-purple-200 text-sm lg:text-[18px] leading-relaxed tracking-wide">
              Based in the heart of Chicago, MetaTask is fully licensed and
              regulated, offering a secure space for your investments. We strive
              to be your trusted partner in navigating the complexities of the
              financial world, ensuring every step you take with us is guided by
              integrity and professionalism.
            </p>
          </div>
        </div>
        <div className="py-16 px-8 bg-gray-900 bg-opacity-10 backdrop-blur-lg rounded-xl shadow-x2l mt-20 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <Icon
              icon="mdi:rocket-launch-outline"
              className="text-6xl text-purple-400 mb-4"
            />
            <h2 className="text-4xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8">
              Our Mission
            </h2>
            <p className="text-purple-200 text-sm lg:text-[20px] leading-relaxed max-w-2xl">
              At <strong>MetaTask Investments</strong>, Our mission is to
              empower individuals and businesses to achieve their financial
              aspirations through innovative investment solutions. We believe in
              creating opportunities for our clients to grow their wealth while
              providing the highest level of transparency and customer service.
            </p>
          </div>
        </div>

        <section className="py-12 px-6 mt-6 lg:mt-[100px] mb-12 lg:mb-[100px]">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8">
            Why Choose MetaTask?
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
                  At MetaTask, we prioritize your trust. Our transparent
                  processes ensure you have a clear understanding of where and
                  how your investments are managed.
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
                  you through the investment process, ensuring informed
                  decisions every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-gray-800 bg-opacity-10 backdrop-blur-md p-6">
          <h2 className="text-[25px] md:text-4xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Certificate of Operation
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-full md:w-1/2 h-auto">
              <Image
                src={Certificate}
                alt="MetaTask Certificate of Operation"
                layout="responsive"
                className="rounded-md shadow-lg"
              />
            </div>
          </div>
          <p className="text-lg text-purple-200 mt-16 lg:w-[650px] text-center max-w-2xl mx-auto">
            Our license certificate serves as a testament to our dedication to
            transparency and compliance. At MetaTask, we prioritize your trust,
            making sure that our operations are secure and reliable. Our Limited
            Business License, issued by the City of Chicago, highlights our
            commitment to adhering to all legal standards.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
