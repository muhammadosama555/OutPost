import React, { useState } from 'react'

export default function EmailNoti() {
    const [selectedOption, setSelectedOption] = useState('on');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <>
            <div className='px-8 py-6'>
                <h2 className=' text-3xl'>Email Notifications</h2>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Feedback emails</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>Give feedback on Outpost.</p>
                    <hr/>
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Reminder emails</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>Get notifications you may have missed.</p>
                    <hr/>
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Proudct emails</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>Get tips and resources about Outpost's tools.</p>
                    <hr/>
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>News emails</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>Learn about new Outpost features.</p>
                    <hr/>
                </div>
                <div className='pt-4 pl-5'>
                    <h3 className='font-bold tracking-wide py-3'>Support emails</h3>
                    <div className="flex pl-4 gap-5 pb-5">
                        <label htmlFor="radio-on" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-on" name="radio-btn" value="on" checked={selectedOption === 'on'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'on' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">On</span>
                        </label>
                        <label htmlFor="radio-off" className={`relative cursor-pointer text-lg flex items-center`}>
                            <input type="radio" id="radio-off" name="radio-btn" value="off" checked={selectedOption === 'off'} onChange={handleOptionChange} className="hidden"
                            />
                            <span
                                className={`inline-block w-5 h-5 rounded-full border-2 ${selectedOption === 'off' ? 'border-[6px] border-blue-500' : 'border-gray-300'
                                    }`}
                            ></span>
                            <span className="ml-2 text-sm">Off</span>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 pb-1'>Get updates on reports and violations of our Community Guidelines.</p>
                    <hr/>
                </div>
            </div>
        </>
    )
}
