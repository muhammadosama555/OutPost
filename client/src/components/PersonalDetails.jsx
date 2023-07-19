import React, { useState } from 'react'

export default function PersonalDetails() {
    const [selectedOption, setSelectedOption] = useState('on');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>Personal Details</h2>
                <p className='pt-4 text-sm text-gray-500'>Outpost uses this information to verify your identity and to keep our community safe. You decide what personal details you make visible to others.</p>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Contact Info</h3>
                    <div className='pl-4 pr-10'>
                        <div className='flex justify-between items-center'>
                            <h3 className=''>falanadhimkana@gmail.com</h3>
                            <button className='text-red-400 hover:text-red-500 font-medium px-3 py-2'>Delete email</button>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h3 className=''>+923452477854</h3>
                            <button className='text-red-400 hover:text-red-500 font-medium px-3 py-2'>Delete number</button>
                        </div>
                        <div className=''>
                            <div className='pt-2 pb-3'>
                                <button className='text-gray-700 hover:text-gray-900 font-medium text-lg pr-3'>Add a new contact</button>
                            </div>
                            <form action="" className='hidden'>
                                <div className="flex pt-1 gap-5 pb-3">
                                    <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                                        <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                                        />
                                        <span
                                            className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                                }`}
                                        ></span>
                                        <span className="ml-2 text-sm">Email</span>
                                    </label>
                                    <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                                        <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                                        />
                                        <span
                                            className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                                }`}
                                        ></span>
                                        <span className="ml-2 text-sm">Phone number</span>
                                    </label>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <input type="text" className=' px-3 py-2 outline-none rounded-md w-[45%] border border-gray-200 hover:border-gray-300' placeholder='Type' />
                                </div>
                                <div className='pt-4'>
                                    <h3 className='pb-2'>To confirm please re-enter your password</h3>
                                    <div className='flex justify-between items-center'>
                                        <input type="password" className=' px-3 py-2 outline-none rounded-md w-[45%] border border-gray-200 hover:border-gray-300' placeholder='Password' />
                                    </div>
                                </div>
                                <div className='py-4'>
                                    <button className='bg-blue-400 hover:bg-blue-500 text-white px-5 py-1 rounded-md outline-none'>Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Birthday</h3>
                    <div className='pl-4 pt-2'>
                        <div className='flex items-center justify-between pr-10'>
                            <div className='w-full'>
                                <input type="date" name="" id="" className='px-3 py-2 outline-none rounded-md w-[50%] border border-gray-200 hover:border-gray-300' />
                            </div>
                            <button className='text-gray-600 hover:text-black font-medium px-3 py-2'>Edit</button>
                        </div>

                    </div>
                </div>





            </div>
        </>
    )
}
