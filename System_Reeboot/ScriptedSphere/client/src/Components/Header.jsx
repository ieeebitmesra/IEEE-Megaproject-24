
import {  Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
import { MdDarkMode, } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";

export default function Header() {
    const path=useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    const {theme} = useSelector(state=> state.theme );

    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('api/user/signout',{
            method:"POST"
          });
          const data= await res.json();
          if(!res.ok){
            dispatch(signOutUserFailure(data.message));
          }
          else{
            dispatch(signOutUserSuccess());
          }
        } catch (error) {
          console.log(error);
          dispatch(signOutUserFailure(error));
        }
      }

  return (
    <Navbar className="relative z-50 bg-transparent ">
        <Link to="/" className="flex gap-2 self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span>
                <img className="h-8 w-8" src="/logoSS.png " alt="" />
            </span>
            <div className="">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg text-white ">Scripted</span>
            <span>Sphere</span>
            </div>
        </Link>
        
        <div className="flex gap-2 md:order-2">
            <Button className="w-12 h-10  sm:inline " color="gray" onClick={() => dispatch(toggleTheme())}>
                {theme==='light' ? <FaSun /> : <MdDarkMode /> }  
            </Button>
            {currentUser ? (
                <>
                <Link to="/dashboard?tab=dash">
                <Button className="bg-black text-white" gradientDuoTone="white">
                    DashBoard
                </Button>
            </Link>
                <Dropdown arrowIcon={false} inline label={
                    <Avatar  alt="user" img={currentUser.profilePicture} rounded onError={(e) => e.target.src = "./profile.png"} />
                    
                } >
                   <Dropdown.Header>
                    {/* <span className="block text-sm ">@{currentUser.username}</span> */}
                    <span className="block text-sm font-medium truncate">Email : {currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile&tabProfile=basicInfo'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignOut} >SignOut</Dropdown.Item>
                </Dropdown>
                </>
            ): (<>
                <Link to="/sign-in">
                <Button className="background-none hidden sm:inline" gradientDuoTone="none">
                    Log In
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button className="bg-black text-white" gradientDuoTone="white">
                    Sign Up
                </Button>
            </Link>
            </>
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="">
            <Navbar.Link active={path==='/'} as={'div'}>
                <Link  to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/about'} as={'div'}>
                <Link  to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'}>
                <Link  to="/dashboard?tab=posts">DSA Sheet</Link>
            </Navbar.Link>
            <Navbar.Link active={path==='/project'} as={'div'}>
                <Link  to="/dashboard?tab=contests">Contests</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
