import React from 'react'
import Posts from '../components/Posts'
import { Link } from 'react-router-dom';
import CreatePost from '../components/CreatePost'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Profile from './Profile';
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import { useGetPosts } from '../apiCalls/postApiCalls'

export default function Home() {

  const { currentUser } = useSelector(state => state.userSlice) || null
  console.log(currentUser)
  const userId = currentUser.data._id
  const token = currentUser.token


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
  const { isLoading: isPostsLoading, data: posts } = useGetPosts(token)
  console.log(userDetails?.data)

  const fallbackImage = '/images/avatar.jpg';

  return (
    <>

      <div className='flex justify-between pt-14 '>


        <div className='left-side-bar pl-4 pt-8 w-[340px]  border-r border-gray-200'>
          {isUserLoading ? <Loader /> :
            (
              <div className='profile flex items-center gap-4'>
                <div className='w-12 flex items-center justify-center'>
                  <div className='w-10 h-10 border border-gray-200  rounded-full'
                    style={{
                      backgroundImage: `url("${userDetails.data.data.profile.picture}"), url("${fallbackImage}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                    }}>
                  </div>
                  <p className='tracking-wide w-full'>Search</p>
                </div>
                <p className='tracking-wide'>{userDetails.data.data.name}</p>
              </div>
            )
          }
          <div className='search flex items-center pt-2 gap-4'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <svg aria-label="Search" className="w-6 h-6 text-gray-600" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16.511" x2={22} y1="16.511" y2={22} /></svg>


            </div>
            <p className='tracking-wide w-full'>Explore</p>
          </div>
          <div className='Reels flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-4 px-3 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <svg aria-label="Reels" className="h-6 w-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2} x1="2.049" x2="21.95" y1="7.002" y2="7.002" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="13.504" x2="16.362" y1="2.001" y2="7.002" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="7.207" x2="10.002" y1="2.11" y2="7.002" /><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd" /></svg>
            </div>
            <p className='tracking-wide w-full'>Reels</p>
          </div>
          <div className='Messages flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-4 px-3 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <svg aria-label="Messenger" className="w-6 h-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth="1.739" /><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd" /></svg>
            </div>
            <p className='tracking-wide w-full'>Messages</p>
          </div>
          <div className='Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-4 px-3 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <svg aria-label="New post" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="6.545" x2="17.455" y1="12.001" y2="12.001" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12.003" x2="12.003" y1="6.545" y2="17.455" /></svg>
            </div>
            <p className='tracking-wide w-full'>Create</p>
          </div>
          <div className='Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-4 px-3 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <svg aria-label="Saved" className="w-6 h-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={18} role="img" viewBox="0 0 24 24" width={18}><title>Saved</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
            </div>
            <p className='tracking-wide w-full'>Save</p>
          </div>
        </div>


        <div className='center-content'>
          <div className='status h-24 mt-8'>
            <div className='flex gap-2'>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
              <div className="card flex flex-col items-center gap-1">
                <div className="outer-octagon">
                  <div className="inner-octagon">
                    <div className='inner-2-octagon'
                      style={{
                        backgroundImage: `url("/images/profile.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>
                    </div>
                  </div>
                </div>
                <p className='Name text-xs'>abcz</p>
              </div>
            </div>
          </div>

          <Posts />
          <Posts />


        </div>

        <div className='hidden fixed inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
          <div className='absolute right-6 top-3'><CloseOutlinedIcon style={{ fontSize: 32 }} /></div>
          <CreatePost />
          <div className='cancel-post hidden flex items-center justify-between flex-col close-card bg-white h-52 absolute w-1/5 rounded-2xl shadow-lg'>
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

        <div className=' right-side-bar pl-6 pr-6 pt-8 w-[380px] border-l h-full border-gray-200'>
          <div className='profile relative flex items-center gap-4'>
            <div className='w-14 flex items-center justify-center'>
              <div className='w-14 h-14 border border-gray-200  rounded-full'
                style={{
                  backgroundImage: `url("/images/profile.jpg")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}>
              </div>
            </div>
            <div className='flex flex-col -space-y-1'>
              <p className='text-sm font-bold tracking-wide'>UserName</p>
              <p className='text-lg text-[#7e7979] uppercase'>UserName</p>
            </div>
            <p className='absolute right-0 text-blue-400 hover:text-gray-600 hover:cursor-pointer text-sm font-bold tracking-wide'>Switch</p>
          </div>
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

        <div className='fixed hidden inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
          <CreatePost />
        </div>

        <div className=' right-side-bar pl-6 pr-6 pt-8 w-[380px] border-l h-full border-gray-200'>
          {isUserLoading ? <Loader /> : (
            <div className='profile relative flex items-center gap-4'>
              <div className='w-14 flex items-center justify-center'>
                <div className='w-14 h-14 border border-gray-200  rounded-full'
                  style={{
                    backgroundImage: `url("${userDetails.data.data.profile.picture}"), url("${fallbackImage}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}>
                </div>
              </div>
              <div className='flex flex-col -space-y-1'>
                <p className='text-sm font-bold tracking-wide'>{userDetails.data.data.name}</p>
                <p className='text-lg text-[#7e7979] uppercase'>{userDetails.data.data.name}</p>
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

      </div>
    </>


  )
}
