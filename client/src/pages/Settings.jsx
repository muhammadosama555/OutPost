import React, { useState } from 'react'
import EditProfile from '../components/EditProfile'
import EmailNoti from '../components/EmailNoti'
import PushNoti from '../components/PushNoti'
import WhatUSee from '../components/WhatUSee'
import WhoCanSeeYourContent from '../components/WhoCanSeeYourContent'
import PersonalDetails from '../components/PersonalDetails'
import Security from '../components/Security'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Settings() {

    const navigate = useNavigate();
   const location = useLocation()
   const [path, setPath] = useState(location.pathname);

   const handleButtonClick = (newPath) => {
    setPath(newPath); // Update the path when a button is clicked
    navigate(newPath); // Update the URL
  };

    return (
        <>
            <div className='w-[80%]'>
                <div>
                    <h1 className='font-medium text-3xl p-5'>Settings</h1>
                </div>
                <div className='flex justify-center items-center pb-10'>
                    <div className='settings-box flex min-h-[85vh] border border-gray-300 w-[60%] mt-4'>
                        <div className="left w-[25%] border-r  flex flex-col">
                            <button   onClick={() => handleButtonClick('/settings/editProfile')} className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Edit Profile</span></button>
                            <button className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Email Notifications</span></button>
                            <button className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Push Notifications</span></button>
                            <button className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>What you see</span></button>
                            <button className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Who can see your content</span></button>
                            <button className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Personal Details</span></button>
                            <button onClick={() => handleButtonClick('/settings/security')} className='py-[10px] pl-6 text-left hover:bg-gray-50 border-l-4 border-gray-50 hover:border-l-4 hover:border-gray-200 hover:font-medium'><span className='text-sm'>Security</span></button>
                        </div>
                        <div className="right w-[80%]">
                            {path === "/settings/editProfile" || path === "/settings" ? <EditProfile/> : null}
                            {/* <EmailNoti></EmailNoti> */}
                            {/* <PushNoti></PushNoti> */}
                            {/* <WhatUSee></WhatUSee> */}
                            {/* <WhoCanSeeYourContent></WhoCanSeeYourContent> */}
                            {/* <PersonalDetails></PersonalDetails> */}
                            {path === "/settings/security"  ? <Security/> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
