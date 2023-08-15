import React, { useEffect, useRef, useState } from 'react'
import Posts from '../components/Posts'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux'
import { useGetUserDetails } from '../apiCalls/userApiCalls'
import Loader from '../components/Loader'
import { useGetPostDetails, useGetPosts, useLikePost } from '../apiCalls/postApiCalls'
import Status from '../components/Status';
import Profile from './Profile';
import Dialog from '@material-ui/core/Dialog';
import "../App.css";
import { useCreateComment } from '../apiCalls/commentApiCalls';
import moment from 'moment';

export default function Home() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postId, setPostId] = useState(null);
  const { currentUser } = useSelector(state => state.userSlice) || null
  const textInputElement = useRef();

  const userId = currentUser.data._id
  const token = currentUser.token



  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
  const { isLoading: isPostLoading, data: postDetails } = useGetPostDetails(postId, token)
  const { isLoading: isPostsLoading, data: posts } = useGetPosts(token)
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

  const handleOpenDialog = (id) => {
    setIsDialogOpen(true);
    setPostId(id)
  };

  const fallbackImage = '/images/avatar.jpg';

  return (
    <>
      <div className='center-content'>
        <Status />

        {isPostsLoading ? <Loader /> :
          (
            <>
              {posts.data.data.map((post) => (
                <Posts key={post._id} post={post} handleOpenDialog={handleOpenDialog} />
              ))}
            </>
          )
        }

      </div>


      <div className=' right-side-bar pl-6 pr-4 pt-8 w-[400px]'>
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
              <p className='text-sm font-bold tracking-wide'>{`${userDetails.data.data.firstName} ${userDetails.data.data.lastName}`}</p>
              <p className='text-lg text-[#7e7979] uppercase'>{userDetails.data.data.username}</p>
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

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} PaperProps={{ style: { borderRadius: '14px', maxWidth: '100vw', maxHeight: '100vh' }, }}>
        {isPostLoading ? <Loader/> :
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
