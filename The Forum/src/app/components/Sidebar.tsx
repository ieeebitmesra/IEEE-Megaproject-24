import React from 'react';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TagIcon from '@mui/icons-material/LocalOffer';
import QuestionIcon from '@mui/icons-material/Quiz';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ExploreIcon from '@mui/icons-material/Explore';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div
      className={
        "sidebar fixed top-[4rem] left-0 h-[calc(100vh-4rem)] bg-slate-400 shadow-lg transition-transform md:translate-x-0 md:w-[16%] sm:w-[8%]"
      }
    >
      <ul className="relative sidebar-items space-y-4 text-white">
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg mt-2">
          <Link href="/" className="flex items-center gap-2 px-2 py-1 w-full">
            <SpaceDashboardIcon fontSize="medium" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link href="/questions" className="flex items-center gap-2 px-2 py-1 w-full">
            <QuestionIcon fontSize="medium" />
            <span className="hidden md:inline">My Queries</span>
          </Link>
        </li>
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link href="/" className="flex items-center gap-2 px-2 py-1 w-full">
            <TagIcon fontSize="medium" />
            <span className="hidden md:inline">Tags</span>
          </Link>
        </li>
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link href="/events" className="flex items-center gap-2 px-2 py-1 w-full">
            <NotificationsIcon fontSize="medium" />
            <span className="hidden md:inline">Events</span>
          </Link>
        </li>
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link href="/club" className="flex items-center gap-2 px-2 py-1 w-full">
            <Diversity3Icon fontSize="medium" />
            <span className="hidden md:inline">Clubs</span>
          </Link>
        </li>
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link
            href="https://eloquent-semifreddo-c8e593.netlify.app"
            className="flex items-center gap-2 px-2 py-1 w-full"
          >
            <ExploreIcon fontSize="medium" />
            <span className="hidden md:inline">Remaps</span>
          </Link>
        </li>
        <br />
        <li className="sidebar-item flex items-center gap-2 pt-4 hover:bg-slate-500 rounded-lg">
          <Link href="/feedback" className="flex items-center gap-2 px-2 py-1 w-full">
            <FeedbackIcon fontSize="medium" />
            <span className="hidden md:inline">Feedback</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
