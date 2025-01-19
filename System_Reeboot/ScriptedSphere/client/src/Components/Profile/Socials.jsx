
import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";

import { Alert } from "flowbite-react";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";

export default function Socials() {
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
        Social Profile
        </h1>
        <p className="text-sm mt-2">You can update your social media details here.</p>
        </div>
      </div>
      <div className="">        
        <div className="mt-8 grid grid-cols-1 gap-6 ">
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaLinkedin className="align-middle" />
                <p className="opacity-80 ml-1">Linkedin &nbsp;  </p>
                <TextInput className="opacity-90 w-[40%]" id="linkedin" onChange={handleChange} defaultValue={currentUser.linkedin } placeholder="https://www.linkedin.com/in/JohnDoe " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaGithub className="align-middle" />
                <p className="opacity-80">Github &nbsp;&nbsp;&nbsp;&nbsp; </p>
                <TextInput className="opacity-90 w-[40%]" id="github" onChange={handleChange} defaultValue={currentUser.github } placeholder="https://github.com/JohnDoe " />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <FaInstagram className="align-middle" />
                <p className="opacity-80"> Instagram </p>
                <TextInput className="opacity-90 w-[40%]" id="instagram" onChange={handleChange} defaultValue={currentUser.instagram } placeholder="https://www.instagram.com/JohnDoe" />
            </div>
            <div className="flex flex-row ml-5 items-center gap-2 p-2">
                <GrDocumentText className="align-middle" />
                <p className="opacity-80"> Resume &nbsp;&nbsp;&nbsp; </p>
                <TextInput className="opacity-90 w-[40%]" id="resume" onChange={handleChange} defaultValue={currentUser.resume } placeholder="http://drive.com/resume " />
            </div>
        </div>
        <div className="mt-4">
            <Button className="mx-auto w-[40%] " onClick={handleSubmit} >{loading ? 'Loading...' : 'Save'}</Button>
        </div>
        {uploadSuccess && (
        <Alert color="success" className="mt-5">
          {uploadSuccess}
        </Alert>
      ) }
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      ) }
      {/* {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      ) } */}
      </div>
    </div>
  );
}
