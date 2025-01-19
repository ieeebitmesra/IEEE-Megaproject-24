import { useEffect, useState } from "react";
import ContestCard from "../Components/ContestCard";

export default function Contest() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch("/api/code/getcontests");
        if (!res.ok) {
          return console.log("Something went wrong");
        }
        const data = await res.json();

        // const sortedContests = data.data.sort((a, b) => {
        //     return new Date(a.contestStartDate) - new Date(b.contestStartDate);
        //   });
        const today = new Date(); // Get today's date
        today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

        // Filter contests and sort them
        const filteredAndSortedContests = data.data
          .filter((contest) => new Date(contest.contestStartDate) > today) // Only include future contests
          .sort((a, b) => {
            return new Date(a.contestStartDate) - new Date(b.contestStartDate); // Sort by start date
          });

        setContests(filteredAndSortedContests);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContests();
  }, []);

  return (
    <div className="bg-white  dark:bg-slate-900 min-h-screen py-6 px-4 md:px-10 lg:px-20 scrollbar-hide">
      {/* Page Header */}
      <div className="w-full flex flex-row justify-center items-center md:w-[80%] lg:w-[70%] mx-auto rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500   dark:to-blue-900 text-center text-white font-semibold text-2xl py-5 shadow-lg">
        <img className="max-w-36" src="/contest.png" alt="" />
        {contests.length === 0 ? "Fetching Data ..." : "Upcoming Contests"}
      </div>

      {/* Contests Container */}
      <div className="w-full  md:w-[80%] lg:w-[70%] mx-auto mt-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-10 px-6 rounded-lg shadow-md p-4 flex flex-col gap-4 overflow-y-auto scrollbar-hide max-h-[80vh]">
        {contests.map((contest, index) => (
          <ContestCard contest={contest} key={index} />
        ))}
      </div>
    </div>
  );
}
