import React, { useEffect, useRef } from "react";
import { ThumbUpOutlined, SendOutlined } from '@mui/icons-material'
import { Link } from "react-router-dom";
import { useCreateComment } from "../apiCalls/commentApiCalls";
import { useSelector } from "react-redux";
import { useLikePost } from "../apiCalls/postApiCalls";
import "../App.css";


const moment = require('moment');



export default function Posts({ post, openPostDetailsHandler }) {

  const { currentUser } = useSelector((state) => state.userSlice);

  const token = currentUser.token;

  const isCurrentUserLiked = () => {
    return post.likes.some((like) => like._id === currentUser.data._id);
  };


  const textInputElement = useRef();

  const {
    mutate: createCommentMutate,
    isSuccess: createCommentIsSuccess,
  } = useCreateComment();
  const {
    mutate: likePostMutate,
  } = useLikePost();


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      text: textInputElement.current?.value,
      postId: post._id
    };
    createCommentMutate(data);

  };
  const likeSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      postId: post._id
    };
    likePostMutate(data);

  };

  useEffect(() => {
    if (createCommentIsSuccess) {
      textInputElement.current.value = "";
    }
  }, [createCommentIsSuccess]);

  const fallbackImage = '/images/avatar.jpg';

  return (
    <div className="mt-10 flex justify-center">
      <div className="post w-[520px] border-b pb-6 border-gray-300">
        <div className="head flex items-center justify-between">
          <div className="flex items-center">
            <div className="border-2 border-pink-400 w-10 h-10 rounded-full flex items-center justify-center">
              <div className=" cursor-pointer border border-gray-300 w-8 h-8 rounded-full"
                style={{
                  backgroundImage: `url("${post.owner?.profile?.picture}"), url("${fallbackImage}")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}>
              </div>
            </div>
            <Link to={`/userDetails/${post.owner._id}`}>
              <h2 className="UserName font-medium pl-2">{post.owner.username}</h2>
            </Link>
            <div className="time flex items-center pl-3 gap-1 pt-[1px]">
              <div className="h-1 w-1 rounded-full bg-gray-500"></div>
              <h2 className="text-gray-500">{moment(post.createdAt).fromNow()}</h2>
            </div>
          </div>
          <div className="more cursor-pointer px-1 flex gap-1">
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
        <div className="body pt-4">
          <div className="flex items-center cursor-pointer justify-center rounded-[4px] overflow-hidden">
            <div onClick={()=>openPostDetailsHandler(post._id)} className="image w-full flex items-center justify-center bg-black"          >
              <img className="h-[600px]" src={post.imageUrl} alt="" />
            </div>
          </div>
          <div className="actions pt-4 flex justify-between items-center">
            <div className="flex gap-3">
              <div onClick={likeSubmitHandler} className="like cursor-pointer">
                <svg
                  aria-label="Like"
                  className="svg-icon"
                  width="24"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  style={{
                    transition: "fill 0.10s ease-in-out",
                    fill: isCurrentUserLiked() ? "rgb(255, 48, 64)" : "none",
                    stroke: isCurrentUserLiked() ? "rgb(255, 48, 64)" : "rgb(38, 38, 38)",
                    strokeWidth: "4px",
                    overflow: "visible", // Ensure the icon is not clipped
                    margin: "-4px", // Compensate for the increased stroke width
                  }}
                >
                  <title>Like</title>
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
                </svg>
              </div>

              <div onClick={()=>openPostDetailsHandler(post._id)} className="comment cursor-pointer">
                <svg
                  aria-label="Comment"
                  className="svg-icon"
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
              <div className="share cursor-pointer">
                <svg
                  aria-label="Share Post"
                  className="x1lliihq x1n2onr6"
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
            <div className="save cursor-pointer">
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
          <div className="pt-4">
            <h2 className="text-sm font-medium">{post.likes.length} likes</h2>
          </div>
          <div className="pt-3">
            <h2 className="text-sm">
              <span className="text-sm font-medium">{post.owner.username} </span>
              {post.content}
            </h2>
          </div>
          <div className="pt-5">
            <span className="text-sm text-gray-500">more</span>
          </div>
          <div className="pt-1">
            <span onClick={()=>openPostDetailsHandler(post._id)} className="cursor-pointer text-sm text-gray-500">
              View all {post.comments.length} comments
            </span>
          </div>
          <div>

            <div className="pt-2 flex items-center justify-between">
              <div className="cursor-pointer">
                <svg
                  aria-label="Emoji"
                  className="w-4 h-4 mr-1"
                  color="rgb(115, 115, 115)"
                  fill="rgb(115, 115, 115)"
                  height={13}
                  role="img"
                  viewBox="0 0 24 24"
                  width={13}
                >
                  <title>Emoji</title>
                  <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z" />
                </svg>
              </div>
              <input
                type="text"
                className="text-sm outline-none placeholder-gray-400 flex-grow mx-2"
                placeholder="Add a comment ..."
                name="text"
                ref={textInputElement}
                onInput={() => { }}
              />
         
                <button
                  onClick={handleSubmit}
                  className="cursor-pointer text-blue-400 hover:text-blue-600 font-semibold rounded pr-2"
                >
                  Post
                </button>
           
              

            </div>

            {post.comments ?
              <>
                {post.comments.slice(Math.max(post.comments.length - 3, 0)).reverse().map((comment) => (
                  <div key={comment._id} className="comment mt-6 flex items-start">
                    <div className="user-image border-2 border-pink-400 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                      <div className="border border-gray-300 w-8 h-8 rounded-full"
                        style={{
                          backgroundImage: `url("${comment.owner.profile?.picture}"), url("${fallbackImage}")`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}>
                      </div>
                    </div>
                    <div className="comment-content">
                      <div className="head">
                        <Link to={`/userDetails/${comment.owner._id}`}>
                          <h4 className="UserName font-medium">{comment.owner.username} <span className="text-gray-500 font-normal text-xs">{moment(comment.createdAt).fromNow()}</span></h4>

                        </Link>
                      </div>
                      <div className="body pt-2">
                        <p className="comment-text text-sm">{comment.text}</p>
                      </div>
                      <div className="actions pt-2 flex gap-2">
                        <div className="like">
                          <span> <ThumbUpOutlined /> {comment.likes.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </> : null}



          </div>

        </div>
      </div>
    </div >
  );
}
