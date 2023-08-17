import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserDetails, useGetUsers, useLogout, useReadAllNotifications } from "../apiCalls/userApiCalls";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Dialog from '@material-ui/core/Dialog';
import moment from "moment";
import { addSearchHistory } from "../redux/reducers/searchReducers";
import useOutsideClick from "../hooks/useOutsideClick";

export default function SideBar() {

  const [openSearch, setOpenSearch] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [search, setSearch] = useState("");
  const [notificationCount, setNotificationCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);



  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { searchHistories } = useSelector((state) => state.searchSlice);

  const { currentUser } = useSelector((state) => state.userSlice);


  const userId = currentUser.data._id;
  const token = currentUser.token;

  const { isLoading: isUserLoading, data: userDetails, isFetching } = useGetUserDetails(
    userId,
    token
  );
  const { isLoading: isUsersLoading, data: users } = useGetUsers(token, search);
  const {
    mutate: readAllNotificationsMutate,
  } = useReadAllNotifications();
  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useLogout();


  useOutsideClick(dropdownRef, () => {
    if (showDropdown) setShowDropdown(false);
  });

  useOutsideClick(searchRef, () => {
    if (openSearch) setOpenSearch(false);
  });

  useOutsideClick(notificationRef, () => {
    if (openNotifications) setOpenNotifications(false);
  });



  const handleLogout = () => {
    logoutMutate()
  };

  const readNotificationsHandler = () => {

    const data = {
      token: token,
    };
    readAllNotificationsMutate(data);



  };

  const toggleSidebarHandler = () => {
    setToggleSidebar(!toggleSidebar);
    setOpenSearch(false);
    setOpenNotifications(false);
  };

  const openSearchHandler = () => {
    setOpenSearch(!openSearch);
    setOpenNotifications(false);
  };
  const openNotificationsHandler = () => {
    setOpenNotifications(!openNotifications);
    setOpenSearch(false);
    if (notificationCount > 0) {
      readNotificationsHandler();
    }

  };
  const openCreatePostHandler = () => {
    setOpenCreatePost(true);
  };

  const closeCreatePostHandler = () => {
    setOpenCreatePost(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (toggleSidebar) {
      toggleSidebarHandler();
    }
  };



  // Get the user's specific search history
  const userSearchHistory = searchHistories[userId] || [];

  const handleUserClick = (user) => {
    const isUserInSearchHistory = userSearchHistory.some(
      (historyUser) => historyUser._id === user._id
    );

    if (!isUserInSearchHistory) {
      dispatch(addSearchHistory({ userId, entry: user }));
    }

    navigate(`/userDetails/${user._id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 0 && windowWidth <= 768) {
        setToggleSidebar(true);
      } else {
        setToggleSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const countUnreadNotificationsFromOthers = (notifications, userId) => {
    return notifications.filter(
      (notification) =>
        !notification.isRead && notification.userId !== userId
    ).length;
  };

  useEffect(() => {
    if (userDetails && userDetails.data && userDetails.data.data && userDetails.data.data.notifications) {
      setNotificationCount(
        countUnreadNotificationsFromOthers(userDetails.data.data.notifications, userId)
      );
    }
  }, [userDetails, userId]);


  // Initialize the groupedNotifications Map
  const groupedNotifications = new Map();

  userDetails?.data.data?.notifications.forEach(notification => {
    if (notification.senderUser.username !== currentUser.data.username) {
      const postId = notification.post?._id;
      const senderUsername = notification.senderUser.username;
      const senderUserProfilePicture = notification.senderUser.profile?.picture;

      const userObject = {
        username: senderUsername,
        profilePicture: senderUserProfilePicture,
      };

      // Create a unique identifier for each group based on the notification type and postId (if available)
      let identifier;
      if (notification.type === "like" && postId) {
        identifier = `post_${postId}_like`;
      } else if (notification.type === "like" && !postId) {
        identifier = `like_without_post_${senderUsername}`;
      } else if (notification.type === "comment" && postId) {
        identifier = `post_${postId}_comment`;
      } else if (notification.type === "follow") {
        identifier = `non_post_follow_${senderUsername}`;
      } else {
        identifier = `other_${Math.random().toString(36).substr(2, 5)}`;
      }

      if (!groupedNotifications.has(identifier)) {
        groupedNotifications.set(identifier, {
          post:
            notification.type === "like" && postId
              ? notification.post
              : notification.type === "comment"
                ? notification.post
                : null,
          users: new Set(),
          type: notification.type,
          createdAt: notification.createdAt
        });
      }

      // Add the user object to the users Set
      groupedNotifications.get(identifier).users.add(userObject);
    }
  });

  // Convert the Map values to an array and reverse to show the most recent notifications first
  const notificationsArray = Array.from(groupedNotifications.values()).reverse();



  const time = notificationsArray.map((notificationGroup) => (
    moment(notificationGroup.createdAt).fromNow()
  ))

console.log(notificationsArray)

  const fallbackImage = "/images/avatar.jpg";

  return (
    <>
      <div className="left-side-bar w-[20%] ">
        <div className={`fixed left-0 top-12 pt-10 ${toggleSidebar ? "w-20" : "w-[20%]"} h-full border-r border-gray-200`}>
          <div className="space-y-2">
            {isUserLoading ? (
              <Loader />
            ) : (
              <Link to="/profile">
                <div

                  className="profile flex items-center gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-2 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
                >
                  <div className="w-10 flex items-center justify-center">
                    <div
                      className="w-10 h-10 border border-gray-200  rounded-full"
                      style={{
                        backgroundImage: `url("${userDetails.data.data.profile?.picture}"), url("${fallbackImage}")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                  {!toggleSidebar ? (
                    <p className=" w-full">
                      {userDetails.data.data.username}
                    </p>
                  ) : null}
                </div>
              </Link>
            )}

            <div
              onClick={() => {
                !openSearch ? setToggleSidebar(true) : setToggleSidebar(false);
                openSearchHandler();
              }}
              className="search flex items-center pt-1 gap-3  hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  aria-label="Search"
                  className="w-6 h-6 text-gray-600"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height={24}
                  role="img"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path
                    d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="16.511"
                    x2={22}
                    y1="16.511"
                    y2={22}
                  />
                </svg>
              </div>
              {!toggleSidebar ? (
                <p className=" w-full">Search</p>
              ) : null}
            </div>
            <div
              onClick={toggleSidebarHandler}
              className="Reels flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  aria-label="Reels"
                  className="h-6 w-6"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height={24}
                  role="img"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="2.049"
                    x2="21.95"
                    y1="7.002"
                    y2="7.002"
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="13.504"
                    x2="16.362"
                    y1="2.001"
                    y2="7.002"
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="7.207"
                    x2="10.002"
                    y1="2.11"
                    y2="7.002"
                  />
                  <path
                    d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              {!toggleSidebar ? (
                <p className=" w-full">Reels</p>
              ) : null}
            </div>
            <Link to="/messages">
              <div

                className="Messages flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    aria-label="Messenger"
                    className="w-6 h-6"
                    color="rgb(0, 0, 0)"
                    fill="rgb(0, 0, 0)"
                    height={24}
                    role="img"
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <title>Messenger</title>
                    <path
                      d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit={10}
                      strokeWidth="1.739"
                    />
                    <path
                      d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                {!toggleSidebar ? (
                  <p className=" w-full">Messages</p>
                ) : null}
              </div>
            </Link>
            <div
              onClick={() => {
                !openNotifications ? setToggleSidebar(true) : setToggleSidebar(false);
                openNotificationsHandler();
              }}
              className="Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg
                  aria-label="Like"
                  className="x1lliihq x1n2onr6"
                  color="rgb(38, 38, 38)"
                  fill="rgb(38, 38, 38)"
                  height={24}
                  role="img"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <title>Like</title>
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.260.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                </svg>
                {!isFetching && notificationCount > 0 && (
                  <div
                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {!isFetching && notificationCount > 20 ? '20+' : notificationCount}
                  </div>
                )}
              </div>
              {!toggleSidebar ? <p className=" w-full">Notifications</p> : null}
            </div>

            <div
              onClick={openCreatePostHandler}
              className="Create flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <svg
                  aria-label="New post"
                  className="_ab6-"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height={24}
                  role="img"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="6.545"
                    x2="17.455"
                    y1="12.001"
                    y2="12.001"
                  />
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    x1="12.003"
                    x2="12.003"
                    y1="6.545"
                    y2="17.455"
                  />
                </svg>
              </div>
              {!toggleSidebar ? (
                <p className=" w-full">Create</p>
              ) : null}
            </div>
            <div
              onClick={toggleSidebarHandler}
              className="flex items-center pt-1 gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg aria-label="Saved" className="w-6 h-6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={18} role="img" viewBox="0 0 24 24" width={18}>
                  <title>Saved</title>
                  <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  />
                </svg>
              </div>
              {!toggleSidebar ? (
                <p className="w-full">Save</p>
              ) : null}
            </div>
          </div>
          <div className={`MORE_OPTION fixed bottom-0 ${toggleSidebar ? 'w-20' : 'w-[20%]'} mb-4`}>
            <div ref={dropdownRef} className="w-full relative" >
              <div
                className="Create flex items-center gap-3 hover:bg-gray-100 rounded-lg mx-3 px-2 py-1 hover:font-bold hover:cursor-pointer hover:transition-all ease-in-out"
                onClick={toggleDropdown}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <MenuIcon style={{ fontSize: 32 }} />
                </div>
                {!toggleSidebar ? (
                  <p className="w-full">More</p>
                ) : null}

              </div>
              {showDropdown && (
                <div className="absolute bottom-14 left-3 w-[75%] bg-white shadow-lg border rounded-2xl">
                  <div className="top p-2">
                    <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <svg aria-label="Options" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20">
                        <title>Options</title>
                        <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                        <path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                      <p className="text-sm">Settings</p>
                    </Link>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <svg aria-label="Your activity" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Your activity</title><path d="M12 1.505a10.5 10.5 0 1 1-7.424 17.924" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><polyline fill="none" points="8.893 15.108 12 12 12.012 12.012 12.012 5.793" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline><circle cx="7.24" cy="2.651" r="1.125"></circle><circle cx="3.515" cy="5.83" r="1.125"></circle><circle cx="1.636" cy="10.353" r="1.125"></circle><circle cx="2.01" cy="15.235" r="1.125"></circle></svg>
                      <p className="text-sm">Your activity</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <svg aria-label="Theme icon" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Theme icon</title><path d="M12.00018,4.5a1,1,0,0,0,1-1V2a1,1,0,0,0-2,0V3.5A1.00005,1.00005,0,0,0,12.00018,4.5ZM5.28241,6.69678A.99989.99989,0,1,0,6.69647,5.28271l-1.06054-1.061A.99989.99989,0,0,0,4.22186,5.63574ZM4.50018,12a1,1,0,0,0-1-1h-1.5a1,1,0,0,0,0,2h1.5A1,1,0,0,0,4.50018,12Zm.78223,5.30322-1.06055,1.061a.99989.99989,0,1,0,1.41407,1.41406l1.06054-1.061a.99989.99989,0,0,0-1.41406-1.41407ZM12.00018,19.5a1.00005,1.00005,0,0,0-1,1V22a1,1,0,0,0,2,0V20.5A1,1,0,0,0,12.00018,19.5Zm6.71729-2.19678a.99989.99989,0,0,0-1.41406,1.41407l1.06054,1.061A.99989.99989,0,0,0,19.778,18.36426ZM22.00018,11h-1.5a1,1,0,0,0,0,2h1.5a1,1,0,0,0,0-2ZM18.01044,6.98975a.996.996,0,0,0,.707-.293l1.06055-1.061A.99989.99989,0,0,0,18.364,4.22168l-1.06054,1.061a1,1,0,0,0,.707,1.707ZM12.00018,6a6,6,0,1,0,6,6A6.00657,6.00657,0,0,0,12.00018,6Zm0,10a4,4,0,1,1,4-4A4.00458,4.00458,0,0,1,12.00018,16Z"></path></svg>
                      <p className="text-sm">Switch appearance</p>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <svg aria-label="Report a problem" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="18" role="img" viewBox="0 0 24 24" width="18"><title>Report a problem</title><path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path></svg>
                      <p className="text-sm">Report a problem</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 my-[2px] h-[5px] w-full"></div>
                  <div className="bottom p-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <p className="text-sm">Switch accounts</p>
                    </div>
                    <hr className="my-2" />
                    <div onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
                      <p className="text-sm">{isLogoutLoading ? "Loging out" : "Log out"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* -----------------------------------------------search model  ---------------------------------------------------------- */}
        <div ref={searchRef}
          className={`${openSearch ? "" : "hidden"
            } search-panel pl-[78px] w-[420px] bg-white h-screen`}
        >
          <div className="fixed z-20 ml-[5px] mt-[1px] bg-white w-[342px] border-r h-screen">
            <div className="border-b py-5">
              <h2 className="text-2xl px-5 font-medium">Search</h2>
              <div className="searchbar flex items-center  bg-slate-200 rounded-md mt-8 mx-3">
                <input
                  className="pl-4 pr-7 py-2 bg-gray-200 border w-full h-full rounded-md outline-none"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
                <div className="w-5 h-5 mr-2 rounded-full bg-[#b8b6b6] flex items-center justify-center cursor-pointer">
                  {" "}
                  <CloseOutlinedIcon style={{ fontSize: 12 }} onClick={() => setSearch("")} />
                </div>
              </div>
            </div>
            {/* <div className='px-5 py-4'>
                            <div className='flex justify-between'><h1>Recent</h1> <button>Clear all</button></div>
                        </div> */}
            <div className="pt-3 overflow-y-auto max-h-[500px]">

              {isUsersLoading ? <Loader /> : (
                <>
                  {openSearch && search?.length > 0 ?
                    (<>
                      {users?.data?.users.map((user) => (
                        <div onClick={() => handleUserClick(user)} key={user._id} className="card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                          <div
                            className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                            style={{
                              backgroundImage: `url("${user.profile?.picture}"), url("${fallbackImage}")`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="flex flex-col">
                            <div className="name">
                              <h2>{user.firstName} {user.lastName}</h2>
                            </div>
                            <div className="flex gap-1 text-sm text-gray-500">
                              <div className="status">
                                <h2>{user.username} •</h2>
                              </div>
                              <div className="time">{user.followers.length} Followers</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>) : null
                  }
                  {openSearch && search?.length === 0 ?
                    (<>
                      {userSearchHistory?.map((user) => (
                        <div onClick={() => handleUserClick(user)} key={user._id} className="card px-5 py-[10px] hover:bg-gray-100 flex items-center gap-3 cursor-pointer">
                          <div
                            className="img w-12 h-12 bg-gray-400 rounded-full ring-[2px] ring-red-300 ring-offset-[2px]"
                            style={{
                              backgroundImage: `url("${user.profile?.picture}"), url("${fallbackImage}")`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                          <div className="flex flex-col">
                            <div className="name">
                              <h2>{user.firstName} {user.lastName}</h2>
                            </div>
                            <div className="flex gap-1 text-sm text-gray-500">
                              <div className="status">
                                <h2>{user.username} •</h2>
                              </div>
                              <div className="time">{user.followers.length} Followers</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>) : null
                  }

                </>
              )}


            </div>
          </div>
        </div>
        {/* -----------------------------------------------notification model  ---------------------------------------------------------- */}

        <div ref={notificationRef}
          className={`${openNotifications ? "" : "hidden"
            } noti-panel pl-[78px] w-[420px] bg-white h-screen`}
        >
          <div className="fixed z-20 ml-[2px] mt-[5px] bg-white w-[350px] border-r h-screen">
            <div className="pt-5">
              <h2 className="text-2xl px-4 font-medium">Notifications</h2>
            </div>

            <div className="overflow-y-auto max-h-[500px]">
              {!time.includes("month,year") ?

                <div className=" border-b border-gray-300 pb-4">
                  <h2 className="py-3 px-4 font-bold text-lg">New</h2>


                  {notificationsArray.map((notificationGroup) => (
                    <div className="notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer" key={notificationGroup.identifier}>
                      <div>
                        <div
                          className="w-12 h-12 rounded-full bg-gray-200"
                          style={{
                            backgroundImage: `url("${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.profilePicture}"), url("${fallbackImage}")`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      </div>
                      <div className="w-full pl-3 pr-2 tracking-tight text-sm">
                        <span>
                          {notificationGroup.type === 'like' ? (
                            notificationGroup.users.size === 1 ? (
                              `${Array.from(notificationGroup.users)[0]?.username} liked your post ${notificationGroup.post.content}.`
                            ) : (
                              `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} and ${notificationGroup.users.size - 1
                              } others liked your post ${notificationGroup.post.content}.`
                            )
                          ) : notificationGroup.type === 'comment' ? (
                            (() => {
                              const usersArray = Array.from(notificationGroup.users);
                              const currentUser = usersArray[usersArray.length - 1];
                              const otherUsersCount = usersArray.length - 1;

                              const uniqueUsers = new Set(usersArray.map(user => user.username));
                              const uniqueUsersCount = uniqueUsers.size;

                              let commentText = '';
                              if (uniqueUsersCount === 1) {
                                commentText = `${Array.from(uniqueUsers)[0]} commented on your post ${notificationGroup.post.content}.`;
                              } else {
                                const lastCommenter = Array.from(uniqueUsers)[uniqueUsersCount - 1];
                                const othersCommentCount = uniqueUsersCount - 1;
                                commentText = `${lastCommenter} and ${othersCommentCount} other${othersCommentCount > 1 ? 's' : ''} commented on your post ${notificationGroup.post.content}.`;
                              }

                              return commentText;
                            })()
                          ) : notificationGroup.type === 'follow' ? (
                            `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} started following you.`
                          ) : (
                            ''
                          )}

                        </span>{" "}
                        <div>
                          <span className="time text-gray-500">{moment(notificationGroup.createdAt).fromNow()}</span>
                        </div>
                      </div>

                    </div>
                  ))}


                </div>

                : time === "1 month ago" ?
                  <div className=" border-b border-gray-300 pb-4">
                    <h2 className="py-3 px-4 font-bold text-lg">Last Month</h2>


                    {notificationsArray.map((notificationGroup) => (
                      <div className="notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer" key={notificationGroup.identifier}>
                        <div>
                          <div
                            className="w-12 h-12 rounded-full bg-gray-200"
                            style={{
                              backgroundImage: `url("${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.profilePicture}"), url("${fallbackImage}")`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </div>
                        <div className="w-full pl-3 pr-2 tracking-tight text-sm">
                          <span>
                            {notificationGroup.type === 'like' ? (
                              notificationGroup.users.size === 1 ? (
                                `${Array.from(notificationGroup.users)[0]?.username} liked your post ${notificationGroup.post.content}.`
                              ) : (
                                `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} and ${notificationGroup.users.size - 1
                                } others liked your post ${notificationGroup.post.content}.`
                              )
                            ) : notificationGroup.type === 'comment' ? (
                              (() => {
                                const usersArray = Array.from(notificationGroup.users);
                                const currentUser = usersArray[usersArray.length - 1];
                                const otherUsersCount = usersArray.length - 1;

                                const uniqueUsers = new Set(usersArray.map(user => user.username));
                                const uniqueUsersCount = uniqueUsers.size;

                                let commentText = '';
                                if (uniqueUsersCount === 1) {
                                  commentText = `${Array.from(uniqueUsers)[0]} commented on your post ${notificationGroup.post.content}.`;
                                } else {
                                  const lastCommenter = Array.from(uniqueUsers)[uniqueUsersCount - 1];
                                  const othersCommentCount = uniqueUsersCount - 1;
                                  commentText = `${lastCommenter} and ${othersCommentCount} other${othersCommentCount > 1 ? 's' : ''} commented on your post ${notificationGroup.post.content}.`;
                                }

                                return commentText;
                              })()
                            ) : notificationGroup.type === 'follow' ? (
                              `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} started following you.`
                            ) : (
                              ''
                            )}

                          </span>{" "}
                          <div>
                            <span className="time text-gray-500">{moment(notificationGroup.createdAt).fromNow()}</span>
                          </div>
                        </div>

                      </div>
                    ))}


                  </div> :


                  <div className=" border-b border-gray-300 pb-4">
                    <h2 className="py-3 px-4 font-bold text-lg">Earlier</h2>

                    {notificationsArray.map((notificationGroup) => (
                      <div className="notification flex items-center py-[6px] px-4 hover:bg-gray-50 cursor-pointer" key={notificationGroup.identifier}>
                        <div>
                          <div
                            className="w-12 h-12 rounded-full bg-gray-200"
                            style={{
                              backgroundImage: `url("${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.profilePicture}"), url("${fallbackImage}")`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                            }}
                          />
                        </div>
                        <div className="w-full pl-3 pr-2 tracking-tight text-sm">
                          <span>
                            {notificationGroup.type === 'like' ? (
                              notificationGroup.users.size === 1 ? (
                                `${Array.from(notificationGroup.users)[0]?.username} liked your post ${notificationGroup.post.content}.`
                              ) : (
                                `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} and ${notificationGroup.users.size - 1
                                } others liked your post ${notificationGroup.post.content}.`
                              )
                            ) : notificationGroup.type === 'comment' ? (
                              (() => {
                                const usersArray = Array.from(notificationGroup.users);
                                const currentUser = usersArray[usersArray.length - 1];
                                const otherUsersCount = usersArray.length - 1;

                                const uniqueUsers = new Set(usersArray.map(user => user.username));
                                const uniqueUsersCount = uniqueUsers.size;

                                let commentText = '';
                                if (uniqueUsersCount === 1) {
                                  commentText = `${Array.from(uniqueUsers)[0]} commented on your post ${notificationGroup.post.content}.`;
                                } else {
                                  const lastCommenter = Array.from(uniqueUsers)[uniqueUsersCount - 1];
                                  const othersCommentCount = uniqueUsersCount - 1;
                                  commentText = `${lastCommenter} and ${othersCommentCount} other${othersCommentCount > 1 ? 's' : ''} commented on your post ${notificationGroup.post.content}.`;
                                }

                                return commentText;
                              })()
                            ) : notificationGroup.type === 'follow' ? (
                              `${Array.from(notificationGroup.users)[notificationGroup.users.size - 1]?.username} started following you.`
                            ) : (
                              ''
                            )}

                          </span>{" "}
                          <div>
                            <span className="time text-gray-500">{moment(notificationGroup.createdAt).fromNow()}</span>
                          </div>
                        </div>

                      </div>
                    ))}

                  </div>
              }
            </div>
          </div>
        </div>
        <Dialog open={openCreatePost}
          onClose={closeCreatePostHandler}
          BackdropProps={{ onClick: closeCreatePostHandler }} // Close on backdrop click
          fullWidth
          maxWidth="sm">
          <div className={` ${openCreatePost ? "" : "hidden"} create-post  fixed inset-0 z-40 right-0 left-0 top-0 flex items-center justify-center w-screen h-screen`}>
            <div className="absolute right-6 top-3">
              <CloseOutlinedIcon style={{ fontSize: 32 }} onClick={closeCreatePostHandler} className="cursor-pointer text-white" />
            </div>
            <CreatePost closeCreatePostHandler={closeCreatePostHandler} />
            <div className=" hidden cancel-post  flex items-center justify-between flex-col close-card bg-white h-52 absolute w-[360px] rounded-2xl shadow-lg">
              <div className="flex flex-col justify-center text-center h-1/2 w-full">
                <h3 className="text-2xl">Discard Post?</h3>
                <h4 className="pt-1 text-gray-500">
                  If you leave your edits won't be saved.
                </h4>
              </div>
              <div className="flex flex-col w-full">
                <button className="py-3 border-t w-full font-medium text-red-600 hover:bg-slate-100">
                  Discard
                </button>
                <button className="py-3 border-t w-full hover:bg-slate-100">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </div >
    </>
  );
}
