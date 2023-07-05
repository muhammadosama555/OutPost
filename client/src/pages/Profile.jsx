import React from 'react'
import { Edit, Apps, BookmarkBorder, AccountBoxOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'

export default function Profile() {

     const { currentUser } = useSelector(state => state.userSlice) || null
     console.log(currentUser)
     const userId = currentUser.data._id
     const token = currentUser.token


     const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
     console.log(userDetails?.data)

     return (
          <>
               <div className='pt-14 mx-72'>
                    <div className='flex flex-col relative justify-center items-center '>
                         <div className='cover relative border rounded-b-lg  h-[430px] w-full border-gray-400'>
                              <div className="profile absolute mx-auto right-0 left-0 -bottom-28 z-30 h-44 w-44 -mt-12 border border-black rounded-full">

                              </div>
                         </div>
                    </div>
                    <div className='flex  justify-between pt-10 mx-16 pb-10  border-b border-gray-300'>
                         <div className="left">
                              <div className='flex gap-5'>
                                   <h2 className='font-medium text-xl tracking-wide'>UserName</h2>
                                   <Link>
                                        <div className='px-4 py-[6px] flex items-center gap-1 bg-gray-200 font-medium text-sm rounded-lg hover:bg-gray-300'>
                                             <Edit style={{ fontSize: 16 }} />
                                             Edit profile
                                        </div>
                                   </Link>
                              </div>

                              <div className='flex gap-3 pt-3'>
                                   <span className='font-medium'>58</span>
                                   <h3 className='font-normal'>followers</h3>
                              </div>
                              <div className='flex gap-3 '>
                                   <span className='font-medium'>58</span>
                                   <h3 className='font-normal'>following</h3>
                              </div>
                         </div>
                         <div className="right w-1/3 pl-8">
                              <div>
                                   <h3 className='font-medium text-lg pb-1'>Intro</h3>
                                   <h4 className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, saepe.</h4>
                              </div>
                         </div>
                    </div>

                    <div className='buttons flex justify-center gap-8'>
                         <div className="posts">
                              <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                   <Apps style={{ fontSize: 16 }} />
                                   POSTS
                              </div>
                         </div>
                         <div className="posts">
                              <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                   <BookmarkBorder style={{ fontSize: 16 }} />
                                   SAVED
                              </div>
                         </div>
                         <div className="posts">
                              <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                   <AccountBoxOutlined style={{ fontSize: 16 }} />
                                   POSTS
                              </div>
                         </div>

                    </div>
               </div>
          </>
     )
}
