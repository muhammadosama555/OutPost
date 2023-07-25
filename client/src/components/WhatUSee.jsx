import React, { useState } from 'react'

export default function WhatUSee() {
    const [toggle, setToggle] = useState(false);

    const [selectedOption, setSelectedOption] = useState('on');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>What you see</h2>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Likes and views</h3>
                    <div className='flex items-center justify-between pb-5 pr-5'>
                        <h2>Hide likes</h2>
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
                    <p className='text-xs text-gray-500 pb-5'>The number of likes on posts from other accounts will be hidden. You can hide the number of likes on your own posts by going to Advanced Settings before sharing. Learn more</p>
                    <hr />
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Privacy and security help</h3>
                    <div>
                        <button className='text-blue-400 font-medium'>Support</button>
                    </div>
                </div>
                

            </div>
        </>
    )
}
