import React from 'react'
import Posts from '../components/Posts'
import { Link } from 'react-router-dom';
import CreatePost from '../components/CreatePost'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import { useGetPosts } from '../apiCalls/postApiCalls'
import Status from '../components/Status';
import Profile from './Profile';

export default function Home() {

  const { currentUser } = useSelector(state => state.userSlice) || null
  console.log(currentUser)
  const userId = currentUser.data._id
  const token = currentUser.token
  console.log(userId, token)


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
  const { isLoading: isPostsLoading, data: posts } = useGetPosts(token)
  console.log(posts?.data)

  const fallbackImage = '/images/avatar.jpg';

  return (
    <>
        <div className='center-content'>
            <Status/>
       
          {isPostsLoading ? <Loader /> :
              (
                <>
                  {posts.data.data.map((post) => (
                    <Posts key={post._id} post={post} />
                  ))}
                </>
              )
            } 
     
        </div>

        <div className='create-post hidden fixed inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
          <div className='absolute right-6 top-3'><CloseOutlinedIcon style={{ fontSize: 32 }} /></div>
          <CreatePost />
          <div className='cancel-post  flex items-center justify-between flex-col close-card bg-white h-52 absolute w-[360px] rounded-2xl shadow-lg'>
            <div className='flex flex-col justify-center text-center h-1/2 w-full'>
              <h3 className='text-2xl'>Discard Post?</h3>
              <h4 className='pt-1 text-gray-500'>If you leave your edits won't be saved.</h4>
            </div>
            <div className='flex flex-col w-full'>
              <button className='py-3 border-t w-full font-medium text-red-600 hover:bg-slate-100'>Discard</button>
              <button className='py-3 border-t w-full hover:bg-slate-100'>Cancel</button>
            </div>
          </div>
        </div>

        <div className=' right-side-bar pl-6 pr-6 pt-8 w-[400px] border-l h-screen border-gray-200'>
          {isUserLoading ? <Loader /> : (
            <div className='profile relative flex items-center gap-4'>
              <div className='w-14 flex items-center justify-center'>
                <div className='w-14 h-14 border border-gray-200  rounded-full'
                  style={{
                    backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
              </div>
              <div className='flex flex-col -space-y-1'>
                <p className='text-sm font-bold tracking-wide'>{userDetails.data.name}</p>
                <p className='text-lg text-[#7e7979] uppercase'>{userDetails.data.name}</p>
              </div>
              <p className='absolute right-0 text-sm font-bold tracking-wide'>Switch</p>
            </div>
          )}

          <div className='Suggestions relative flex flex-col gap-4 pt-4'>
            <div className='flex'>
              <p className='font-bold text-[#9b9696] tracking-wide'>Suggestions For You</p>
              <p className='absolute  text-gray-900 hover:text-gray-400 hover:cursor-pointer right-0 text-sm font-bold tracking-wide'>See All</p>
            </div>
            <div className='profile relative flex items-center gap-4'>
              <div className='w-10 flex items-center justify-center'>
                <div className='w-10 h-10 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
                <p className='text-xs text-[#7e7979] '>Followed by theorignals +6 more</p>
              </div>
              <p className='absolute right-0 text-blue-400 hover:text-gray-600 hover:cursor-pointer text-sm font-bold tracking-wide'>Follow</p>
            </div>
            <div className='profile relative flex items-center gap-4'>
              <div className='w-10 flex items-center justify-center'>
                <div className='w-10 h-10 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
                <p className='text-xs text-[#7e7979] '>Followed by devilish +3 more</p>
              </div>
              <p className='absolute text-blue-400 hover:text-gray-600 hover:cursor-pointer right-0 text-sm font-bold tracking-wide'>Follow</p>
            </div>
            <div className='profile relative flex items-center gap-4'>
              <div className='w-10 flex items-center justify-center'>
                <div className='w-10 h-10 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
                <p className='text-xs text-[#7e7979] '>suggested for you</p>
              </div>
              <p className='absolute  text-blue-400 hover:text-gray-600 hover:cursor-pointer right-0 text-sm font-bold tracking-wide'>Follow</p>
            </div>
          </div>

          <hr className='mt-4' />

          <div className='Contacts relative flex flex-col pt-4'>
            <div className='flex pb-4'>
              <p className='font-bold text-[#9b9696] tracking-wide'>Contacts</p>
              <p className='absolute  text-gray-900 hover:text-gray-400 hover:cursor-pointer right-0 text-sm font-bold tracking-wide'>See All</p>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
            <div className='profile relative rounded-lg px-2 py-2 flex items-center gap-4 hover:bg-gray-100'>
              <div className='w-9 relative flex items-center justify-center'>
                <div className='w-9 h-9  border border-gray-400 rounded-full'
                  style={{
                    backgroundImage: `url("/images/profile.jpg")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
                <div className='w-3 h-3 rounded-full bg-[#31a24c] absolute right-0 bottom-0 border-2 border-gray-200'></div>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-bold tracking-wide'>UserName</p>
              </div>
            </div>
          </div>


        </div>
    </>


  )
}
