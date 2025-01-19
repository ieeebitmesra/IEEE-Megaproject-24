import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import OAuth from '../Components/OAuth';



export default function SignIn() {

  const [formdata,setFormData]= useState({});

  const {loading,error:errorMessage} = useSelector(state => state.user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formdata,
      [e.target.id]:e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formdata.email || !formdata.password){
      return dispatch(signInFailure("Please Fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
      });

      const data = await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg w-[90%] md:w-[80%] lg:w-[70%]">
        {/* Left Section: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://cdn.dribbble.com/userupload/8432950/file/original-0c14504bd291054d76548cb015dff89a.png?resize=1200x900&vertical=center"
            alt="Illustration"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 px-6 py-10">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome back!</h1>
          <p className="text-sm text-center text-gray-500 mb-8">
            Please enter your details
          </p>
          <form className="flex flex-col gap-4">
            
            {/* Email */}
            <div>
              <Label value="Your Email" />
              <TextInput onChange={handleChange}
                type="email"
                placeholder="Email"
                id="email"
                className="mt-1"
              />
            </div>
            {/* Password */}
            <div>
              <Label value="Your Password" />
              <TextInput onChange={handleChange}
                type="password"
                placeholder="Password"
                id="password"
                className="mt-1"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit" onClick={handleSubmit} disabled={loading}
              className="bg-black text-white rounded-lg py-2"
            >
              {
                loading ? (
                  <Spinner size='sm' />
                ):'Log In'
              }
            </Button>
            <OAuth />
          </form>

          {/* Footer Links */}
          <div className="text-sm text-center mt-4">
            <span>Dont have an account? </span>
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure' >{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
