import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Label, Table } from "flowbite-react";
// import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks, SiCodeforces } from "react-icons/si";
import Loader from "./Loader";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  // console.log(userPosts);
  const [loading,setLoading] = useState(false);
  const [showMore,setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts`);
        // console.log(res);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
          if(data.length <= 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}&limit=150`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev)=>[...prev,...data.posts]);
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Loader />
  }

  return (
    <div className="p-5 pr-3 table-auto scrollbar-hide overflow-x-scroll  md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell> Status </Table.HeadCell>
              <Table.HeadCell> Problem </Table.HeadCell>
              <Table.HeadCell> Topic </Table.HeadCell>
              <Table.HeadCell> Solution </Table.HeadCell>
              <Table.HeadCell> Platform </Table.HeadCell>
              <Table.HeadCell> Difficulty </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post, key) => (
              <Table.Body key={key} className="bg-white divide-y dark:border-gray-700 dark:bg-gray-800" >
                <Table.Row>
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        window.open(
                          post.question,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      {post.title}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{post.topic}</Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        window.open(
                          post.youtube,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      <FaYoutube className="text-red-600 w-9 h-9" />
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        window.open(
                          post.question,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      {post.platform === "leetcode" ? (
                        <SiLeetcode className="text-yellow-600 h-9 w-9" />
                      ) : post.platform === "geekForGeeks" ? (
                        <SiGeeksforgeeks className="text-green-500 h-9 w-9" />
                      ) : (
                        <SiCodeforces className=" h-9 w-9" />
                      )}
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    {post.difficulty === "easy" ? (
                      <Label className="text-green-500 ">Easy</Label>
                    ) : post.difficulty === "medium" ? (
                      <Label className="text-yellow-500">Medium</Label>
                    ) : (
                      <Label className="text-red-500">Hard</Label>
                    )}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7" >Show More...</button>
            )
          }
        </>
      ) : (
        <div className="">
          <Loader />
        </div>
      )}
    </div>
  );
}
