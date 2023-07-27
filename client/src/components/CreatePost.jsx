import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { useCreatePost } from "../apiCalls/postApiCalls";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useGetUserDetails } from "../apiCalls/userApiCalls";

export default function CreatePost({closeCreatePostHandler}) {
  
  const { currentUser } = useSelector((state) => state.userSlice);

  const userId = currentUser.data._id;
  const token = currentUser.token;

  const [toggle, setToggle] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);

  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(
    userId,
    token
  );

  const contentInputElement = useRef();
  const imageInputElement = useRef();

  const {
    mutate: createPostMutate,
    isLoading: isCreatePostLoading,
    isError: isCreatePostError,
    error: createPostError,
    isSuccess: createPostIsSuccess
  } = useCreatePost();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      token: token,
      content: contentInputElement.current?.value,
      image: imageInputElement.current?.files[0],
    };
    createPostMutate(data);
   
    
  };

  useEffect(() => {
    if (createPostIsSuccess) {
      console.log(closeCreatePostHandler());
      setShowImage(false);
      setShowPostDetails(false);
      contentInputElement.current.value = "";
      imageInputElement.current.value = "";
    }
  }, [createPostIsSuccess]);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file)); // Convert the file to a URL
      setShowImage(true); // Show the image and the side div
    }
  };

  const handleNextClick = () => {
    setShowPostDetails(true);
    console.log("next button clicked")
  };

  const handleBackClick = () => {
    setShowPostDetails(false);
    console.log("back button clicked")
  };

  const fallbackImage = "/images/avatar.jpg";

  return (
    <>
      <div className="bg-gray-100 relative  max-w-6xl h-[450px] rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 border-b border-gray-300 absolute w-full z-30">
          <button className="flex items-center justify-center w-4 h-full" onClick={handleBackClick}>
          {showImage &&  <ArrowBackIosIcon style={{ fontSize: 20 }}  /> }
          </button>
          <h2 className="font-medium text-center py-2">Create a new post</h2>
          <h2 className="font-medium text-blue-400 hover:text-gray-800 hover:cursor-pointer">
          <span className={`${ showImage && !showPostDetails ? 'block' : 'hidden'}  `} onClick={handleNextClick}>Next</span>
          <span className={`${showPostDetails ? 'block' : 'hidden'}  `} onClick={handleSubmit}>{isCreatePostLoading ? "Sharing" : "Share"}</span>
          </h2>
        </div>

        <div className=" flex h-[94.3%]">
          <div className=" h-full w-[900px] relative">
            <div className="flex flex-col gap-3 justify-center items-center h-full">
              <div>
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  class=""
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <title>
                    Icon to represent media such as images or videos
                  </title>
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg">Drag photos and videos here</h3>
              <label htmlFor="file" >
                <div className="bg-blue-500 text-white font-medium text-sm px-4 py-1 rounded-lg hover:bg-blue-600">
                  Select from Computer
                </div>
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
                ref={imageInputElement}
                name="image"
              />
            </div>
            <div
              className={`${!showImage ? 'hidden' : ''} image absolute top-0 left-0 w-full h-full bg-no-repeat bg-center bg-cover`}
              style={{
                backgroundImage: `url(${imageFile})`,
              }}
            ></div>
          </div>
          <div className={`transition-all duration-300 transform ${!showPostDetails ? '-translate-x-full invisible hidden' : 'translate-x-0 visible'}   mt-10 border-l w-2/5`}>
            <div className="">
            {isUserLoading ? (
              <Loader />
            ) : (
              <div className="profile flex items-center gap-4 pt-4 px-3">
                <div className="w-12 flex items-center justify-center">
                  <div
                    className="w-10 h-10 border border-gray-200  rounded-full"
                    style={{
                      backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
                <p className="tracking-wide"> {userDetails.data.data.username}</p>
              </div>) }
              <div className="px-4 pt-1">
                <textarea
                  name="content"
                  ref = {contentInputElement}
                  className="w-full h-48 p-1 outline-none"
                ></textarea>
              </div>
              <div className="pr-3">
                <div className="py-3 mt-3 border-t">
                  <div className="flex justify-between items-center px-4">
                    <input
                      type="text"
                      className="w-full outline-none text-lg bg-transparent text-gray-800 placeholder:text-slate-700"
                      placeholder="Add location"
                    />
                    <div className="w-7">
                      <LocationOnOutlinedIcon style={{ fontSize: 20 }} />
                    </div>
                  </div>
                </div>
                <div className="py-3 border-t">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="text-lg">Accessibility</h3>
                    <div className="">
                      <ExpandMoreOutlinedIcon style={{ fontSize: 32 }} />
                    </div>
                  </div>
                </div>
                <div className="py-3 border-t border-b">
                  <div className="flex justify-between items-center px-4">
                    <h3 className="text-lg">Advance Settings</h3>
                    <ExpandMoreOutlinedIcon
                      className="rotate-icon"
                      style={{ fontSize: 32 }}
                    />
                  </div>
                  <div className="px-4 pt-2">
                    <div className="flex justify-between items-center pr-4">
                      <div className="w-full h-full">
                        <h3 className="text-lg">
                          Hide like and view counts on this post
                        </h3>
                      </div>
                      <div className="w-7">
                        <label
                          htmlFor="toggle"
                          className="flex items-center cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              id="toggle"
                              type="checkbox"
                              className="sr-only"
                              checked={toggle}
                              onChange={() => setToggle(!toggle)}
                            />
                            <div
                              className={`w-12 h-7 bg-gray-400 rounded-full shadow-inner ${
                                toggle ? "bg-green-500" : "bg-gray-500"
                              }`}
                            ></div>
                            <div
                              className={`toggle-dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0  ${
                                toggle ? "translate-x-5" : ""
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs">
                        Only you will see the total number of likes and views on
                        this post. You can change this later by going to the ···
                        menu at the top of the post. To hide like counts on
                        other people's posts, go to your account settingsvvvvvvvvv.
                      </h4>
                      {isCreatePostError && (
                  <div className='text-sm font-medium text-red-600 pt-2'>
                    <p>{createPostError.response.data.error}</p>
                  </div>
                     )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
}
