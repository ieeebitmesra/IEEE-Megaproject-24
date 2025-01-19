import { errorHandler } from "../utils/error.js";
import fetch from "node-fetch";
import {load} from 'cheerio';
import axios from "axios";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const  leetcodeData = async (req) => {
  try {
    if(!req.user.leetcode){
        console.log("Leetcode url not found");
        return;
    }
    const username = req.user.leetcode.split("/").filter(Boolean).pop();
    const s = {
        "query": "query getUserProfile($username: String!) { matchedUser(username: $username) { username profile { realName aboutMe countryName reputation ranking company school websites skillTags } submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } }  userCalendar { streak totalActiveDays  } contestBadge { displayName } } }",
        "variables": {
          "username": username
        }
      }
    
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    if(response.ok){
        const data = await response.json();
        const topics =await postSkillStats(username);
        const totalContest = await postContestStats(username);
        data.topics = topics || [];
        data.totalContests = totalContest.totalContests || 0;
        data.rankingHistory = totalContest.rankingHistory || [];
        data.contestRating = totalContest.contestRating || 0;
        return data;
    }
    else{
        return;
    }
    
  } catch (error) {
    console.log("Leetcode error");
    // console.log(error);
    return;
  }
};

async function postSkillStats(username) {
  const url = "https://leetcode.com/graphql"; // Replace with actual GraphQL endpoint
  const query = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
  `;

  const variables = {
    username: username
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN", // If authentication is needed
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    const data = await response.json();

    if (response.ok) {

      // Extract advanced, intermediate, and fundamental topics
      const advancedTopics = data?.data?.matchedUser?.tagProblemCounts?.advanced || [];
      const intermediateTopics = data?.data?.matchedUser?.tagProblemCounts?.intermediate || [];
      const fundamentalTopics = data?.data?.matchedUser?.tagProblemCounts?.fundamental || [];

      // Combine all topics into a single array
      const allTopics = [
        ...advancedTopics,
        ...intermediateTopics,
        ...fundamentalTopics
      ];

      // Map them to the desired format
      const topics = allTopics.map(topic => ({
        topic: topic.tagName,
        count: topic.problemsSolved
      }));

      return topics;
      
    } else {
      console.error("Error:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

async function postContestStats(username) {
  const url = "https://leetcode.com/graphql"; // Replace with actual GraphQL endpoint
  const query = `
    query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}
  `;

  const variables = {
    username: username
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_ACCESS_TOKEN", // If authentication is needed
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });

    const data = await response.json();
    const rating = Math.floor(data.data.userContestRanking.rating);
    if (response.ok) {
      const da = {
        contestRating:rating,
        totalContests : data.data.userContestRanking.attendedContestsCount,
        rankingHistory : data.data.userContestRankingHistory
      };
      return da;
      
    } else {
      console.error("Error:", data.errors);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}
async function codeforcesContestHistory(handle){
  
  const apiUrl = `https://codeforces.com/api/user.rating?handle=${handle}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.status !== "OK") {
        console.log("Codeforces1 error ");
        return;
    }
    // console.log(data.result);

    const ratingData = data.result.map(item => ({
      contestId: item.contestId,
      rating: Math.round(item.newRating), // Convert rating to integer
      rank: item.rank,
      date: new Date(item.date * 1000).toLocaleDateString() // Convert date from Unix timestamp
    }));

    return ratingData;

    
  }catch (error) {
    console.log("CF 1 error");
    return;
}
}

