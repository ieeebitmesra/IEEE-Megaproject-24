/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconWorldQuestion } from "@tabler/icons-react";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";
import Link from "next/link";

export default function Header() {
    const { user } = useAuthStore();
    const { session, logout } = useAuthStore();

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Questions",
      link: "/questions",
      icon: (
        <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  if (user)
    navItems.push({
      name: "Profile",
      link: `/users/${user.$id}/${slugify(user.name)}`,
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    });

  return (
    <div className="relative w-full px-6 py-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            BitOverflow
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
            >
              {item.icon}
              <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-white">
                {item.name}
              </span>
            </Link>
          ))}
          {session ? (
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                Logout
              </span>
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  Login
                </span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  Signup
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
