import React, { useRef } from 'react'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect } from 'react';

export default function Messages() {

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <>
            <div className='w-[80%]'>
                <div className="flex flex-col h-screen bg-white">
                    <div className="flex flex-1 overflow-y-auto">
                        <div className="w-[30%]  bg-white left border-r border-gray-200">
                            <div className='fixed w-[24%]'>
                                <div className="py-2">
                                    <div className='flex px-4 justify-between items-center pt-6'>
                                        <div className='flex gap-1 items-center'>
                                            <h2 className="text-black text-2xl font-bold">Username</h2>
                                            <ExpandMoreOutlinedIcon className='text-gray-600' style={{ fontSize: 24, }} />
                                        </div>
                                        <svg
                                            aria-label="New message"
                                            className="x1lliihq x1n2onr6"
                                            fill="#000000"
                                            height="24"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="24">
                                            <title>New message</title>
                                            <path
                                                d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                            <path
                                                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            ></path>
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                x1="16.848"
                                                x2="20.076"
                                                y1="3.924"
                                                y2="7.153"
                                            ></line>
                                        </svg>
                                    </div>
                                    <div className='flex px-4 justify-between pt-6 pb-2'>
                                        <h2 className='font-bold text-lg text-black'>Messages</h2>
                                        <button className='text-gray-600 font-medium'>Requests</button>
                                    </div>
                                    <div className='card px-5 py-2 hover:bg-gray-100 flex items-center gap-2'>
                                        <div className="img w-16 h-16 bg-gray-400 rounded-full "></div>
                                        <div className='flex flex-col'>
                                            <div className="name"><h2>Username</h2></div>
                                            <div className='flex gap-1 text-sm text-gray-500'>
                                                <div className="status"><h2>Active</h2></div>
                                                <div className="time">14h ago</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card px-5 py-2 hover:bg-gray-100 flex items-center gap-2'>
                                        <div className="img w-16 h-16 bg-gray-400 rounded-full "></div>
                                        <div className='flex flex-col'>
                                            <div className="name"><h2>Username</h2></div>
                                            <div className='flex gap-1 text-sm text-gray-500'>
                                                <div className="status"><h2>Active</h2></div>
                                                <div className="time">14h ago</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card px-5 py-2 hover:bg-gray-100 flex items-center gap-2'>
                                        <div className="img w-16 h-16 bg-gray-400 rounded-full "></div>
                                        <div className='flex flex-col'>
                                            <div className="name"><h2>Username</h2></div>
                                            <div className='flex gap-1 text-sm text-gray-500'>
                                                <div className="status"><h2>Active</h2></div>
                                                <div className="time">14h ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 right  flex flex-col justify-between pb-4">
                            <div className='flex-1 overflow-y-auto'>
                                <div className='header flex fixed bg-white justify-between w-[56%] border-b border-gray-200 py-3 px-4'>
                                    <div className="flex items-center gap-3">
                                        <div className="img w-14 h-14 bg-gray-400 rounded-full"></div>
                                        <h2 className="text-gray-800 font-semibold">Username</h2>
                                    </div>
                                    <div className='icons flex items-center'>
                                        <div className='p-2 hover:cursor-pointer'>
                                            <CallOutlinedIcon className='text-2xl' />
                                        </div>
                                        <div className='p-2 hover:cursor-pointer'>
                                            <svg
                                                aria-label="Video call"
                                                className="_ab6-"
                                                fill="#000000"
                                                height="24"
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width="24">
                                                <rect
                                                    fill="none"
                                                    height="18"
                                                    rx="3"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    width="16.999"
                                                    x="1"
                                                    y="3"
                                                ></rect>
                                                <path
                                                    d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className='p-2 hover:cursor-pointer'>
                                            <InfoOutlinedIcon style={{ fontSize: 30 }} />
                                        </div>
                                    </div>
                                </div>
                                <div className=" h-full space-y-4 px-6 flex flex-col justify-between">
                                    <div className='flex flex-col items-center mt-28'>
                                        <div className="img w-32 h-32 bg-gray-400 rounded-full "></div>
                                        <div className="pt-2"><h2 className='text-black text-xl font-bold'>Username</h2></div>
                                        <p className='font-light text-gray-600'>instagram</p>
                                        <button className='mt-2 rounded-md px-4 py-1 bg-gray-100 hover:bg-gray-200 font-medium'>View profile</button>
                                    </div>
                                    <div className='flex-1 '>
                                        <div className="user-1 flex items-end space-x-2">
                                            <img className="h-9 w-9 bg-gray-300 rounded-full" />
                                            <div className="bg-gray-200 rounded-3xl px-4 py-2 text-gray-800 max-w-xs">
                                                <p>hello there is an emergency!</p>
                                            </div>
                                        </div>


                                        <div className="user-2 flex items-end justify-end">
                                            <div className="bg-blue-500 rounded-3xl px-4 py-2 text-white max-w-xs">
                                                <p>hello there is an emergency!</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
                            <div className='px-4 pb-2'>
                                <div className='border border-gray-300 rounded-3xl'>
                                    <div className=' px-5 py-1 flex items-center gap-3'>
                                        <span className='hover:cursor-pointer'><svg aria-label="Choose an emoji" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Choose an emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg></span>
                                        <input type="text" className='bg-transparent w-full outline-none' placeholder='Message...' />
                                        <div className='flex items-center'>
                                            <span className='hover:cursor-pointer p-2'><svg aria-label="Voice Clip" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Voice Clip</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                                            <span className='hover:cursor-pointer p-2'><svg aria-label="Add Photo or Video" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                                            <span className='hover:cursor-pointer p-2'><svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/></svg></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
