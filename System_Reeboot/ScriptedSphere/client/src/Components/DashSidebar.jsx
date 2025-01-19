import { Button, Modal, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsExclamationCircle } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";

export default function DashSidebar() {

  const location = useLocation();
  const [tab,setTab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user);

  const [showModal,setShowModal] = useState(false);  

  useEffect(()=>{
    
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    
    if(tabFromUrl) setTab(tabFromUrl);
    
  },[location.search]);

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
    <Sidebar className="w-full md:w-56 " >
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to='/dashboard?tab=dash' >
                    <Sidebar.Item as='div' active={tab==='dash'} icon={MdDashboard} label={currentUser.isAdmin?"Admin":"User"} labelColor='dark' >
                        DashBoard
                    </Sidebar.Item >
                </Link>

                <Link to='/dashboard?tab=profile&tabProfile=basicInfo' >
                    <Sidebar.Item as='div' active={tab==='profile'} icon={HiUser} >
                        Edit Profile
                    </Sidebar.Item >
                </Link>
                <Link to='/dashboard?tab=contests' >
                    <Sidebar.Item as='div' active={tab===''} icon={FaRankingStar}  >
                        Contests
                    </Sidebar.Item >
                </Link>
                <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item as='div' active={tab==='posts'} icon={HiDocumentText}  labelColor='dark' >
                        DSA Sheet
                    </Sidebar.Item >
                </Link>
                {currentUser.isAdmin &&  (<Link to='/dashboard?tab=users'>
                    <Sidebar.Item as='div' active={tab==='users'} icon={FaUsers}  labelColor='dark' >
                        All users
                    </Sidebar.Item >
                </Link>)}
                <Sidebar.Item onClick={()=>setShowModal(true)} active={tab==='signout'} icon={HiArrowSmRight} className='cursor-pointer' >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
      <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <BsExclamationCircle className="h-14 w-14 text-red-500 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 " >Are you sure you want to sign out?</h3>
            <div className="flex justify-center gap-4">
              <Button color="faliure" onClick={handleSignOut}>
                Yes,I am sure
              </Button>
              <Button onClick={()=>setShowModal(false)} color="gray" >
                No,cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
    </Modal>

    </Sidebar>
  )
}
