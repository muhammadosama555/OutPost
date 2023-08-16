import React, { useRef, useState } from 'react'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateConversation, useGetConversation, useGetConversations } from '../apiCalls/conversationApiCalls';
import Loader from '../components/Loader';
import { useCreateMessage, useGetConversationsMessages } from '../apiCalls/messageApiCalls';
import io from "socket.io-client";
import { useQueryClient } from "react-query";
import Dialog from '@material-ui/core/Dialog';
import "../App.css";
import { useGetUsers } from '../apiCalls/userApiCalls';

const socket = io("http://localhost:5000");
console.log("Socket connection established.");

export default function Messages() {

  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const textInputElement = useRef();
  const [conversationId, setConversationId] = useState(null)
  const [openChat, setOpenChat] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { currentUser } = useSelector(state => state.userSlice) || null
  const userId = currentUser.data._id
  const token = currentUser.token

  const { isLoading: isUsersLoading, data: users } = useGetUsers(token, search);
  const { isLoading: isConversationsLoading, data: conversations } = useGetConversations(token)
  const { data: conversation } = useGetConversation(conversationId, token)
  const { isLoading: isConversationMessagesLoading, data: conversationMessages } = useGetConversationsMessages(
    conversationId,
    token,
    {
      initialData: { data: [] },
    }
  );


  const { mutate: createMessageMutate, isSuccess: createMessageIsSuccess } = useCreateMessage();
  const { mutate: createConversationMutate, isSuccess: createConversationIsSuccess } = useCreateConversation();



  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const selectMembersHandler = (user) => {
    // Check if the user is already selected
    if (!selectedMembers.some((selectedUser) => selectedUser._id === user._id)) {
      setSelectedMembers((prevSelectedMembers) => [...prevSelectedMembers, user]);
    }
    setSearch("")
  };
  

  const removeMembersHandler = (userToRemove) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.filter((user) => user._id !== userToRemove._id)
    );
  };
  
  const createConversationHandler = () => {
    // Extract _id values from selected members and create an array of memberIds
  const memberIds = selectedMembers.map(member => member._id);
    const data = {
      token: token,
      members: memberIds
    };
    createConversationMutate(data);
  }



  // Listen for incoming messages from the server
  useEffect(() => {
    const handleIncomingMessage = (data) => {
      console.log("Received message from server:", data);

      // Update the conversation messages in the cache with the new message
      queryClient.setQueryData(["conversationMessages", conversationId, token], (oldData) => ({
        ...oldData,
        data: { ...oldData.data, data: [...oldData.data.data, data] },
      }));
    };

    socket.on("message", handleIncomingMessage);

    // Clean up the socket connection and remove the event listener when the component unmounts
    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [socket, conversationId, token, queryClient]);


  const submitMessageHandler = (event) => {
    event.preventDefault();
    const text = textInputElement.current?.value.trim();
    if (text) {
      const data = {
        token: token,
        text: text,
        sender: userId,
        conversation: conversationId,
      };
      createMessageMutate(data);
      queryClient.invalidateQueries("conversationMessages");
      console.log('Message sent to the server:', data);
      // Emit the message to the server
      socket.emit('message', data);
      // Clear the message input field after sending the message
      textInputElement.current.value = '';
    }
  };

  useEffect(() => {
    if (createMessageIsSuccess) {
      textInputElement.current.value = "";
    }
    if (createConversationIsSuccess) {
      setOpenChat(false)
      setSelectedMembers([])
      
    }
  }, [createMessageIsSuccess,createConversationIsSuccess]);

  const conversationHandler = (id) => {
    setConversationId(id);
    queryClient.invalidateQueries("conversationMessages");
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const otherUser = conversation?.data?.data?.members.find(member => member._id !== userId);

  const openCreateChat = () => {
    setOpenChat(true)
  }

  const closeCreateChat = () => {
    setOpenChat(false)
    setSearch("")
  }



  const fallbackImage = '/images/avatar.jpg';

  return (
    <>
      <div className='w-[80%]'>
        <div className="flex flex-col h-screen bg-white">
          <div className="flex flex-1 overflow-y-auto">
            <div className="w-[25%]  bg-white left border-r border-gray-200">
              <div className='fixed w-[20%]'>
                <div className="py-2">
                  <div className='flex px-4 justify-between items-center pt-6'>
                    <div className='flex gap-1 items-center'>
                      <h2 className="text-black text-2xl font-bold">Username</h2>
                      <ExpandMoreOutlinedIcon className='text-gray-600' style={{ fontSize: 24, }} />
                    </div>
                    <svg onClick={openCreateChat} aria-label="New message" className="cursor-pointer" fill="#000000" height="24" role="img" viewBox="0 0 24 24" width="24">
                      <title>New message</title>
                      <path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      ></path>
                      <path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      ></path>
                      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"
                      ></line>
                    </svg>
                  </div>
                  <div className='flex px-4 justify-between pt-6 pb-2'>
                    <h2 className='font-bold text-lg text-black'>Messages</h2>
                    <button className='text-gray-600 font-medium'>Requests</button>
                  </div>
                  {isConversationsLoading ? <Loader /> : (
                    <>
                      {conversations.data.data.map(conversation => {
                        // Find the member object that is not the current user
                        const otherMember = conversation.members.find(member => member._id !== userId);
                        return (
                          <div onClick={() => conversationHandler(conversation._id)} key={conversation._id} className='cursor-pointer card px-5 py-2 hover:bg-gray-100 flex items-center gap-2'>
                            <div className='img w-12 h-12 bg-gray-400 rounded-full '
                              style={{
                                backgroundImage: `url("${otherMember.profile?.picture}"), url("${fallbackImage}")`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                              }}>

                            </div>
                            <div className='flex flex-col'>
                              <div className='name'>
                                <h2>{otherMember?.username}</h2>
                              </div>
                              <div className='flex gap-1 text-sm text-gray-500'>
                                <div className='status'>
                                  <h2>Active</h2>
                                </div>
                                <div className='time'>14h ago</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}



                </div>
              </div>
            </div>
            {conversationMessages &&
              <>
                <div className="flex-1 right  flex flex-col justify-between pb-4">
                  <div className='flex-1 overflow-y-auto'>
                    <div className='header flex fixed bg-white justify-between w-[60%] border-b border-gray-200 py-3 px-4'>
                      <div className="flex items-center gap-3">
                        <div className="img w-11 h-11 bg-gray-400 rounded-full"
                          style={{
                            backgroundImage: `url("${otherUser?.profile?.picture}"), url("${fallbackImage}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}>
                        </div>
                        <div className='flex flex-col'>
                          <h2 className="text-gray-800 text-lg font-semibold leading-5">{otherUser?.username}</h2>
                          <div className='flex gap-1 text-xs text-gray-500'>
                            <div className='status'>
                              <h2>Active</h2>
                            </div>
                            <div className='time'>14h ago</div>
                          </div>
                        </div>
                      </div>


                      <div className='icons flex items-center'>
                        <div className='p-2 hover:cursor-pointer'>
                          <CallOutlinedIcon className='text-2xl' />
                        </div>
                        <div className='p-2 hover:cursor-pointer'>
                          <svg aria-label="Video call" className="_ab6-" fill="#000000" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <rect fill="none" height="18" rx="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="16.999" x="1" y="3"
                            ></rect>
                            <path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            ></path>
                          </svg>
                        </div>
                        <div className='p-2 hover:cursor-pointer'>
                          <InfoOutlinedIcon style={{ fontSize: 30 }} />
                        </div>
                      </div>
                    </div>
                    <div className="h-full space-y-4 px-6 flex flex-col justify-between">

                      <div className="flex flex-col items-center mt-28">
                        <div className="img w-32 h-32 bg-gray-400 rounded-full"
                          style={{
                            backgroundImage: `url("${otherUser?.profile?.picture}"), url("${fallbackImage}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}>
                        </div>
                        <div className="pt-2">
                          <h2 className="text-black text-xl font-bold">{otherUser?.username}</h2>
                        </div>
                        <p className="font-light text-gray-600">instagram</p>
                        <button className="mt-2 rounded-md px-4 py-1 bg-gray-100 hover:bg-gray-200 font-medium">
                          View profile
                        </button>
                      </div>
                      {isConversationMessagesLoading ? <Loader /> : (
                        <>

                          {conversationMessages.data.data.map((message) => (
                            <div className='flex-1' key={message._id}>
                              {message.sender._id !== currentUser.data._id ? ( // Check if the sender is the current user
                                <div className="user-1 flex items-end space-x-2">
                                  <img className="h-9 w-9 bg-gray-300 rounded-full" />
                                  <div className="bg-gray-200 rounded-3xl px-4 py-2 text-gray-800 max-w-xs" >
                                    <p>{message.text}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="user-2 flex items-end justify-end">
                                 <div className="bg-blue-500 rounded-3xl px-4 py-2 text-white max-w-xs">
                                    <p>{message.text}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </>)
                      }
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div className='px-4 mt-5 pb-2'>
                    <div className='border border-gray-300 rounded-3xl'>
                      <div className=' px-5 py-1 flex items-center gap-3'>
                        <span className='hover:cursor-pointer'><svg aria-label="Choose an emoji" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Choose an emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg></span>
                        <input
                          type="text"
                          className='bg-transparent w-full outline-none'
                          placeholder='Message...'
                          ref={textInputElement}
                        />
                        <div className='flex items-center'>
                          <span className='hover:cursor-pointer p-2'><svg aria-label="Voice Clip" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Voice Clip</title><path d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19.068" y2="22"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="8.706" x2="15.104" y1="22" y2="22"></line><path d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                          <span className='hover:cursor-pointer p-2'><svg aria-label="Add Photo or Video" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></span>
                          <span className='hover:cursor-pointer p-2'><svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" /></svg></span>
                          <span onClick={submitMessageHandler} className='hover:cursor-pointer p-2'><svg aria-label="Send Message" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}
                          >
                            <title>Send Message</title>
                            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2} x1={22} x2="9.218" y1={3} y2="10.083"
                            />
                            <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth={2}
                            />
                          </svg></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>

        <Dialog open={openChat} onClose={closeCreateChat} PaperProps={{ style: { borderRadius: '14px' }, }}>
          <div className="w-[500px] h-[60vh] relative">
            <div className="header flex justify-between items-center py-3 px-2 border-b">
              <div>
              </div>
              <div className="title flex items-center">
                <h1 className='font-bold'>New Message</h1>
              </div>
              <div onClick={closeCreateChat} className='cursor-pointer'>
                <svg aria-label="Close" className="" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"
                >
                  <title>Close</title>
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                </svg>
              </div>
            </div>
            <div className='flex items-center flex-wrap gap-3 py-2 px-2 border-b'>
              <span className='font-bold'>To: </span>
              
              {isUsersLoading ? <Loader /> : (
                <> 
                {openChat  ?
                 (<>
                  {selectedMembers?.map((member) => (
              <div key={member._id} className='userName-Card flex items-center font-medium text-blue-500 bg-blue-100 rounded-full hover:cursor-pointer'>
                <span className='pl-4 pr-1 py-[2px] hover:text-gray-600'>{member.username}</span>
                <span onClick={()=>removeMembersHandler(member)}>
                  <svg
                    aria-label="Close"
                    className="mr-3"
                    color="rgb(0, 0, 0)"
                    fill="rgb(59 130 246)"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <title>Close</title>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                  </svg>
                </span>
              </div>
                ))} 
                </>) : null
              }
   
              </>
            )}

              <div className="input flex-grow flex items-center">
                <input
                 type="text"
                 className='flex-grow pr-3 w-0 outline-none min-w-[100px]'
                 placeholder="Search"
                 value={search}
                 onChange={handleSearchChange}
                  />
              </div>
            </div>
            <div className="body pt-3 flex-grow overflow-y-auto max-h-[70%]">
            {search?.length === 0 && <div className="default  px-6"><span>No accounts found.</span></div>}

              {isUsersLoading ? <Loader /> : (
                <> 
                {openChat && search?.length > 0 ?
                 (<>
                  {users?.data?.users.filter(user => user._id !== currentUser.data._id).map((user) => (
              <div onClick={() => selectMembersHandler(user)} key={user._id} className="profile-Card">
                <div className='cursor-pointer px-5 py-2 hover:bg-gray-100 transition duration-300 ease-in-out flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <div className='img w-12 h-12 bg-gray-400 rounded-full '
                      style={{
                        backgroundImage: `url("${user.profile?.picture}"), url("${fallbackImage}")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }}>

                    </div>
                    <div className='flex flex-col'>
                      <div className='name'>
                        <h2 className='leading-5' >{user.firstName} {user.lastName}</h2>
                      </div>
                      <div className='text-sm text-gray-500'>
                        <span className='leading-1'>{user.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mr-2 flex items-center justify-center h-6 w-6 border-2 border-gray-500 rounded-full">

                  </div>
                </div>
              </div>
             ))} 
             </>) : null
           }

           </>
         )}


           
            
             
             
             
             
            </div>
            <div onClick={createConversationHandler} className="button absolute bottom-0  w-full bg-white py-3 px-4">
              <button className='bg-blue-500 hover:bg-blue-600 text-white py-3 w-full rounded-lg'>Chat</button>
            </div>
          </div>
        </Dialog>






      </div>
    </>
  )
}
