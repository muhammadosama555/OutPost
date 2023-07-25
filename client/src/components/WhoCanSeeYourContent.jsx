import React, { useState } from 'react'

export default function WhoCanSeeYourContent() {
    const [toggle, setToggle] = useState(false);

    const [selectedOption, setSelectedOption] = useState('on');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>Who can see your content</h2>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Account privacy</h3>
                    <div className='flex items-center justify-between pb-5 pr-5'>
                        <h2>Private account</h2>
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
                    <p className='text-xs text-gray-500 pb-5'>When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don’t have an Outpost account.</p>
                    <p className='text-xs text-gray-500 pb-5'>When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists. Learn more</p>
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
