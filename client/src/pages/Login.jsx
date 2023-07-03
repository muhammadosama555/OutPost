import React from 'react'

export default function login() {
  return (
    <>
      <div className=' flex items-center justify-center w-screen h-screen'>
        <div className='h-3/5 w-3/6 border border-gray-200 flex login-shadow'>
          <div className="left w-1/2">
            <div className="imgage h-full w-full"
              style={{
                backgroundImage: `url("/images/profile.jpg")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
              <div className='w-full h-full bg-gray-800 bg-opacity-20'></div>
            </div>
          </div>

          <div className="right w-1/2">
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <h2 className="logo font-medium text-4xl text-gray-700">OutPost</h2>
              <h2 className='text-2xl font-medium text-gray-700 pt-3 pb-6'>Login</h2>
              <form action="" className='space-y-4 w-4/5 px-3'>
                <div className='space-y-6'>
                  <div className='flex flex-col space-y-1'>
                    <label htmlFor="" className='font-medium text-gray-500'>Email</label>
                    <div className='w-full border-b'>
                      <input type="email" className='outline-none w-full px-1 pb-2 text-sm' placeholder='Enter email address' />
                    </div>
                  </div>
                  <div className='flex flex-col space-y-1'>
                    <label htmlFor="" className='font-medium text-gray-500'>Password</label>
                    <div className='w-full border-b'>
                      <input type="password" className='outline-none w-full px-1 pb-2 text-sm' placeholder='Password' />
                    </div>
                  </div>
                </div>
                <div className="button w-full pt-1">
                  <button className='bg-[#0084ff] hover:bg-[#007aec] transition-all ease-in-out  text-white w-full py-3 rounded-md text-sm font-medium tracking-wide'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
