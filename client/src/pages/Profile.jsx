import React, { useEffect, useRef, useState } from 'react'
import { Edit, Apps, BookmarkBorder, AccountBoxOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dialog from '@material-ui/core/Dialog';
import { useGetPostDetails, useLikePost } from '../apiCalls/postApiCalls'
import moment from 'moment';
import { useCreateComment } from '../apiCalls/commentApiCalls'
import useOutsideClick from "../hooks/useOutsideClick";

export default function Profile({ }) {


     const [openPostDetails, setOpenPostDetails] = useState(false);
     const [postId, setPostId] = useState(null);
     const [openSettings, setOpenSettings] = useState(false);
     const [openFollowers, setOpenFollowers] = useState(false);
     const textInputElement = useRef();
     const settingRef = useRef();


     const { currentUser } = useSelector(state => state.userSlice) || null
     const userId = currentUser.data._id
     const token = currentUser.token


     const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
     const { isLoading: isPostLoading, data: postDetails } = useGetPostDetails(postId, token)
     const {
          mutate: createCommentMutate,
          isError: isCreateCommentError,
          error: createCommentError,
          isSuccess: createCommentIsSuccess,
     } = useCreateComment();
     const {
          mutate: likePostMutate,
     } = useLikePost();


     const isCurrentUserLiked = () => {
          return postDetails?.data.data.likes.some((like) => like._id === currentUser.data._id);
     };

     const handleSubmit = (event) => {
          event.preventDefault();
          const data = {
               token: token,
               text: textInputElement.current?.value,
               postId: postId
          };
          createCommentMutate(data);

     };


     const likeSubmitHandler = (event) => {
          event.preventDefault();
          const data = {
               token: token,
               postId: postId
          };
          likePostMutate(data);

     };

     useEffect(() => {
          if (createCommentIsSuccess) {
               textInputElement.current.value = "";
          }
     }, [createCommentIsSuccess]);

     console.log(postDetails?.data)



     const openPostDetailsHandler = (id) => {
          setOpenPostDetails(true);
          setPostId(id)
     };

     const closePostDetailsHandler = () => {
          setOpenPostDetails(false);
     };

     const openSettingsHandler = () => {
          setOpenSettings(true);
     };
     const closeSettingsHandler = () => {
          setOpenSettings(false);
     };

     const openFollowersHandler = () => {
          setOpenFollowers(true);
     };
     const closeFollowersHandler = () => {
          setOpenFollowers(false);
     };








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
                                                  style={{ backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")` }}>

                                             </div>
                                        </div>
                                   </div>
                                   <div className='flex  justify-between pt-10 pb-10  border-b border-gray-300'>
                                        <div className="left pl-20">
                                             <div className='flex flex-col gap-4'>
                                                  <div>
                                                       <h2 className='font-medium text-xl tracking-wide'>{userDetails.data.data.username}</h2>
                                                  </div>
                                                  <div className='flex items-center gap-2'>
                                                       <Link to="/settings/editProfile">
                                                            <button className='px-5 py-[6px] flex items-center gap-1 bg-gray-200 font-medium text-sm rounded-lg hover:bg-gray-300'>
                                                                 Edit profile
                                                            </button>
                                                       </Link>
                                                       <div className='cursor-pointer px-1' onClick={openSettingsHandler}>
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
                                             <div className='flex gap-3 cursor-pointer pt-3' onClick={openFollowersHandler}>
                                                  <span className='font-medium'>{userDetails.data.data.followers.length}</span>
                                                  <h3 className='font-normal'>followers</h3>
                                             </div>
                                             <div className='flex gap-3 '>
                                                  <span className='font-medium'>{userDetails.data.data.following.length}</span>
                                                  <h3 className='font-normal'>following</h3>
                                             </div>
                                        </div>
                                        {userDetails.data.data.profile?.bio ?
                                             <div className="right w-1/3 pl-8">
                                                  <div>
                                                       <h3 className='font-medium text-lg pb-1'>Intro</h3>
                                                       <h4 className='text-sm'>{userDetails.data.data.profile?.bio}</h4>
                                                  </div>
                                             </div> : null
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
                                                       <div onClick={() => openPostDetailsHandler(post._id)} className='post-box mr-[6px] cursor-pointer h-96 w-[32%] rounded-[5px] bg-cover bg-center bg-no-repeat'
                                                            style={{ backgroundImage: `url(${post.imageUrl})` }}
                                                            key={post._id}>
                                                       </div>
                                                  ))}
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>


                         <Dialog open={openSettings} onClose={closeSettingsHandler} PaperProps={{ style: { borderRadius: '14px', maxWidth: '100vw', maxHeight: '100vh' }, }}>
                              <div className='modal-container'>
                                   <div className='modal-content follwers flex items-center justify-between flex-col close-card bg-white w-[360px] rounded-2xl shadow-lg overflow-hidden'>

                                        <button className='py-3 w-full hover:bg-slate-100'>Apps and Websites</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>QR Code</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Notifications</button>
                                        <Link className='w-full' to="/settings"><button className='py-3 border-t w-full hover:bg-slate-100'>Settings and Privacy</button></Link>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Supervision</button>
                                        <button className='py-3 border-t w-full hover:bg-slate-100'>Logout</button>
                                        <button onClick={closeSettingsHandler} className='py-3 border-t w-full hover:bg-slate-100'>Cancel</button>
                                   </div>
                              </div>
                         </Dialog>

                         <Dialog open={openFollowers} onClose={closeFollowersHandler} PaperProps={{ style: { borderRadius: '14px', maxWidth: '100vw', maxHeight: '100vh', }, }}>
                              <div className='modal-container relative h-[440px]  w-[400px]'>
                                   <div className='modal-content follwers flex items-center justify-between flex-col close-card bg-white'>
                                        <div className="header w-full bg-white rounded-t-[14px] flex justify-between items-center py-3 px-2 border-b">
                                             <div>
                                             </div>
                                             <div className="title flex items-center">
                                                  <h1 className='font-bold'>Followers</h1>
                                             </div>
                                             <div onClick={closeFollowersHandler} className='cursor-pointer'>
                                                  <svg aria-label="Close" className="" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"
                                                  >
                                                       <title>Close</title>
                                                       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                                                  </svg>
                                             </div>
                                        </div>
                                        <div className="body w-[400px]">
                                             <div className='bg-white py-2 px-5'>
                                                  <div className="searchbar flex items-center bg-gray-200 rounded-md">
                                                       <input
                                                            className="pl-4 pr-7 py-1 text-sm bg-gray-200 border w-full h-full rounded-md outline-none"
                                                            type="text"
                                                            placeholder="Search"
                                                       // value={search}
                                                       // onChange={handleSearchChange}
                                                       />
                                                       <div className="w-4 h-4 mr-2 rounded-full bg-[#b8b6b6] flex items-center justify-center cursor-pointer">
                                                            {" "}
                                                            <CloseOutlinedIcon style={{ fontSize: 12 }} />
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className='followers-wrapper max-height: calc(100vh - 350px); overflow-y-auto  px-5'>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                                  <div className='card py-2 flex bg-stone-100 items-center justify-between gap-2'>
                                                       <div className='flex items-center gap-3'>
                                                            <div className='img w-10 h-10 bg-gray-300 rounded-full '
                                                                 style={{
                                                                      // backgroundImage: ` url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>

                                                            </div>
                                                            <div className='flex -space-y-1 flex-col'>
                                                                 <div className='flex gap-1'>
                                                                      <h2 className='text-sm font-bold cursor-pointer'>UserName</h2><span className='text-sm'>•</span><span className='text-sm font-medium text-blue-500 hover:cursor-pointer hover:text-blue-900'>Follow</span>
                                                                 </div>
                                                                 <div className='flex gap-1 text-sm text-gray-500'>
                                                                      <div className='status'>
                                                                           <h2>UserName</h2>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <button className='px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-md text-sm font-medium'>Remove</button>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </Dialog>


                    </>
               )
               }

               <Dialog open={openPostDetails} onClose={closePostDetailsHandler} PaperProps={{ style: { borderRadius: '14px', maxWidth: '100vw', maxHeight: '100vh' }, }}>
                    {isPostLoading ? <Loader /> :
                         <div className="flex w-[65vw] h-[85vh] relative">
                              <div className='left h-[100%] w-[65%]'>
                                   <div className='h-full'
                                        style={{
                                             backgroundImage: `url("${postDetails?.data.data.imageUrl}")`,
                                             backgroundPosition: 'center',
                                             backgroundSize: 'cover',
                                             backgroundRepeat: 'no-repeat',
                                        }}>

                                   </div>
                              </div>
                              <div className='right w-[35%]'>
                                   <div className="header flex items-center justify-between py-3 px-4 border-b">
                                        <div className='flex items-center gap-3'>
                                             <div className="img w-8 h-8 bg-gray-400 rounded-full"
                                                  style={{
                                                       backgroundImage: `url("${postDetails?.data.data.owner?.profile?.picture}"), url("${fallbackImage}")`,
                                                       backgroundPosition: 'center',
                                                       backgroundSize: 'cover',
                                                       backgroundRepeat: 'no-repeat',
                                                  }}>
                                             </div>
                                             <div className='flex items-center gap-1'>
                                                  <div>
                                                       <h1 className='font-medium text-black hover:text-gray-400 cursor-pointer text-sm'>{postDetails?.data.data.owner?.username}</h1>
                                                  </div>
                                                  <div>
                                                       <span>•</span>
                                                       <span className='text-sm text-blue-400 cursor-pointer hover:text-blue-800 font-medium pl-1'>Follow</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="more cursor-pointer flex gap-1">
                                             <svg
                                                  className='svg-icon'
                                                  aria-label="More options"
                                                  color="rgb(0, 0, 0)"
                                                  fill="rgb(0, 0, 0)"
                                                  height={24}
                                                  role="img"
                                                  viewBox="0 0 24 24"
                                                  width={24}
                                             >
                                                  <circle cx={12} cy={12} r="1.5" />
                                                  <circle cx={6} cy={12} r="1.5" />
                                                  <circle cx={18} cy={12} r="1.5" />
                                             </svg>
                                        </div>
                                   </div>

                                   <div className='comment-section space-y-3 pt-3 pb-4 overflow-y-auto scrollbar-none' style={{ maxHeight: 'calc(80vh - 156px)', scrollbarWidth: 'thin', scrollbarColor: 'transparent transparent' }}>
                                        <div className='post-desc flex gap-3 mx-4'>
                                             <div className="img flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full"
                                                  style={{
                                                       backgroundImage: `url("${postDetails?.data.data.owner?.profile?.picture}"), url("${fallbackImage}")`,
                                                       backgroundPosition: 'center',
                                                       backgroundSize: 'cover',
                                                       backgroundRepeat: 'no-repeat',
                                                  }}>
                                             </div>
                                             <div className="comment flex flex-col pt-1">
                                                  <span className='font-medium text-black hover:text-gray-400 cursor-pointer text-sm'>{postDetails?.data.data.owner?.username}</span>
                                                  <span className='text-sm'>{postDetails?.data.data.content}</span>
                                                  <div className="time pt-[2px]">
                                                       <h1 className='text-xs text-gray-500'>{moment(postDetails?.data.data.createdAt).fromNow()}</h1>
                                                  </div>
                                             </div>

                                        </div>



                                        {postDetails?.data.data?.comments ?
                                             <>
                                                  {postDetails?.data.data?.comments.slice().reverse().map((comment) => (
                                                       <div className='comment flex mx-4'>
                                                            <div className="img flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full"
                                                                 style={{
                                                                      backgroundImage: `url("${comment.owner.profile?.picture}"), url("${fallbackImage}")`,
                                                                      backgroundPosition: 'center',
                                                                      backgroundSize: 'cover',
                                                                      backgroundRepeat: 'no-repeat',
                                                                 }}>
                                                            </div>
                                                            <div className="content flex flex-col pt-1 pl-3">
                                                                 <div className='leading-5'>
                                                                      <span className='font-medium text-black hover:text-gray-400 cursor-pointer text-sm'>{comment.owner.username}</span>
                                                                      <span className='text-sm pl-2 tracking-tight'>{comment.text}</span>
                                                                 </div>
                                                                 <div className="time flex gap-3 pt-1">
                                                                      <h1 className='text-xs text-gray-500'>{moment(comment.createdAt).fromNow()}</h1>
                                                                      <button className='text-xs font-medium text-gray-500'>Reply</button>
                                                                 </div>
                                                            </div>
                                                            <div className='mt-2 comment-like h-full p-1'>
                                                                 <svg aria-label="Like" class="" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                                            </div>

                                                       </div>
                                                  ))}
                                             </> : null}

                                   </div>


                                   <div className="footer bg-white absolute bottom-0 w-[35%] border-t pt-2">
                                        <div className="actions pl-4 pr-3  flex justify-between items-center">
                                             <div className="flex items-center">
                                                  <div onClick={likeSubmitHandler} className="like cursor-pointer py-1">
                                                       <svg
                                                            aria-label="Like"
                                                            className="svg-icon mr-3"
                                                            color={isCurrentUserLiked() ? "rgb(255, 0, 0)" : "rgb(38, 38, 38)"}
                                                            fill={isCurrentUserLiked() ? "rgb(255, 0, 0)" : "rgb(38, 38, 38)"}
                                                            height={24}
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width={24}
                                                       >
                                                            <title>Like</title>
                                                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                                       </svg>
                                                  </div>
                                                  <div className="comment cursor-pointer py-1">
                                                       <svg
                                                            aria-label="Comment"
                                                            className="svg-icon mr-2"
                                                            color="rgb(0, 0, 0)"
                                                            fill="rgb(0, 0, 0)"
                                                            height={24}
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width={24}
                                                       >
                                                            <title>Comment</title>
                                                            <path
                                                                 d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                            />
                                                       </svg>
                                                  </div>
                                                  <div className="share cursor-pointer py-1">
                                                       <svg
                                                            aria-label="Share Post"
                                                            className="mr-2 "
                                                            color="rgb(0, 0, 0)"
                                                            fill="rgb(0, 0, 0)"
                                                            height={24}
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width={24}
                                                       >
                                                            <title>Share Post</title>
                                                            <line
                                                                 fill="none"
                                                                 stroke="currentColor"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                                 x1={22}
                                                                 x2="9.218"
                                                                 y1={3}
                                                                 y2="10.083"
                                                            />
                                                            <polygon
                                                                 fill="none"
                                                                 points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                                                 stroke="currentColor"
                                                                 strokeLinejoin="round"
                                                                 strokeWidth={2}
                                                            />
                                                       </svg>
                                                  </div>
                                             </div>
                                             <div className="save cursor-pointer py-1 p-1">
                                                  <svg
                                                       aria-label="Save"
                                                       className="x1lliihq x1n2onr6"
                                                       color="rgb(0, 0, 0)"
                                                       fill="rgb(0, 0, 0)"
                                                       height={24}
                                                       role="img"
                                                       viewBox="0 0 24 24"
                                                       width={24}
                                                  >
                                                       <title>Save</title>
                                                       <polygon
                                                            fill="none"
                                                            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                       />
                                                  </svg>
                                             </div>
                                        </div>
                                        <div className='flex flex-col py-2 -space-y-2'>
                                             <div className='px-4'>
                                                  <h1 className='font-medium cursor-pointer inline-block'>{postDetails?.data.data.likes.length} likes</h1>
                                             </div>
                                             <div className='px-4'>
                                                  <p className='font-light text-xs text-gray-500 cursor-pointer inline-block '>1 DAY AGO</p>
                                             </div>
                                        </div>

                                        <form action="">
                                             <div className="border-t flex items-center px-4 py-3">
                                                  <div className="w-6 h-6 mr-1 cursor-pointer">
                                                       <svg
                                                            aria-label="Emoji"
                                                            className="w-full h-full"
                                                            color="rgb(115, 115, 115)"
                                                            fill="rgb(115, 115, 115)"
                                                            role="img"
                                                            viewBox="0 0 24 24"
                                                            width={32}
                                                       >
                                                            <title>Emoji</title>
                                                            <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z" />
                                                       </svg>
                                                  </div>
                                                  <input
                                                       className="text-sm h-5 outline-none bg-transparent flex-grow mx-2"
                                                       aria-label="Add a comment..."
                                                       placeholder="Add a comment..."
                                                       name="text"
                                                       ref={textInputElement}
                                                  />

                                                  <button onClick={handleSubmit} className="text-blue-400 hover:text-blue-800 font-medium">Post</button>
                                                  {isCreateCommentError && (
                                                       <div className='text-sm font-medium text-red-600 pt-2'>
                                                            <p>{createCommentError.response.data.error}</p>
                                                       </div>
                                                  )}
                                             </div>
                                        </form>



                                   </div>
                              </div>


                         </div>}
               </Dialog >
          </>
     )
}