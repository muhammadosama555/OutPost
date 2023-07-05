import React from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function Posts() {
     return (
          <>
               <div className='mt-10'>
                    <div className="post border-b pb-6 border-gray-300">
                         <div className="head flex items-center justify-between">
                              <div className='flex items-center'>
                                   <div className='border-2 border-pink-400 w-10 h-10 rounded-full flex items-center justify-center'>
                                        <div className='border border-gray-300 w-8 h-8 rounded-full'></div>
                                   </div>
                                   <h2 className='UserName font-medium pl-2 hover:text-gray-500 hover:cursor-pointer'>Lorem Ipsum</h2>
                                   <div className='time flex items-center pl-3 gap-1 pt-[1px]'>
                                        <div className='h-1 w-1 rounded-full bg-gray-500'></div>
                                        <h2 className='text-gray-500'>1d</h2>
                                   </div>
                              </div>
                              <div className="more flex gap-1">
                                  <svg aria-label="More options" className='stroke-black hover:stroke-none hover:cursor-pointer' color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><circle cx={12} cy={12} r="1.5" /><circle cx={6} cy={12} r="1.5" /><circle cx={18} cy={12} r="1.5" /></svg>
                              </div>
                         </div>
                         <div className="body pt-4">
                              <div className='flex items-center justify-center'>
                                   <div className="image w-[500px] flex items-center justify-center bg-black">
                                        <img className='h-[600px]' src="/images/post.jpg" alt="" />
                                   </div>
                              </div>
                              <div className="actions pt-4 flex justify-between items-center">
                                   <div className='flex gap-3'>
                                        <div className="like">
                                           <svg aria-label="Like" className="hover:fill-slate-500 hover:cursor-pointer" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" /></svg>
                                           
                                        </div>
                                        <div className="comment">
                                            <svg aria-label="Comment" className="stroke-black hover:stroke-slate-500 hover:cursor-pointer " color="rgb(0, 0, 0)" fill="rgb(38, 38, 38)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" strokeLinejoin="round" strokeWidth={2} /></svg>
                                        </div>
                                        <div className="comment stroke-black hover:stroke-white">
                                             <svg aria-label="Share Post" className="stroke-black hover:fill-slate-500 hover:cursor-pointer" color="rgb(0, 0, 0)" fill="rgb(38, 38, 38)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Share Post</title><line className='hover:stroke-gray-500' strokeLinejoin="round" strokeWidth={2} x1={22} x2="9.218" y1={3} y2="10.083" /><polygon className='stroke-black hover:stroke-slate-500' fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" strokeLinejoin="round" strokeWidth={2} /></svg>
                                        </div>
                                   </div>
                                   <div className="save ">
                                      <svg aria-label="Save" className="x1lliihq x1n2onr6 hover:stroke-slate-500" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" className='hover:stroke-slate-500' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                                   </div>
                              </div>
                              <div className='pt-4'>
                                   <h2 className='text-sm font-medium'>128 likes</h2>
                              </div>
                              <div className='pt-3'>
                                   <h2 className='text-sm'><span className='text-sm font-medium'>UserName</span> The Palm Jumeirah ...</h2>
                              </div>
                              <div className='pt-5'>
                                   <span className='text-sm text-gray-500'>more</span>
                              </div>
                              <div className='pt-1'>
                                   <span className='text-sm text-gray-500'>View all 18 comments</span>
                              </div>
                              <div className='pt-2 flex items-center justify-between'>
                                   <input type="text" className='text-sm outline-none placeholder-gray-400' placeholder='Add a comment ...' />
                                  <svg aria-label="Emoji" className="w-4 h-4 mr-1" color="rgb(115, 115, 115)" fill="rgb(115, 115, 115)" height={13} role="img" viewBox="0 0 24 24" width={13}><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z" /></svg>

                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

