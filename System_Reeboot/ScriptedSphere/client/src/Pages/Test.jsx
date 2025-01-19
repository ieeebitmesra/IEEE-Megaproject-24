import { useState } from "react";

const LeetCodeProfile = () => {
  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
//   const[data,setData]=useState({});

  const fetchProfile = async () => {
    const query = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              aboutMe
              countryName
              reputation
              ranking
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username },
    };

    try {
      const response = await fetch("http://localhost:4000/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(query),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setProfileData(data.data.matchedUser);
      setError("");
    } catch (err) {
      setError(err.message);
      setProfileData(null);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>LeetCode Profile Fetcher</h2>
      <input
        type="text"
        placeholder="Enter LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button
        onClick={fetchProfile}
        style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
      >
        Fetch Profile
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {profileData && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>{profileData.username}s Profile</h3>
          <p><strong>Real Name:</strong> {profileData.profile.realName || "N/A"}</p>
          <p><strong>About Me:</strong> {profileData.profile.aboutMe || "N/A"}</p>
          <p><strong>Country:</strong> {profileData.profile.countryName || "N/A"}</p>
          <p><strong>Reputation:</strong> {profileData.profile.reputation}</p>
          <p><strong>Ranking:</strong> {profileData.profile.ranking}</p>
          <h4>Submission Stats:</h4>
          <ul>
            {profileData.submitStats.acSubmissionNum.map((stat, index) => (
              <li key={index}>
                <strong>{stat.difficulty}:</strong> {stat.count} accepted out of {stat.submissions} submissions
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeetCodeProfile;
