
import { Alert, Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import { TbBrandLeetcode } from "react-icons/tb";
import { SiCodechef, SiCodeforces, SiGeeksforgeeks } from "react-icons/si";

export default function Platforms() {
  const {currentUser,error,loading} = useSelector((state)=>state.user);

  const [formdata,setFormData] = useState({});
  const [uploadSuccess , setUploadSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const location = useLocation();
  const [,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tabProfile');
    
    if(tabFromUrl) setTab(tabFromUrl);

  },[location.search]);


  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.id]:e.target.value,
    });
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    if(Object.keys(formdata).length===0){
      setUpdateUserError("No chages Made");
      setTimeout(()=>{
        setUpdateUserError(null);
      },5000);
      return;
    }
    
    try {
     dispatch( updateUserStart());
     const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'PUT',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
     })
     const data = await res.json();
     if(!res.ok){
        setUpdateUserError(data.message);
        setTimeout(()=>{
          setUpdateUserError(null);
        },5000);
        dispatch(updateUserFailure());
     }
     else{
      dispatch(updateUserSuccess(data));
      setUploadSuccess("User's profile updated successfully !!!");
      setTimeout(()=>{
        setUploadSuccess(null);
      },5000);
     }
     dispatch(updateUserEnd());
    } catch (error) {
      dispatch(updateUserFailure(error));
      dispatch(updateUserEnd());
    }
  }
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-[90%] mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="">
        <h1 className="text-3xl font-semibold opacity-80 text-gray-800 dark:text-white">
            Platforms (Fill Atleast one to view dashBoard)
        </h1>
        <p className="text-sm mt-2">You can update and verify your platform details here.</p>
        </div>
      </div>
      <div className="">
    <div className="mt-8  grid grid-cols-1 gap-6">
        {/* Leetcode */}
        <div className="flex flex-row ml-5 items-center gap-2 p-2">
            <TbBrandLeetcode className="align-middle" />
            <p className="opacity-80 mr-9">Leetcode</p>
            <div className="flex items-center  border border-gray-300 rounded-md">
                <span className="bg-gray-100 text-gray-600 px-2 rounded-l-md">
                    https://leetcode.com/u/
                </span>
                <input
                    type="text"
                    id="leetcode"
                    className="flex-1 px-2 w-[20vw] rounded-r-md focus:outline-none opacity-70 "
                    onChange={handleChange}
                    defaultValue={currentUser.leetcode?.replace("https://leetcode.com/u/", "") || ""}
                    placeholder="username"
                />
            </div>
        </div>

        {/* Codeforces */}
        <div className="flex flex-row ml-5 items-center gap-2 p-2">
            <SiCodeforces className="align-middle" />
            <p className="opacity-80 mr-6">Codeforces</p>
            <div className="flex items-center  border border-gray-300 opacity-70  rounded-md">
                <span className="bg-gray-100 text-gray-600 px-2 rounded-l-md">
                    https://codeforces.com/profile/
                </span>
                <input
                    type="text"
                    id="codeforces"
                    className="flex-1 px-2 w-[16vw] rounded-r-md focus:outline-none"
                    onChange={handleChange}
                    defaultValue={currentUser.codeforces?.replace("https://codeforces.com/profile/", "") || ""}
                    placeholder="username"
                />
            </div>
        </div>

        {/* Codechef */}
        <div className="flex flex-row ml-5 items-center gap-2  p-2">
            <SiCodechef className="align-middle" />
            <p className="opacity-80 mr-9">Codechef</p>
            <div className="flex items-center  border border-gray-300 opacity-70  rounded-md">
                <span className="bg-gray-100 text-gray-600 px-2 rounded-l-md">
                    https://www.codechef.com/users/
                </span>
                <input
                    type="text"
                    id="codechef"
                    className="flex-1 px-2 w-[15vw] rounded-r-md focus:outline-none"
                    onChange={handleChange}
                    defaultValue={currentUser.codechef?.replace("https://www.codechef.com/users/", "") || ""}
                    placeholder="username"
                />
            </div>
        </div>

        {/* GeeksforGeeks */}
        <div className="flex flex-row ml-5 items-center gap-2 p-2">
            <SiGeeksforgeeks className="align-middle" />
            <p className="opacity-80 mr-1">GeeksforGeeks</p>
            <div className="flex flex-col md:flex-row items-center  border border-gray-300 opacity-70  rounded-md">
                <span className="bg-gray-100 text-gray-600 px-2 rounded-l-md">
                    https://www.geeksforgeeks.org/user/
                </span>
                <input
                    type="text"
                    id="geekforgeeks"
                    className="flex-1 px-2  rounded-r-md focus:outline-none"
                    onChange={handleChange}
                    defaultValue={currentUser.geekforgeeks?.replace("https://www.geeksforgeeks.org/user/", "") || ""}
                    placeholder="username"
                />
            </div>
        </div>
    </div>

    {/* Save Button */}
    <div className="mt-4">
        <Button className="mx-auto w-[40%]" onClick={handleSubmit}>
            {loading ? 'Loading...' : 'Save'}
        </Button>
    </div>

    {/* Success and Error Messages */}
    {uploadSuccess && (
        <Alert color="success" className="mt-5">
            {uploadSuccess}
        </Alert>
    )}
    {updateUserError && (
        <Alert color="failure" className="mt-5">
            {updateUserError}
        </Alert>
    )}
</div>

    </div>
  );
}