async function codeforcesTotal(req) {
    if (!req.user.codeforces) {
        console.log("Codeforces 1 url not found");
        return;
    }
    

    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            // console.log(data.comment);
            console.log("Codeforces1 error ");
            return;
        }

        const submissions = data.result;

        const solvedProblems = new Set();
        const tagCount = {};
        const contestsAttended = new Set();

        const activeDays = new Set();
        
        let easy = 0, medium = 0, hard = 0;
        function categorizeProblem(problem) {
            const points = problem.points || 0;

            if (points < 1000) return "easy";
            if (points < 1500) return "medium";
            return "hard";
        }

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;

                if (!solvedProblems.has(problemKey)) {
                    const category = categorizeProblem(problem);

                // Increment the respective counter
                    if (category === "easy") easy++;
                    else if (category === "medium") medium++;
                    else  hard++;
                }
                
                // Add the solved problem to the set
                solvedProblems.add(problemKey);

                // Aggregate tags
                if (problem.tags && Array.isArray(problem.tags)) {
                    problem.tags.forEach((tag) => {
                        tagCount[tag] = (tagCount[tag] || 0) + 1;
                    });
                }

                // Track contests
                if (submission.contestId) {
                    contestsAttended.add(submission.contestId);
                }

                
            }

            const date = new Date(submission.creationTimeSeconds * 1000);
            const formattedDate = date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
            activeDays.add(formattedDate);
        });
        const totalSolved = easy + medium + hard;
    
        const tagsArray = Object.entries(tagCount).map(([topic, count]) => ({ topic, count }));
        const history =await codeforcesContestHistory(handle);
        const rating = await codeforcesUserData(handle);
        const result = {
            totalSolved: solvedProblems.size,
            contestsAttended: contestsAttended.size,
            tags: tagsArray,
            totalActiveDays: activeDays.size,
            easy,medium,hard,totalSolved,
            contestRating:rating,
            rankingHistory:history
        };

        return result;
    } catch (error) {
        console.log("CF 1 error");
        // console.log(error);
        return;
    }
}

async function codeforcesData(req) {
    if(!req.user.codeforces){
        console.log("Codeforces 2 url not found");
        return;
    }
    const handle = req.user.codeforces.split("/").filter(Boolean).pop();
    const apiUrl = `https://codeforces.com/api/user.status?handle=${handle}`;
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== "OK") {
            console.log(data.comment);
            return;
        }
        
        const submissions = data.result;
        const solvedProblems = new Set();

        submissions.forEach((submission) => {
            if (submission.verdict === "OK") {
                const problem = submission.problem;
                const problemKey = `${problem.contestId}${problem.index}`;
                solvedProblems.add(problemKey);
            }
        });
        return solvedProblems.size;
    } catch (error) {
        console.log("CF 2");
        // console.log(error);        
        return;
    }
}

async function codeforcesUserData(handle) {
  
  const apiUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
  try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.status !== "OK") {
          console.log(data.comment);
          return;
      }
      
      return data.result[0].rating;
  } catch (error) {
      console.log("CF 3");      
      return;
  }
}

const codechefData = async (req) => {
    if(!req.user.codechef){
        console.log("Codechef url not found");

        return;
    }
    
    const username = req.user.codeforces.split("/").filter(Boolean).pop();
    try {
      // const url = `https://www.codechef.com/users/${username}`;
      const url = req.user.codechef;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const contestRating = $('.rating-number').eq(0).text().match(/\d+/); 
      const problemsSolved = $('.problems-solved h3').filter((i, el) => $(el).text().includes('Total Problems Solved')).text().match(/\d+/); 
      
      const numberOfContestAttendedText = $('.contest-participated-count').text();
      const numberOfContestAttended = numberOfContestAttendedText.match(/\d+/);
            
      const result={
        problemsSolved:problemsSolved!=null?problemsSolved[0]:0,
        contestRating:contestRating!=null?contestRating[0]:0,
        numberOfContestAttended:numberOfContestAttended!=null?numberOfContestAttended[0]:0
      }
      

    return result;
    } catch (error) {
    // console.log(error);
    console.log("Codechef error");
    return;
    }
};

