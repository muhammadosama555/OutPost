import React, { useRef } from 'react'
import { useLogin } from '../apiCalls/userApiCalls';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
export default function ForgetPassword() {
  const emailInputElement = useRef();
  const passwordInputElement = useRef();

  const {
    mutate: userMutate,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailInputElement.current?.value,
      password: passwordInputElement.current?.value,
    };
    userMutate(data);
  };


  return (
    <>
      <div className=' flex items-center justify-center w-screen h-screen'>
        <div className='h-3/5 w-1/4  flex login-shadow'>
          <div className="border border-t border-l border-b border-gray-200 w-full flex flex-col  justify-between items-center">
            <div className='flex flex-col items-center justify-center h-full'>
              
              <h2 className="logo font-medium text-4xl text-gray-700">OutPost</h2>
              <h2 className='text-lg font-medium text-gray-700 pt-3 pb-6'>Trouble logging in?</h2>
              <form action="" onSubmit={handleSubmit} className='space-y-3 w-4/5'>
                <div className='flex flex-col space-y-1'>
                    <p className='text-sm text-center text-gray-600 pb-2'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                    <div className='w-full border border-gray-200 rounded-md flex items-center overflow-hidden'>
                        <input
                        type="email"
                        className='outline-none bg-stone-50 w-full py-2 px-3'
                        placeholder='Email, Phone or Username'
                        name="email"
                        ref={emailInputElement}
                        />
                    </div>
                </div>
                <div className="button w-full pt-1">
                  <button className='bg-[#0084ff] hover:bg-[#007aec] transition-all ease-in-out  text-white w-full py-2 rounded-md text-sm font-medium tracking-wide'>
                    Send login link
                  </button>
                </div>
              </form>
              <button className=' mt-3 p-1 hover:underline underline-offset-2 text-blue-900'>Can't reset your password?</button>
              <div className='flex items-center w-4/5 justify-center py-4 gap-3'>
                <div className='h-[1px] w-full bg-gray-300'></div>
                <span className='font-medium text-gray-500'>OR</span>
                <div className='h-[1px] w-full bg-gray-300'></div>
              </div>
              <Link to={"/Register"}><button className=' p-1 font-medium text-gray-900 hover:text-gray-500'>Create new account</button></Link>
            
            </div>
            <div className='border-t w-full text-center bg-stone-50'>
                <Link to={"/"}><button className='py-3 font-medium hover:text-gray-600 w-full'>Back to login</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
