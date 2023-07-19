import React, { useState } from 'react'

export default function EditProfile() {

    const [gender, setGender] = useState('');
    const [customGender, setCustomGender] = useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleCustomGenderChange = (event) => {
        setCustomGender(event.target.value);
    };


    return (
        <>
            <div>
                <div><h1 className='font-base text-2xl pt-6 pl-10'>Edit Profile</h1></div>
                <div className='flex items-center gap-8 mt-10'>
                    <div className='w-[25%] text-right flex justify-end'>
                        <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                    </div>
                    <div className='flex flex-col'><span>Username</span> <button className='text-left text-sm font-bold text-blue-400 hover:text-gray-800'>Change profile photo</button></div>
                </div>
                <div className='flex items-top gap-8 mt-4'>
                    <div className='w-[25%] text-right flex justify-end font-medium'>Website</div>
                    <div className="flex flex-col w-[54%]"><input className='px-2 py-1 bg-slate-200 cursor-not-allowed border w-full h-full border-gray-300 rounded-sm' type="text" placeholder='Website' /><span className='text-xs tracking-tight text-gray-500 pt-2'>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</span></div>
                </div>
                <form action="">


                    <div className='flex items-top gap-8 mt-4'>
                        <div className='w-[25%] text-right flex justify-end font-medium'>Bio</div>
                        <div className="input w-[54%] h-[84px]"><textarea className='py-1 px-2 border w-full h-full border-gray-300 rounded-sm'></textarea></div>
                    </div>

                    <div className='flex items-top gap-8 mt-4'>
                        <div className="w-[25%] text-right flex justify-end font-medium">Gender</div>
                        <div className="w-[54%]">
                            <form className='flex flex-col'>
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
                            </form>
                            <span className='text-xs tracking-tight text-gray-500 pt-2'>This won’t be part of your public profile.</span></div>
                    </div>
                    <div className='flex items-top gap-8 mt-4'>
                        <div className="w-[25%] text-right flex justify-end font-medium">Show account suggestions on profiles</div>
                        <div className="w-[65%] text-sm font-medium flex items-center"><input type="checkbox" className='mt-1 mx-2' /><span>Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</span></div>
                    </div>
                    <div className='flex items-center gap-8 mt-4'>
                        <div className='w-[25%] text-right flex justify-end font-medium'></div>
                        <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-[8px] text-sm font-medium'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
