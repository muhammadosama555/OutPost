import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../apiCalls/userApiCalls';

export default function Navbar() {

  const { mutate: logoutMutate, isLoading: isLogoutLoading } = useLogout();

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <>
      <nav className='border-b fixed w-full z-20 bg-white border-gray-300'>
        <div className="desktop flex justify-between py-2 px-10">
          <div className='flex justify-self-start items-center gap-3'>
            <div className="logo">
              <h3>OutPost</h3>
            </div>
            <Link to="/" className='cursor-pointer'>
             {isLogoutLoading ? "...is Logging out" : "Logout"}
              </Link>
            <div className="searchbar">
              <form>
  <label htmlfor="default-search" className="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg aria-label="Search" className="w-5 h-5 text-gray-600" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height={24} role="img" viewBox="0 0 24 24" width={24}><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth={2} /><line fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth={2} x1="16.511" x2={22} y1="16.511" y2={22} /></svg>
    </div>
    <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm rounded-full text-gray-900 outline-none bg-gray-50" placeholder="Search for Outpost..." required />
  </div>
</form>

            </div>
          </div>
          <div className='menu flex items-center w-full justify-center px-28 fixed pt-2 right-0 left-0 gap-16'>
            <div className='Home'>
              <svg viewBox="0 0 28 28" className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6" fill="currentColor" height="28" width="28"><path d="M17.5 23.979 21.25 23.979C21.386 23.979 21.5 23.864 21.5 23.729L21.5 13.979C21.5 13.427 21.949 12.979 22.5 12.979L24.33 12.979 14.017 4.046 3.672 12.979 5.5 12.979C6.052 12.979 6.5 13.427 6.5 13.979L6.5 23.729C6.5 23.864 6.615 23.979 6.75 23.979L10.5 23.979 10.5 17.729C10.5 17.04 11.061 16.479 11.75 16.479L16.25 16.479C16.939 16.479 17.5 17.04 17.5 17.729L17.5 23.979ZM21.25 25.479 17 25.479C16.448 25.479 16 25.031 16 24.479L16 18.327C16 18.135 15.844 17.979 15.652 17.979L12.348 17.979C12.156 17.979 12 18.135 12 18.327L12 24.479C12 25.031 11.552 25.479 11 25.479L6.75 25.479C5.784 25.479 5 24.695 5 23.729L5 14.479 3.069 14.479C2.567 14.479 2.079 14.215 1.868 13.759 1.63 13.245 1.757 12.658 2.175 12.29L13.001 2.912C13.248 2.675 13.608 2.527 13.989 2.521 14.392 2.527 14.753 2.675 15.027 2.937L25.821 12.286C25.823 12.288 25.824 12.289 25.825 12.29 26.244 12.658 26.371 13.245 26.133 13.759 25.921 14.215 25.434 14.479 24.931 14.479L23 14.479 23 23.729C23 24.695 22.217 25.479 21.25 25.479Z"></path></svg>
            </div>
            <div className='Reels'>
              <svg aria-label="Reels" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
            </div>
            <div className='Groups'>
              <svg viewBox="0 0 28 28" className="" fill="currentColor" height="28" width="28"><path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path></svg>
            </div>
            <div className='Gaming'>
              <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" class="w-7 h-7"><g fillRule="evenodd" transform="translate(-444 -204)"><g><path fillRule="nonzero" d="M98.5 5.75v4a.75.75 0 1 0 1.5 0v-4a.75.75 0 1 0-1.5 0z" transform="translate(351.5 208.5)"></path><path fillRule="nonzero" d="M97.25 8.5h4a.75.75 0 1 0 0-1.5h-4a.75.75 0 1 0 0 1.5z" transform="translate(351.5 208.5)"></path><path fillRule="nonzero" d="M109.5 14.5h-10a7 7 0 0 1 0-14h10a7 7 0 0 1 0 14zm0-1.5a5.5 5.5 0 0 0 0-11h-10a5.5 5.5 0 0 0 0 11h10z" transform="translate(351.5 208.5)"></path><path d="M109 9.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m3-3a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0" transform="translate(351.5 208.5)"></path></g></g></svg>
            </div>
          </div>
          <div className='right-nav-button flex gap-5 items-center'>
            <div className='Messages'>
              <svg aria-label="Messenger" className="w-7 h-7" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Messenger</title><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fillRule="evenodd"></path></svg>
            </div>
            <div className='Notification'>
              <svg aria-label="Notifications" className="w-7 h-7" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
            </div>
            <div className='Profile'>
              <div className='w-8 h-8 bg-slate-300 rounded-full'></div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
