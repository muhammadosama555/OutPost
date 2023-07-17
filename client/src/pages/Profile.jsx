import React from 'react'
import { Edit, Apps, BookmarkBorder, AccountBoxOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';


export default function Profile() {

     const { currentUser } = useSelector(state => state.userSlice) || null
     console.log(currentUser)
     const userId = currentUser.data._id
     const token = currentUser.token


     const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
     console.log(userDetails?.data)

     const fallbackImage = '/images/avatar.jpg';

     return (
          <>
               {isUserLoading ? <Loader /> : (
                    <>
                    <div className='flex justify-center h-screen w-[80%]'>
                         <div className='w-full mx-44'>
                              <div className='flex flex-col relative justify-center items-center'>
                                   <div className='cover relative border rounded-b-lg bg-cover bg-center bg-no-repeat h-[430px] w-full border-gray-200'
                                        style={{ backgroundImage: `url("/images/gb1.jpg")` }}>
                                        <div className="profile absolute bg-cover bg-center bg-no-repeat mx-auto right-0 left-0 -bottom-36 z-10 h-56 w-56 border border-gray-50 rounded-full"
                                             style={{  backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")` }}>

                                        </div>
                                   </div>
                              </div>
                              <div className='flex  justify-between pt-10 pb-10  border-b border-gray-300'>
                                   <div className="left pl-20">
                                        <div className='flex flex-col gap-4'>
                                             <div>
                                                  <h2 className='font-medium text-xl tracking-wide'>{userDetails.data.data.username}</h2>
                                             </div>
                                             <div className='flex items-center gap-4'>
                                                  <button className='px-5 py-[6px] flex items-center gap-1 bg-gray-200 font-medium text-sm rounded-lg hover:bg-gray-300'>
                                                       Edit profile
                                                  </button>
                                                  <div>
                                                       <svg
                                                            aria-label="Options"
                                                            className="x1lliihq x1n2onr6"
                                                            color="rgb(0, 0, 0)"
                                                            fill="rgb(0, 0, 0)"
                                                            height="24"
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width="24"
                                                       >
                                                            <title>Options</title>
                                                            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                                                            <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                                                       </svg>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className='flex gap-3 pt-3'>
                                             <span className='font-medium'>{userDetails.data.data.followers.length}</span>
                                             <h3 className='font-normal'>followers</h3>
                                        </div>
                                        <div className='flex gap-3 '>
                                             <span className='font-medium'>{userDetails.data.data.following.length}</span>
                                             <h3 className='font-normal'>following</h3>
                                        </div>
                                   </div>
                                   {userDetails.data.data.profile ? 
                                   <div className="right w-1/3 pl-8">
                                        <div>
                                             <h3 className='font-medium text-lg pb-1'>Intro</h3>
                                             <h4 className='text-sm'>{userDetails.data.data.profile?.bio}</h4>
                                        </div>
                                   </div>: null
                              }
                              </div>

                              <div className='buttons flex justify-center gap-8'>
                                   <div className="posts">
                                        <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                             <Apps style={{ fontSize: 16 }} />
                                             POSTS
                                        </div>
                                   </div>
                                   <div className="saved">
                                        <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                             <BookmarkBorder style={{ fontSize: 16 }} />
                                             SAVED
                                        </div>
                                   </div>
                                   <div className="tagged">
                                        <div className=' pt-3 flex items-center gap-1 text-gray-500 font-medium text-sm border-t border-white  hover:border-t hover:border-t-black hover:text-black hover:cursor-pointer'>
                                             <AccountBoxOutlined style={{ fontSize: 16 }} />
                                             TAGGED
                                        </div>
                                   </div>
                              </div>

                              <div className='py-20'>
        {Array.from({ length: Math.ceil(userDetails.data.data?.posts.length / 3) }, (_, index) => (
            <div className={`flex items-stretch box-border flex-row flex-shrink-0 ${index < Math.ceil(userDetails.data.data?.posts.length / 3) - 1 && 'mb-2'}`} key={index}>
                {userDetails.data.data?.posts.slice(index * 3, (index + 1) * 3).map((post) => (
                    <div className='post-box mr-[6px] cursor-pointer h-96 w-[32%] rounded-[5px] bg-cover bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${post.imageUrl})` }}
                        key={post._id}>
                    </div>
                ))}
            </div>
        ))}
    </div>
                         </div>
                    </div>
                    <div className='fixed hidden inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
                              <div className='settings  flex items-center justify-between flex-col close-card bg-white absolute w-[360px] rounded-2xl shadow-lg overflow-hidden'>
                                   <div className='flex flex-col w-full'>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Apps and Websites</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>QR Code</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Notifications</button>
                                        <Link to="/settings"><button className='py-3 border-t w-full hover:bg-slate-100'>Settings and Privacy</button></Link>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Supervision</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Logout</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Cancel</button>
                                   </div>
                              </div>
                         </div>
                    </>
               )}
              
          </>
     )
}