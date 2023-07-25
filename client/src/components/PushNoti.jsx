import React, { useState } from 'react'

export default function PushNoti() {
    const [toggle, setToggle] = useState(false);

    const [selectedOption, setSelectedOption] = useState('on');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>Push Notifications</h2>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Push Notifications</h3>
                    <div className='flex items-center justify-between pr-5'>
                        <h2>Pause all</h2>
                        <div className="w-7">
                            <label htmlFor="toggle" className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        id="toggle"
                                        type="checkbox"
                                        className="sr-only"
                                        checked={toggle}
                                        onChange={() => setToggle(!toggle)}
                                    />
                                    <div className={`w-12 h-7 bg-gray-400 rounded-full shadow-inner ${toggle ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <div className={`toggle-dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0  ${toggle ? 'translate-x-5' : ''}`}></div>
                                </div>
                            </label>
                        </div>
                    </div>

                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Likes</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From profiles I follow</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From everyone</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName liked your photo.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Likes and comments on photos of you</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From profiles I follow</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From everyone</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName commented on a post that you're tagged in your photo.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Comments</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From profiles I follow</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From everyone</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName commented: "Nice pic dear!"</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Comment likes</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName liked your comment: "Nice pic dear!".</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>First post and stories</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From profiles I follow</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From everyone</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>See UserName's first story on Instagram, and other similar notifications.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>New followers</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>FirstName LastName (Username) started following you.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Accepted Follow Requests</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>FirstName LastName (UserName) started following yo</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Account suggestions</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName, who you might know, is on Instagram, and other similar notifications.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Mentions in bio</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From profiles I follow</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">From everyone</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName mentioned you in their bio.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Message requests</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName wants to sends you a message.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Messages</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName sent you a message.</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Messages Reminders</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>

                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>UserName sent you a message <span>(1d ago).</span></p>
                    <hr />
                </div>

            </div>
        </>
    )
}