const geekforgeeksData = async (req) => {
    
    
    if(!req.user.geekforgeeks){
        console.log("Geekforgeeks url not found");
        return;
    }
    
    try {
      const url = `${req.user.geekforgeeks}`;
      const { data } = await axios.get(url);
      const $ = load(data);
      
      
      const problemsSolved = $('.scoreCard_head_left--score__oSi_x').eq(1).text().match(/\d+/); 
      const codingScore = $('.scoreCard_head_left--score__oSi_x').eq(0).text().match(/\d+/); 
      const contestRating = $('.scoreCard_head_left--score__oSi_x').eq(2).text().match(/\d+/);  
      
      const result={
        codingScore:codingScore!=null? codingScore[0]:0,
        problemsSolved:problemsSolved!=null?problemsSolved[0]:0,
        contestRating:contestRating!=null?contestRating[0]:0,
      }

    return result;

    } catch (error) {
    // console.log(error);
    console.log("GFG error");
    
    return;
    }
  };

  const getAllData = async (req, res, next) => {
    try {
      let allData = {};
      
  
      const leetcodeResult = await leetcodeData(req);
      allData.leetcode = leetcodeResult;
  
      const codeforcesResult = await codeforcesData(req);
      allData.codeforces = codeforcesResult;
  
      const codeforcesTotalResult = await codeforcesTotal(req);
      allData.codeforcesTotal = codeforcesTotalResult;
  
      const codechefResult = await codechefData(req);      
      
      
      allData.codechef = codechefResult;
  
      const geekforgeeksResult = await geekforgeeksData(req);
      allData.geekforgeeks = geekforgeeksResult;
  


    const data = {
        totalQuestions:0,
        totalContests:0,
        totalActiveDays:0,
        easy:0,
        medium:0,
        hard:0,
        topics:[],
        leetcodeRating:0,
        geekforgeeksRating:0,
        codechefRating:0,
        codeforcesRating:0,
        leetcodeRankingHistory:[],
        codeforcesRankingHistory:[],
    }
    
    //sum all
    // Leetcode Data Aggregation
    if (allData.leetcode && allData.leetcode.data) {
      const leetcodeData = allData.leetcode.data.matchedUser.submitStats.acSubmissionNum;
      data.totalQuestions += leetcodeData.find((stat) => stat.difficulty === "All")?.count || 0;
      data.easy += leetcodeData.find((stat) => stat.difficulty === "Easy")?.count || 0;
      data.medium += leetcodeData.find((stat) => stat.difficulty === "Medium")?.count || 0;
      data.hard += leetcodeData.find((stat) => stat.difficulty === "Hard")?.count || 0;
      data.totalActiveDays += allData.leetcode.data.matchedUser.userCalendar.totalActiveDays;
      allData.leetcode.topics.forEach((tag) => {
        data.topics.push({ topic: tag.topic, count: tag.count });
      });
      data.totalContests+=allData.leetcode.totalContests;
      data.leetcodeRankingHistory = allData.leetcode.rankingHistory;
      data.leetcodeRating = allData.leetcode.contestRating
    }

    // Codeforces Data Aggregation
    if (allData.codeforcesTotal) {
      data.totalContests += allData.codeforcesTotal.contestsAttended;
      data.easy += allData.codeforcesTotal.easy;
      data.medium += allData.codeforcesTotal.medium;
      data.hard += allData.codeforcesTotal.hard;
      data.totalActiveDays += allData.codeforcesTotal.totalActiveDays;
      data.totalQuestions += allData.codeforcesTotal.easy + allData.codeforcesTotal.medium + allData.codeforcesTotal.hard;

      // Aggregating tags/topics
      // allData.codeforcesTotal.tags.forEach((tag) => {
      //   data.topics.push({ topic: tag.topic, count: tag.count });
      // });
      allData.codeforcesTotal.tags.forEach((tag) => {
        const existingTopic = data.topics.find((t) => t.topic === tag.topic);
        if (existingTopic) {
          existingTopic.count += tag.count; // Add counts if topic already exists
        } else {
          data.topics.push({ topic: tag.topic, count: tag.count });
        }
      });
      // data.codeforcesRating=allData.codeforces.contestRating;
      data.codeforcesRating=allData.codeforcesTotal.contestRating
      data.codeforcesRankingHistory = allData.codeforcesTotal.rankingHistory
    }

    // Codechef Data Aggregation
    if (allData.codechef) {
      data.codechefRating = allData.codechef.contestRating,
      data.totalQuestions += parseInt(allData.codechef.problemsSolved) || 0;
      data.medium +=parseInt(allData.codechef.problemsSolved) || 0;
      data.totalContests += parseInt(allData.codechef.numberOfContestAttended) || 0;
    }

    // GeekforGeeks Data Aggregation
    if (allData.geekforgeeks) {
      data.geekforgeeksRating = allData.geekforgeeks.contestRating,
      data.totalQuestions += parseInt(allData.geekforgeeks.problemsSolved) || 0;
      data.medium +=parseInt(allData.geekforgeeks.problemsSolved) || 0;
    }

    // console.log(data);
    
      
      res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  };


  export { leetcodeData, codeforcesData, codeforcesTotal, codechefData, geekforgeeksData ,getAllData};