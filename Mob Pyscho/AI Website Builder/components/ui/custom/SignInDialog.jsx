import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import uuid4 from 'uuid4';

function SignInDialog({ openDialog, closeDialog }) {
const {userDetail,setUserDetail} = useContext(UserDetailContext)
const CreateUser= useMutation(api.users.CreateUser)

    
const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse?.access_token} },
      );
  
      console.log(userInfo);
      const user = userInfo?.data 
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()

      })

      if(typeof window!== undefined){
        localStorage.setItem('user',JSON.stringify(user))
      }
      setUserDetail(userInfo?.data);
      closeDialog(false)
    },
    onError: errorResponse => console.log(errorResponse),
  });
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                    <div className="flex flex-col items-center justify-center gap-3">
                            <div className='font-bold text-2xl text-center text-white'>
                                {Lookup.SIGNIN_HEADING}
                            </div>
                            <div className='mt-2 text-center'>
                                {Lookup.SIGNIN_SUBHEADING}
                            </div>
                            <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>
                                Continue With Google
                            </Button>
                            <p className="text-center text-sm text-gray-400 mt-2">
                                {Lookup.SIGNIn_AGREEMENT_TEXT}
                            </p>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                    
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog
