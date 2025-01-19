import {  Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { IoShareSocialSharp } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";

export default function ProfileSidebar() {

  const location = useLocation();
  const [tab,setTab] = useState('');
//   const {currentUser} = useSelector((state)=>state.user);
    
  useEffect(()=>{
    
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tabProfile');
    
    if(tabFromUrl) setTab(tabFromUrl);
  },[location.search]);

  return (
    <Sidebar className="w-full md:w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg  h-full " >
        <Sidebar.Items className="" >
            <Sidebar.ItemGroup className="  flex flex-col gap-1">
                <Link to='/dashboard?tabProfile=basicInfo' >
                    <Sidebar.Item as='div' active={tab==='basicInfo'} icon={FaRegUser} >
                        Basic Info
                    </Sidebar.Item >
                </Link>
                <Link to='/dashboard?tabProfile=college' >
                    <Sidebar.Item as='div' active={tab==='college'} icon={GiGraduateCap}  >
                        College
                    </Sidebar.Item >
                </Link>

                <Link to='/dashboard?tabProfile=socials' >
                    <Sidebar.Item as='div' active={tab==='socials'} icon={IoShareSocialSharp} >
                        Socials
                    </Sidebar.Item >
                </Link>
                <Link to='/dashboard?tabProfile=platform' >
                    <Sidebar.Item as='div' active={tab==='platform'} icon={CgWebsite}  >
                        Platform
                    </Sidebar.Item >
                </Link>
            </Sidebar.ItemGroup>
        </Sidebar.Items>

    </Sidebar>
  )
}
