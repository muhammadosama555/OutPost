import React, { useRef, useState } from 'react'
import Loader from './Loader';
import { useGetUserDetails, useUpdateProfile, useUpdateUserImage } from '../apiCalls/userApiCalls';
import { useSelector } from 'react-redux';

export default function EditProfile() {

    const [gender, setGender] = useState('');
    const [customGender, setCustomGender] = useState('');

    const bioInputElement = useRef();
    const contactInputElement = useRef();

    const { currentUser } = useSelector(state => state.userSlice) || null
    const userId = currentUser.data._id
    const token = currentUser.token


    const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId, token)
    const { mutate: updateUserImageMutate, isLoading: isUpdateUserImageLoading, isError: isUpdateUserImageError, error: updateUserImageError, } = useUpdateUserImage();

    const {
        mutate: updateProfileMutate,
        isLoading: isUpdateProfileLoading,
        isError: isUpdateProfileError,
        error: updateProfileError,
      } = useUpdateProfile();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
          token: token,
          bio: bioInputElement.current?.value,
          contact: contactInputElement.current?.value,
          userId: userId
        };
        console.log(data)
        updateProfileMutate(data);
       
      };

      const handleFileChange = (e) => {
        const imageData = {
          token: token,
          userId: userId,
          image: e.target.files[0],
        };
        updateUserImageMutate(imageData);
      };

    
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleCustomGenderChange = (event) => {
        setCustomGender(event.target.value);
    };

    const fallbackImage = '/images/avatar.jpg';

    return (
        <>
        {isUserLoading ? <Loader/> : (
            <div>
                <div><h1 className='font-base text-2xl pt-6 pl-10'>Edit Profile</h1></div>
                <div className='flex items-center gap-8 mt-10'>
                    <div className='w-[25%] text-right flex justify-end'>
                        <div className='w-12 h-12 rounded-full bg-gray-200'
                         style={{  backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")` }}>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span>{userDetails.data.data.username}</span> 
                   
                     <label htmlFor='file' className='cursor-pointer text-left text-sm font-bold text-blue-400 hover:text-gray-800'>
                        Change profile photo
                    </label>
                    <input
                    type="file"
                    id="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                    </div>
                </div>
                <div className='flex items-top gap-8 mt-4'>
                    <div className='w-[25%] text-right flex justify-end font-medium'>Contact</div>
                    <div className="flex flex-col w-[54%]">
                        <input 
                          ref={contactInputElement}
                        className='px-2 py-1 bg-slate-200 border w-full h-full border-gray-300 rounded-sm' type="text" placeholder='+0924' 
                        defaultValue={userDetails.data.data.profile?.contact}
                        />
                        </div>
                </div>
                <form action="">


                    <div className='flex items-top gap-8 mt-4'>
                        <div className='w-[25%] text-right flex justify-end font-medium'>Bio</div>
                        <div className="input w-[54%] h-[84px]">
                            <textarea
                              ref={bioInputElement}
                             className='py-1 px-2 border w-full h-full border-gray-300 rounded-sm'
                             defaultValue={userDetails.data.data.profile?.bio}
                             >
                            </textarea>
                            </div>
                    </div>

                    <div className='flex items-top gap-8 mt-4'>
                        <div className="w-[25%] text-right flex justify-end font-medium">Gender</div>
                        <div className="w-[54%]">
                            <div className='flex flex-col'>
                                <div className='flex items-center'>
                                    <input
                                        className='mr-2'
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                    <label className='pr-3' htmlFor="male">Male</label>

                                    <input
                                        className='mr-2'
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div className='pt-2'>
                                    <input
                                        className='mr-2'
                                        type="radio"
                                        id="other"
                                        name="gender"
                                        value="other"
                                        checked={gender === 'other'}
                                        onChange={handleGenderChange}
                                    />

                                    <label className='pr-3' htmlFor="other">Other</label>
                                    {gender === 'other' && (
                                        <input
                                            className='px-2 text-sm py-1 rounded-sm border border-gray-300'
                                            type="text"
                                            id="customGender"
                                            name="customGender"
                                            value={customGender}
                                            onChange={handleCustomGenderChange}
                                            placeholder=""
                                        />
                                    )}
                                </div>
                            </div>
                            <span className='text-xs tracking-tight text-gray-500 pt-2'>This won’t be part of your public profile.</span></div>
                    </div>
                    <div className='flex items-top gap-8 mt-4'>
                        <div className="w-[25%] text-right flex justify-end font-medium">Show account suggestions on profiles</div>
                        <div className="w-[65%] text-sm font-medium flex items-center"><input type="checkbox" className='mt-1 mx-2' /><span>Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</span></div>
                    </div>
                    <div className='flex items-center gap-8 mt-4'>
                        <div className='w-[25%] text-right flex justify-end font-medium'></div>
                        <button onClick={handleSubmit} className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-[8px] text-sm font-medium'>{isUpdateProfileLoading ? "Submitting" : "Submit"}</button>
                        {isUpdateProfileError && (
                  <div className='text-sm font-medium text-red-600 pt-2'>
                    <p>{updateProfileError.response.data.error}</p>
                  </div>
                )}
                    </div>
                </form>
            </div>)}
        </>
    )
}
