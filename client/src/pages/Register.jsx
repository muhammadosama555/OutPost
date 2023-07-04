import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
export default function login() {
  return (
    <>
      <div className=' flex flex-col gap-3 items-center justify-center w-screen h-screen'>
        <div className='w-[400px] py-14 px-8 border border-gray-200 flex login-shadow'>
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <h2 className="logo font-medium text-4xl text-gray-700">OutPost</h2>
              <h2 className='text-xl tracking-wide font-medium text-gray-700 pt-3 pb-4 text-center'>Register to see photos and videos from your friends.</h2>
              <div className="button w-full pt-1 px-2 pb-4">
                  <button className='bg-[#0084ff] hover:bg-[#007aec] flex justify-center items-center gap-2 transition-all ease-in-out  text-white w-full py-2 rounded-md text-base font-medium tracking-wide'>
                    <FacebookIcon/>
                    <span>Log in with Facebook</span>
                  </button>
              </div>
              <div className='flex justify-center items-center w-full px-2 pb-4'>
                <div className='w-full h-[1px] bg-gray-300'></div>
                    <h2 className='px-5 text-gray-500 font-medium'>OR</h2>
                <div className='w-full h-[1px] bg-gray-300'></div>
              </div>
              <form action="" className='space-y-4 px-2'>
                <div className='space-y-2'>
                  <div className='w-full py-2 px-2 border border-gray-200 rounded-md'>
                    <input type="text" className='outline-none w-full text-sm' placeholder='Mobile Number or Email'/>
                  </div>
                  <div className='w-full py-2 px-2 border border-gray-200 rounded-md'>
                    <input type="text" className='outline-none w-full text-sm' placeholder='Full Name'/>
                  </div>
                  <div className='w-full py-2 px-2 border border-gray-200 rounded-md'>
                    <input type="text" className='outline-none w-full text-sm' placeholder='Username'/>
                  </div>
                  <div className='w-full py-2 px-2 border border-gray-200 rounded-md'>
                    <input type="password" className='outline-none w-full text-sm' placeholder='Password'/>
                  </div>
                </div>
                <p className='text-xs text-center w-full tracking-wide px-2'>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                <p className='text-xs text-center w-full tracking-wide px-2'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                <div className="button w-full pt-1">
                  <button className='bg-[#0084ff] hover:bg-[#007aec] transition-all ease-in-out  text-white w-full py-2 rounded-md text-sm font-medium tracking-wide'>Sign up</button>
                </div>
              </form>
            </div>
        </div>
        <div className='w-[400px] py-8 px-8 border border-gray-200 flex justify-center login-shadow'>
            <h2>Have an account? <span className='text-blue-400 hover:to-blue-500 hover:cursor-pointer'>Log in</span></h2>
        </div>
      </div>
    </>
  )
}
