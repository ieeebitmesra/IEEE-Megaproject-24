import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaUniversity, FaLinkedinIn } from "react-icons/fa";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-3">
      <div className="w-[50%]  mx-auto bg-slate-600 rounded-full mt-3 ">
        <img
          className=" mx-auto rounded-full h-full w-full"
          src={currentUser.profilePicture}
          alt=""
          onError={(e) => e.target.src = "./profile.png"}
        />
      </div>
      <div className="text-center font-serif ">
        <p className="font-semibold text-xl">
          <span>Sachin</span>
          &nbsp;
          <span>Kumar</span>
        </p>
        <p className="">#{currentUser.username}</p>
        {currentUser.aboutMe ? (
          <p className="m-3">{currentUser.aboutMe}</p>
        ) : (
          <p className="m-3">
            Life goal : Stable Lifestyle.{" "}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 p-3 ">
        <div className="flex h-12 rounded-lg flex-wrap justify-center items-center overflow-hidden bg-slate-200 dark:bg-slate-700">
          <span>
            <MdEmail className="" />{" "}
          </span>
          <span className="truncate overflow-hidden ">
            &nbsp; {currentUser.email.slice(0, 25)}{" "}
          </span>
        </div>
        <div className="flex h-12  rounded-lg flex-wrap justify-center items-center overflow-hidden bg-slate-200 dark:bg-slate-700">
          <span>
            <FaLocationDot className=" " />{" "}
          </span>
          <span>&nbsp; {currentUser.country || "Location"} </span>
        </div>
        <div className="flex h-12 rounded-lg flex-wrap justify-center items-center overflow-hidden bg-slate-200 dark:bg-slate-700">
          <span>
            <FaUniversity className=" " />{" "}
          </span>
          <span>&nbsp; {currentUser.college || "Your college"} </span>
        </div>
        <a
          href={
            currentUser.linkedIn ||
            "https://www.linkedin.com/in/sachin-kumar-90884117a/"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex h-12 rounded-lg justify-center items-center overflow-hidden bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 transition-colors duration-200">
            <span>
              <FaLinkedinIn className="mr-2" />
            </span>
            <span className="truncate">
              {currentUser.linkedin || "LinkedIn"}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
