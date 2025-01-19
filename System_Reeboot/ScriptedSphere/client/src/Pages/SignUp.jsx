
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiWelcometothejungle } from "react-icons/si";
import OAuth from '../Components/OAuth';

export default function SignUp() {

  const [formdata,setFormData]= useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formdata,
      [e.target.id]:e.target.value.trim()
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formdata.username || !formdata.email || !formdata.password){
      return setErrorMessage("Please Fill out all fields");
    }
    try {
      setErrorMessage(null);
      setLoading(true);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formdata),
      });

      const data = await res.json();
      setLoading(false);
      if(data.success===false){
        return setErrorMessage(data.message);
      }
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
        <div className="flex justify-center  ">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome  </h1>
          <SiWelcometothejungle className='mt-3 ml-2' />
          </div>
          <p className="text-sm text-center text-gray-500 mb-8">
            Please enter your details
          </p>
          <form className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <Label value="Your Username" />
              <TextInput onChange={handleChange}
                type="text"
                placeholder="Username"
                id="username"
                className="mt-1"
              />
            </div>
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
                ):'Sign Up'
              }
            </Button>
            <OAuth />
          </form>

          {/* Footer Links */}
          <div className="text-sm text-center mt-4">
            <span>Have an account? </span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign in
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
