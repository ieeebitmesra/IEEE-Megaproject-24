import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { useEffect,useState } from "react";
import { useDispatch,  } from "react-redux";
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";

export default function College() {
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
          Educational Details
        </h1>
        </div>
      </div>
      <div className="">        
        <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="flex flex-col">
                <p className="opacity-80">College</p>
                <TextInput className="opacity-90 mt-3" id="college" onChange={handleChange} defaultValue={currentUser.college } placeholder="Enter your college name " />
            </div>
            <div className="flex flex-col ">
                <p className="opacity-80" >Degree</p>
                <TextInput className="opacity-90 mt-3" id="degree" onChange={handleChange} defaultValue={currentUser.degree } placeholder="Enter degree " />
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Branch</p>
                <TextInput className="opacity-90 mt-3" id="branch" onChange={handleChange} defaultValue={currentUser.branch } placeholder="Enter Branch" />
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Year Of Graduation</p>
                <TextInput className="opacity-90 mt-3" id="yearOfGraduation" onChange={handleChange} defaultValue={currentUser.yearOfGraduation } placeholder="Enter Year Of Graduation" />
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
