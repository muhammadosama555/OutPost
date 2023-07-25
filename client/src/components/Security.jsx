import React, { useState } from 'react'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
export default function Security() {

    const [isActive, setIsActive] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });

    const handleFocus = (name) => setIsActive({ ...isActive, [name]: true });

    const handleBlur = (name, value) => setIsActive({ ...isActive, [name]: value !== '' });

    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>Password and Security</h2>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Login & recovery</h3>
                    <p className='text-sm text-gray-600'>Manage your passwords, login preferences and recovery methods.</p>
                    <div className='mt-4  mx-4 w-4/5 rounded-lg overflow-hidden shadow-sm'>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Change Password</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Two-factor authentication</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Saved login</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                    </div>
                </div>
                <div className='py-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Security checks</h3>
                    <p className='text-sm text-gray-600'>Review security issues by running checks across apps, devices and emails sent.</p>
                    <div className='mt-4  mx-4 w-4/5 rounded-lg overflow-hidden shadow-sm'>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Where you're logged in</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Login alerts</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Recent emails</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                        <div className='cursor-pointer bg-stone-50 hover:bg-gray-100 px-4 py-3 flex items-center justify-between'><span className='font-medium text-gray-600'>Security checkup</span><NavigateNextOutlinedIcon style={{ color: "gray" }} /></div>
                    </div>
                </div>
            </div>

            <div className='fixed inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen'>
                <div className='p-6 bg-white absolute w-[500px] rounded-2xl shadow-xl overflow-hidden'>
                    <div className='flex justify-end w-full'>
                        <div className='flex items-center justify-center w-12 h-12'>
                            <CloseOutlinedIcon/>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-2xl font-semibold py-2'>Change Password</h3>
                        <p className='text-sm'>Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!$@%).</p>
                    </div>

                    <div className='w-full'>
                        <div className='settings-box flex w-full mt-4'>

                            <div className="w-full">
                                {['Current password', 'New password', 'Confirm password'].map(name => (
                                    <div className='relative mt-3 h-14 rounded-lg border overflow-hidden' key={name}>
                                        <input
                                            type='password'
                                            name={name}
                                            className='px-4 pt-4 block w-full h-full text-sm outline-none'
                                            onFocus={() => handleFocus(name)}
                                            onBlur={(e) => handleBlur(name, e.target.value)}
                                        />
                                        <label htmlFor={name} className={`absolute top-3.5 left-4 -z-1 pointer-events-none text-gray-500 tracking-wide duration-300 ${isActive[name] ? 'transform translate-y-[-0.7rem] text-sm text-gray-800' : ''}`}>
                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                        </label>
                                    </div>
                                ))}
                                <div className=' w-full pb-6'>
                                    <button className='w-full text-start text-blue-500 pt-1 hover:underline'>Forgot your passwrod?</button>
                                </div> 
                                <button className='bg-blue-300 disabled: w-full text-white py-2 px-4 rounded-3xl hover:cursor-not-allowed'>Change Password</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
