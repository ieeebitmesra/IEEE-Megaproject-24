import { Button, Textarea, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch  } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app2 } from "../../firebase";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { updateUserStart,updateUserSuccess,updateUserFailure,updateUserEnd} from "../../redux/user/userSlice";
import {useLocation} from "react-router-dom";


export default function BasicInfo() {
  
  const {currentUser,error,loading} = useSelector((state)=>state.user);
  const [imageFileUrl,setImageFileUrl] = useState(null);

  const [imageFile,setImageFile] = useState(null);
  const filePickerRef = useRef();

  const [imageFileUploadingProgress,setImageFileUploadingProgress] = useState(null);
  const [imageFIleUploadError,setImageFileUploadError]= useState(null);

  const [formdata,setFormData] = useState({});
  const [imageUpladSuccess , setImageUpladSuccess] = useState(false);
  const [uploadSuccess , setUploadSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);

  const dispatch = useDispatch();

  const location = useLocation();
  const [tab,setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tabProfile');
    
    if(tabFromUrl) setTab(tabFromUrl);

  },[location.search]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if(imageFile){
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageFile]);  
  

  const uploadImage = async ()=>{
    setImageFileUploadError(null);

    const storage = getStorage(app2);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage,fileName);

    const uploadTask = uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes) *100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        setImageFileUrl(null);
        setImageFileUploadingProgress(null);
        setImageFileUploadError("Could not upload image (File must be less than 2mb) ");
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploadingProgress(null);
          setFormData({...formdata,profilePicture:downloadUrl});
          setImageUpladSuccess(true);
          setTimeout(()=>{
            setImageUpladSuccess(false);
          },5000);
        })
      }
    )
  }

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
    if(imageFileUploadingProgress){
      setUpdateUserError("Please wait for image to upload");
      setTimeout(()=>{
        setUpdateUserError(null);
      },5000);
      return;
    }
    try {
     dispatch( updateUserStart());
     console.log(formdata);
     
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
          Basic Info
        </h1>
        <p className="mt-4 opacity-90 text-gray-600 dark:text-gray-300 leading-relaxed">
          You can manage your details here.
        </p>
        </div>
        {/* <div className="">
            <Button onClick={handleSubmit} className="hidden md:w-[140%] md:flex " >Save</Button>
        </div> */}
      </div>
      <div className="">
        <h3 className="text-xl mt-5 font-semibold opacity-80">Basic Details</h3>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className=" text-white rounded-full">
              <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={handleImageChange} />
              <img className="rounded-full h-20 w-20" src={imageFileUrl || currentUser.profilePicture || "./profile.png"} onError={(e)=>e.target.src="./profile.png"} alt="" />
              {imageFileUploadingProgress && (
            <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}` } 
              styles={{
                // root:{
                //   width:'40%',
                //   height:'40%',
                //   position:"absolute",
                //   top:0,left:0,
                // },
                path:{
                  stroke:`rgba (62,152,199,${imageFileUploadingProgress /100})`,
                }
              }}
            /> 
          )}
            </div>
            <div className="flex flex-col justify-center items-center" >
              <Button onClick={()=>filePickerRef.current.click()} >Change Pic</Button>
              {imageFIleUploadError && 
          <Alert color="failure" > {imageFIleUploadError} </Alert>
        }
        {imageUpladSuccess && (
        <Alert color="success" className="mt-5 ml-5">
          Image Uploaded successfully
        </Alert>
      ) }
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg opacity-85 font-semibold text-gray-800 dark:text-white">
                First Name
              </h2>
              <TextInput className="opacity-90 mt-3 w-[130%]" id="firstname" onChange={handleChange} defaultValue={currentUser.firstname} placeholder="Enter Name" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg opacity-85 font-semibold text-gray-800 dark:text-white">
                Last Name
              </h2>
              <TextInput className="opacity-90 mt-3 w-[130%]" onChange={handleChange} id="lastname" defaultValue={currentUser.lastname } placeholder="Enter Title " />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="flex flex-col">
                <p className="opacity-80">Email</p>
                <TextInput className="opacity-90 mt-3" id="email" onChange={handleChange} defaultValue={currentUser.email } placeholder="Enter Email " />
            </div>
            <div className="flex flex-col ">
                <p className="opacity-80" >Bio(Max 200 Characters)</p>
                <Textarea rows={6} className="opacity-90 mt-3 " id="bio" onChange={handleChange} defaultValue={currentUser.bio }/>
            </div>
            <div className="flex flex-col">
                <p className="opacity-80">Country</p>
                <TextInput className="opacity-90 mt-3" id="country" onChange={handleChange} defaultValue={currentUser.country }  />
            </div>
        </div>
        <div className="mt-4">
            <Button onClick={handleSubmit} className="mx-auto w-[40%] " >{loading ? 'Loading...' : 'Update'}</Button>
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
