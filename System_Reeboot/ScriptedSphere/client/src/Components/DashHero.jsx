
import Profile from "./Profile";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";
import RatingChart from "./Profile/RatingChart";
import RatingChartCodeforces from "./Profile/CodeforcesRatingContest";

export default function DashHero() {
  const {currentUser} = useSelector((state)=>state.user);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();

  const [data,setData] = useState({});
  useEffect(()=>{
    if(!currentUser.leetcode && !currentUser.codeforces && !currentUser.codechef && !currentUser.geekforgeeks){
      navigate("?tab=profile&tabProfile=platform")
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`/api/code/platformData/${currentUser._id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setDataLoaded(true);
          setData(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  },[currentUser]);
  console.log(data);
  
  return (
     loading ?
      <>
        <Loader />
      </>
      :
      <div className="p-5 ">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="profile  h-[100%] md:h-[100%] max-w-4xl md:w-[25vw] bg-white border dark:bg-gray-800 dark:border-black rounded-lg">
          <Profile />
        </div>

        <div className="right flex flex-col w-full  bg-gray-100 dark:bg-gray-900 dark:border-black h-full">
          <div className="flex flex-col md:flex-row gap-3 h-full md:min-h-[25vh] p-5">
            <div className="question min-h-[20vh] md:basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="md:basis-1/3 self-center text-2xl m-3 dark:text-white ">
                  Total Questions
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.totalQuestions || "0"}
                </h1>
              </div>
            </div>
            <div className="question min-h-[20vh] basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3">
                  Total Contests
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                 {data.totalContests || "0"}
                </h1>
              </div>
            </div>
            <div className="question min-h-[20vh] basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3 md:block ">
                  Total Active Days
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.totalActiveDays || "0"}
                </h1>
              </div>
            </div>
          </div>
          <div className=" flex flex-col  md:flex-row h-[75vh]  p-5 gap-3">
            <div className="bg-white border p-5 flex-1 dark:bg-gray-800 dark:border-black">
              <div className="chart">
                {dataLoaded && <DonutChart  
                  easy={data.easy} 
                  medium={data.medium} 
                  hard={data.hard} 
                  totalQuestions={data.totalQuestions} 
                />}
              </div>
              <div className="text-center flex flex-col gap-2 mt-4">
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[100%] md:w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-green-500">Easy</span>
                  <span>{data.easy || "0"}</span>
                </div>
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[100%] md:w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-yellow-500">Medium</span>
                  <span>{data.medium || "0"}</span>
                </div>
                <div className="flex flex-row gap-4 justify-between bg-grey-100 border w-[100%] md:w-[50%] mx-auto h-8 rounded-lg items-center p-5">
                  <span className="text-red-500">Hard</span>
                  <span>{data.hard || "0"}</span>
                </div>
              </div>
            </div>
            <div className="md:flex flex-1 flex-col hidden text-center gap-3 bg-white border overflow-auto scrollbar-hide dark:bg-gray-800 dark:border-black ">
                <h1 className="font-semibold mt-3">DSA Topic wise AnaLysis</h1>
              { dataLoaded && <BarChart topics={data.topics}  />}
            </div>
          </div> 
          <div className="flex  justify-center mb-4 max-w-[96%] mx-auto dark:bg-slate-700  bg-yellow-200 flex-col md:flex-row gap-3 h-full md:min-h-[25vh] p-5 w-full">
            {currentUser.leetcode && <div className="question min-h-[20vh] md:basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="md:basis-1/3 self-center text-2xl m-3 dark:text-white ">
                  Leetcode Rating
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.leetcodeRating || "0"}
                </h1>
              </div>
            </div>}
            {currentUser.codeforces && <div className="question min-h-[20vh] basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3">
                  Codeforces Rating
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                 {data.codeforcesRating || "0"}
                </h1>
              </div>
            </div>}
            {currentUser.codechef && <div className="question min-h-[20vh] basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3 md:block ">
                  Codechef Rating
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.codechefRating || "0"}
                </h1>
              </div>
            </div>}
            {currentUser.geekforgeeks && <div className="question min-h-[20vh] basis-1/3 bg-white border dark:bg-gray-800 dark:border-black rounded-md opacity-75">
              <div className="flex flex-col h-full text-center">
                <h1 className="basis-1/3 self-center text-2xl m-3 md:block ">
                  GFG Rating
                </h1>
                <h1 className="basis-2/3 self-center text-4xl font-bold">
                  {data.geekforgeeksRating || "0"}
                </h1>
              </div>
            </div>}
          </div>
          <div className=" flex flex-col items-center  gap-3 justify-center  ">
          { currentUser.leetcode && <div className="text-center h-[] w-[50vw]   bg-white border  dark:bg-gray-800 dark:border-black hidden md:flex">
              { dataLoaded && <RatingChart platform={"Leetcode"} rankingHistory={data.leetcodeRankingHistory} />}
            </div>}   
            {currentUser.codeforces && <div className="text-center h-[50vh] w-[50vw]  bg-white border  dark:bg-gray-800 dark:border-black hidden md:flex">
              { dataLoaded && <RatingChartCodeforces platform={"Codeforces"} rankingHistory={data.codeforcesRankingHistory} />}
            </div>}
          </div>
          
        </div>
      </div>
    </div>
  );
}
