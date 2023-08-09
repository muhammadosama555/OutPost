import React from 'react'
import { Edit, Apps, BookmarkBorder, AccountBoxOutlined } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';

export default function UserDetails() {

    const { currentUser } = useSelector(state => state.userSlice) || null
    console.log(currentUser)
    const token = currentUser.token
    const { userId } = useParams()


    const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
    console.log(userDetails?.data)

    const fallbackImage = '/images/avatar.jpg';

    return (
        <>
            {isUserLoading ? <Loader /> : (
                <div className='flex justify-center h-screen w-[80%]'>
                    <div className='w-full mx-44'>
                        <div className='flex flex-col relative justify-center items-center'>
                            <div className='cover relative border rounded-b-lg bg-cover bg-center bg-no-repeat h-[430px] w-full border-gray-200'
                                style={{ backgroundImage: `url("/images/gb1.jpg")` }}
                            >
                                <div className="profile absolute bg-cover bg-center bg-no-repeat mx-auto right-0 left-0 -bottom-36 z-10 h-56 w-56 border border-gray-50 rounded-full"
                                   style={{  backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")` }}
                                >

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
                                        <button className='px-4 py-[6px] flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm rounded-lg'>
                                            Follow
                                        </button>
                                        <button className='pl-4 pr-2 py-[6px] flex items-center gap-1 bg-gray-200 hover:bg-gray-300 font-medium text-sm rounded-lg'>
                                            Following
                                            <ExpandMoreOutlinedIcon style={{ fontSize: 20 }} />
                                        </button>
                                        <button className='px-4 py-[6px] flex items-center gap-1 bg-gray-200 hover:bg-gray-300 font-medium text-sm rounded-lg '>
                                            Message
                                        </button>
                                        <div className=" cursor-pointer">
                                            <svg
                                                className=''
                                                aria-label="More options"
                                                color="rgb(0, 0, 0)"
                                                fill="rgb(0, 0, 0)"
                                                height={24}
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width={28}
                                            >
                                                <circle cx={14} cy={12} r="2" />
                                                <circle cx={6} cy={12} r="2" />
                                                <circle cx={22} cy={12} r="2" />
                                            </svg>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex gap-3 pt-3'>
                                        <span className='font-medium'>{userDetails.data.data?.posts.length}</span>
                                        <h3 className='font-normal'>Posts</h3>
                                    </div>
                                    <div className='flex gap-3'>
                                        <span className='font-medium'>{userDetails.data.data.followers.length}</span>
                                        <h3 className='font-normal'>followers</h3>
                                    </div>
                                    <div className='flex gap-3 '>
                                        <span className='font-medium'>{userDetails.data.data.following.length}</span>
                                        <h3 className='font-normal'>following</h3>
                                    </div>
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

            )}
            <div className='fixed hidden inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
                <div className='more-options hidden flex items-center justify-between flex-col close-card bg-white absolute w-[360px] rounded-2xl shadow-lg overflow-hidden'>
                    <div className='flex flex-col w-full'>
                        <button className='py-3 w-full font-medium text-red-600 hover:bg-slate-100'>Block</button>
                        <button className='py-3 border-t w-full font-medium text-red-600 hover:bg-slate-100'>Restrict</button>
                        <button className='py-3 border-t w-full font-medium text-red-600 hover:bg-slate-100'>Report</button>
                        <button className='py-3 border-t w-full hover:bg-slate-100'>About this account</button>
                        <button className='py-3 border-t w-full hover:bg-slate-100'>Cancel</button>
                    </div>
                </div>
                <div className='following-options hidden flex items-center justify-between flex-col close-card bg-white absolute w-[370px] rounded-xl shadow-lg overflow-hidden'>
                    <div className='absolute right-2 top-2 cursor-pointer'><CloseOutlinedIcon style={{ fontSize: 24 }} /></div>
                    <div className='flex flex-col gap-1 items-center py-4 border-b border-gray-300 w-full'>
                        <div className="img w-16 h-16 bg-gray-300 rounded-full"></div>
                        <div className="username font-medium">Username</div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Add to close friends list <span className='flex items-center justify-center p-[2px] mr-3 rounded-full border border-black'><StarOutlinedIcon style={{ fontSize: 16, }} /></span></button>
                        <button className='flex hidden justify-between pl-5  w-full hover:bg-slate-100'>Close friend <span className='flex items-center justify-center p-[2px] mr-3 rounded-full border border-green-400 bg-green-400'><StarOutlinedIcon style={{ fontSize: 16, fill: 'white' }} /></span></button>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Add to favourites <span className='mr-[11px]'><StarOutlineOutlinedIcon style={{}} /></span></button>
                        <button className='flex hidden justify-between pl-5 py-3 w-full hover:bg-slate-100'>Remove from favourites <span className='mr-3'><StarOutlinedIcon style={{ fill: 'orange' }} /></span></button>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Mute <span className='mr-3'><ChevronRightOutlinedIcon style={{ fill: 'gray' }} /></span></button>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Restrict <span className='mr-3'><ChevronRightOutlinedIcon style={{ fill: 'gray' }} /></span></button>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Unfollow</button>
                    </div>
                </div>

                <div className='mute-options hidden flex items-center justify-between flex-col close-card bg-white absolute w-[370px] rounded-xl shadow-lg overflow-hidden'>
                    <div className='flex items-center justify-between px-2 w-full py-2 border-b border-gray-300'>
                        <div><ChevronLeftOutlinedIcon style={{ fontSize: 28 }} /></div>
                        <h2 className='font-medium'>Mute</h2>
                        <div className=' cursor-pointer'><CloseOutlinedIcon style={{ fontSize: 24 }} /></div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Posts
                            <span className='flex items-center justify-center mr-3 rounded-full border-2 w-6 h-6 border-gray-300'>
                                <svg aria-label="Checkmark filled icon" className="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Checkmark filled icon</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
                                </svg>
                            </span>
                        </button>
                        <button className='flex justify-between pl-5 py-3 w-full hover:bg-slate-100'>Posts
                            <span className='flex items-center justify-center mr-3 rounded-full border-2 w-6 h-6 border-gray-300'>
                                <svg aria-label="Checkmark filled icon" className="x1lliihq x1n2onr6" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Checkmark filled icon</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
                                </svg>
                            </span>
                        </button>
                        <p className='text-xs py-3 border-b border-gray-200 text-center'>Instagram won't let them know you muted them.</p>
                        <div className='px-3 py-2'>
                            <button className='text-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white pl-5 py-2 w-full'>Save</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
