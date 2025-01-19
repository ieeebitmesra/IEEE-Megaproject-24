import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [images] = useState(["/dashboard2.png", "/DSASheet.png"]);
  return (
    <div className="">
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 dark:text-white font-bold text-3xl lg:text-6xl">
          Empower Your{" "}
          <span className="text-slate-500 dark:text-slate-300">
            Coding Journey
          </span>
          <br /> with Seamless Integration
        </h1>
        <div className="text-gray-400 dark:text-gray-300 text-xs sm:text-sm">
          At Scripted Sphere, we bring all your coding essentials into one
          platform.
          <br />
          Manage activities, prepare for contests, and sharpen your DSA skills
          effortlessly.
        </div>
        <Link
          to="/dashboard?tab=dash"
          className="text-xs sm:text-sm text-blue-800 dark:text-blue-500 font-bold hover:underline"
        >
          Explore Now
        </Link>
      </div>

      {/* swiper  */}
      <div className="relative m-5">
        <Swiper
          navigation
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="max-w-7xl mx-auto"
        >
          {images &&
            images.length > 0 &&
            images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className=" rounded-lg shadow-lg h-[450px] max-w-6xl mx-auto bg-cover bg-top"
                  style={{
                    backgroundImage: `url(${
                      image ||
                      "https://imgcdn.stablediffusionweb.com/2024/2/28/a47b610b-8251-45e6-a7ef-b9f305ae7c96.jpg"
                    })`,
                  }}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="max-w-6xl mx-auto py-28">
        <div className="container mx-auto mt-5 mb-8">
          <div className="flex flex-wrap">
            {/* Left Column */}
            <div className="w-full md:w-1/2 p-5">
              <img
                src="https://i0.wp.com/illinoismusicassociation.org/wp-content/uploads/2023/01/contest.png?fit=1650%2C1275&ssl=1" // Replace with any image URL
                alt="Coding Contests"
                className="rounded-lg shadow-md max-h-[50vh]"
              />
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 p-20 flex flex-col justify-center">
              <h1 className="text-slate-700 dark:text-white font-bold text-3xl lg:text-4xl">
                Never Miss a Contest
              </h1>
              <p className="text-lg mt-3 text-gray-600 dark:text-slate-200  mb-5 opacity-80">
                Stay ahead with our consolidated platform that brings you all
                coding contests and schedules in one place. Never miss out on an
                opportunity to shine!
              </p>

              {/* Links */}
              <div className="mt-3 mb-6 flex gap-4">
                <Link
                  to={"/dashboard?tab=contests"}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Explore Contests
                </Link>
                <Link
                  to={"/dashboard?tab=contests"}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto ">
        <div className="container mx-auto mt-5 mb-8">
          <div className="flex flex-wrap">
            {/* Right Column */}
            <div className="w-full md:w-1/2 p-20 flex flex-col justify-center">
              <h1 className="text-slate-700 dark:text-white font-bold text-3xl lg:text-4xl">
              Master DSA, <span className="text-green-700">One Step at a Time</span>
              </h1>
              <p className="text-lg mt-3 text-gray-600 dark:text-slate-200  mb-5 opacity-80">
              Unlock your problem-solving potential with a curated collection of DSA questions, 
              progress tracking, and solutions across all formats—all in one place!
              </p>

              {/* Links */}
              <div className="mt-3 mb-6 flex gap-4">
                <Link
                  to={"/dashboard?tab=posts"}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  DSA Sheet
                </Link>
                <Link
                  to={"/dashboard?tab=posts"}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
            {/* Left Column */}
            <div className="w-full md:w-1/2 p-5 px-20 ">
              <img
                src="/DSA.png" // Replace with any image URL
                alt="Coding Contests"
                className="rounded-lg shadow-md max-h-[50vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
