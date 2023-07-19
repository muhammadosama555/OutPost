import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';

export default function SideBar() {

    const [toggleSidebar, setToggleSidebar] = useState(false)

    const toggleSidebarHandler = () => {
        setToggleSidebar(!toggleSidebar)
    }

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            if (windowWidth >= 0 && windowWidth <= 768) {
                setToggleSidebar(true);
            } else {
                setToggleSidebar(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <>
            <div className='left-side-bar w-[20%] '>
                <div className={`fixed left-0 top-12 pt-10 ${toggleSidebar ? "w-20" : "w-[20%]"}   h-full border-r border-gray-200`}>
                    <div className='space-y-2'>
                        <Link to="/profile">
                            <div className='profile flex items-center gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-2 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                                <div className='w-10 flex items-center justify-center'>
                                    <div className='w-10 h-10 border border-gray-200  rounded-full'
                                        style={{
                                            backgroundImage: `url("/images/profile.jpg")`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}>
                                    </div>
                                </div>
                                {!toggleSidebar ? <p className='tracking-wide w-full'>UserName</p> : null}
                            </div>
                        </Link>

                        <div onClick={toggleSidebarHandler} className='search flex items-center pt-1 gap-3  hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                            <div className='w-12 h-12 flex items-center justify-center'>
                                <svg aria-label="Search" className="w-6 h-6 text-gray-600" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="16.511" x2={22} y1="16.511" y2={22} /></svg>
                            </div>
                            {!toggleSidebar ? <p className='tracking-wide w-full'>Search</p> : null}
                        </div>
                        <div className='Reels flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                            <div className='w-12 h-12 flex items-center justify-center'>
                                <svg aria-label="Reels" className="h-6 w-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2} x1="2.049" x2="21.95" y1="7.002" y2="7.002" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="13.504" x2="16.362" y1="2.001" y2="7.002" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="7.207" x2="10.002" y1="2.11" y2="7.002" /><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd" /></svg>
                            </div>
                            {!toggleSidebar ? <p className='tracking-wide w-full'>Reels</p> : null}
                        </div>
                        <Link to="/messages">
                            <div className='Messages flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                                <div className='w-12 h-12 flex items-center justify-center'>
                                    <svg aria-label="Messenger" className="w-6 h-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth="1.739" /><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd" /></svg>
                                </div>
                                {!toggleSidebar ? <p className='tracking-wide w-full'>Messages</p> : null}
                            </div>
                        </Link>
                        <div className='Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                            <div className='w-12 h-12 flex items-center justify-center'>
                                <svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                                </svg></div>
                            {!toggleSidebar ? <p className='tracking-wide w-full'>Notifications</p> : null}
                        </div>
                        <div className='Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                            <div className='w-12 h-12 flex items-center justify-center'>
                                <svg aria-label="New post" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="6.545" x2="17.455" y1="12.001" y2="12.001" /><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} x1="12.003" x2="12.003" y1="6.545" y2="17.455" /></svg>
                            </div>
                            {!toggleSidebar ? <p className='tracking-wide w-full'>Create</p> : null}
                        </div>
                        <div className='Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                            <div className='w-12 h-12 flex items-center justify-center'>
                                <svg aria-label="Saved" className="w-6 h-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={18} role="img" viewBox="0 0 24 24" width={18}><title>Saved</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                            </div>
                            {!toggleSidebar ? <p className='tracking-wide w-full'>Save</p> : null}
                        </div>
                    </div>
                    <div className='relative h-[50%]'>
                        <div className='absolute bottom-6 w-full'>
                            <div className='Create flex items-center gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out'>
                                <div className='w-12 h-12 flex items-center justify-center'>
                                    <MenuIcon style={{ fontSize: 32 }} />
                                </div>
                                {!toggleSidebar ? <p className='tracking-wide w-full'>More</p> : null}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='hidden search-panel pl-[78px] w-[420px] bg-white h-screen'>
                    <div className='fixed z-20 ml-[2px] mt-[5px] bg-white w-[342px] border-r h-screen'>
                        <div className='border-b py-5'>
                            <h2 className='text-2xl px-5 font-medium'>Search</h2>
                            <div className="searchbar flex items-center  bg-slate-200 rounded-md mt-8 mx-3">
                                <input className='pl-4 pr-7 py-2 bg-gray-200 border w-full h-full rounded-md outline-none' type="text" placeholder='Search' /> 
                                <div className='w-5 h-5 mr-2 rounded-full bg-[#b8b6b6] flex items-center justify-center cursor-pointer'> <CloseOutlinedIcon style={{fontSize: 12}}/></div>    
                            </div>
                        </div>
                        {/* <div className='px-5 py-4'>
                            <div className='flex justify-between'><h1>Recent</h1> <button>Clear all</button></div>
                        </div> */}
                        <div className='pt-3'>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer'>
                                <div className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                                    style={{
                                        backgroundImage: `url("/images/profile.jpg")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}>

                                </div>
                                <div className='flex flex-col'>
                                    <div className="name"><h2>Username</h2></div>
                                    <div className='flex gap-1 text-sm text-gray-500'>
                                        <div className="status"><h2>Username •</h2></div>
                                        <div className="time">4.5M Followers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='hidden noti-panel pl-[78px] w-[420px] bg-white h-screen'>
                    <div className='fixed z-20 ml-[2px] mt-[5px] bg-white w-[350px] border-r h-screen'>
                        <div className='pt-5'>
                            <h2 className='text-2xl px-4 font-medium'>Notifications</h2>
                        </div>
                        
                        <div className=' border-b border-gray-300 pb-4'>
                            <h2 className='py-3 px-4 font-bold text-lg'>New</h2>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className=' border-b border-gray-300 pb-4'>
                            <h2 className='py-3 px-4 font-bold text-lg'>This Month</h2>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer '>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer '>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span>
                                        <span className='font-medium'>UserName </span>is on Instagram. </span>
                                     <span>
                                        <span className='font-medium'>UserName2 </span>and 1 other follow them. </span>
                                    <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer '>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span>Follow <span className='font-medium'>UserName1, </span> <span className='font-medium'>Username2 </span> and others you know to see their photos and videos. </span>
                                    <span className="time text-gray-500">2d</span>
                                </div>
                                <div className='hidden'>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer '>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                        </div>
                        <div className=' border-b border-gray-300 pb-4'>
                            <h2 className='py-3 px-4 font-bold text-lg'>Earlier</h2>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            <div className='notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer'>
                                <div>
                                    <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                                </div>
                                <div className='w-full pl-3 pr-2 tracking-tight text-sm'>
                                    <span><span className='font-medium'>UserName </span>is on Instagram.</span> <span><span className='font-medium'>UserName2 </span>and 1 other follow them.</span> <span className="time text-gray-500">2d</span>
                                </div>
                                <div className=''>  
                                    <button className='text-white bg-blue-500 hover:bg-blue-600 px-5 py-[6px] text-sm rounded-lg font-medium'>Follow</button>
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
