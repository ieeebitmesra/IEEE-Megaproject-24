// import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* About Scriptes Sphere */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">About Scriptes Sphere</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to <strong>Scriptes Sphere</strong>, a one-stop solution designed to streamline your coding journey.
              Our platform brings together essential tools and resources to excel in programming and problem-solving.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 text-white rounded-full">
                <i className="fas fa-cogs text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Platform Management</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage activities across multiple coding platforms effortlessly, with all contests and schedules in one place.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 text-white rounded-full">
                <i className="fas fa-calendar-alt text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Contests</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Get a consolidated view of all upcoming coding contests across platforms.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 text-white rounded-full">
                <i className="fas fa-lock text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">User Authentication</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Secure user authentication with saved preferences and progress tracking.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500 text-white rounded-full">
                <i className="fas fa-book text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Structured DSA Sheet</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Boost your problem-solving skills with a curated DSA sheet featuring top questions from various platforms.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">About Me</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              Hi, I am Sachin Kumar Singh, a second-year B.Tech student at BIT Mesra, Ranchi. I specialize in creating robust web applications
              using modern technologies. My goal is to build impactful solutions that make a difference.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500 text-white rounded-full">
                <i className="fas fa-code text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Skills</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Java, JavaScript, React, Node.js, WebRTC, Socket.IO
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500 text-white rounded-full">
                <i className="fas fa-laptop-code text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Projects</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  ConferPoint, EstateConnect, Zerodha Clone
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500 text-white rounded-full">
                <i className="fas fa-user-graduate text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Education</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  B.Tech, BIT Mesra (2nd Year)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500 text-white rounded-full">
                <i className="fas fa-bullseye text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Goals</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Stable lifestyle and impactful career in tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
