import { Button } from "flowbite-react";

// eslint-disable-next-line react/prop-types
export default function ContestCard({contest}) {
    console.log(contest);

    const handleClickContest = () => {
        window.open(contest.contestUrl, '_blank');
      };

    const handleClickCalender = () => {
        const startDate = new Date(contest.contestStartDate).toISOString().split('T')[0];
        const startTime = new Date(contest.contestStartDate).toLocaleTimeString('en-GB');
        const endTime = new Date(new Date(contest.contestStartDate).getTime() + contest.contestDuration * 1000).toLocaleTimeString('en-GB');
        const title = contest.contestName;
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDate}T${startTime}%2F${startDate}T${endTime}&details=&location=&sf=true&output=xml&title=${title}`;
        window.open(url, '_blank');
      };
    
      return (
        <div className="bg-white dark:bg-gray-900 dark:text-gray-200 w-[90%] sm:w-[80%] md:w-[60%] text-center mx-auto mt-4 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
          {/* Contest Name */}
          <div className="font-bold text-lg text-gray-800 dark:text-white">
            {contest.contestName}
          </div>
      
          {/* Platform */}
          <div className="text-gray-600 mb-2 dark:text-gray-300">
            Platform: <span className="font-medium text-gray-700 dark:text-gray-400">{contest.platform}</span>
          </div>
      
          {/* Date and Duration */}
          <div className="flex mb-4 flex-col sm:flex-row justify-between sm:items-center mx-[5%] text-gray-600 dark:text-gray-300 gap-2">
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">Date:</span>{" "}
              {new Date(contest.contestRegistrationEndDate).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">Duration:</span>{" "}
              {contest.contestDuration / 60} min
            </div>
          </div>
      
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-2 mx-[5%]">
            <Button
              onClick={handleClickContest}
              className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-800 text-white py-2 px-6 rounded-lg w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              Register
            </Button>
            <Button
              onClick={handleClickCalender}
              className="bg-gray-500 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-800 text-white py-2 px-6 rounded-lg w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              Add to Calendar
            </Button>
          </div>
        </div>
      );
      
      
}
