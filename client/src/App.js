import Home from './pages/Home';
import "./App.css";
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollToTop } from "./hooks/ScrollToTop";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from './components/SideBar';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import UserDetails from './pages/UserDetails';
import Settings from './pages/Settings';
import ForgetPassword from './pages/ForgetPassword';
import Reels from './pages/Reels';
import { useEffect, useState } from 'react';
const queryClient = new QueryClient()

function App() {

  const { currentUser } = useSelector((state) => state.userSlice);


  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        {currentUser ? (
          <>
          <Navbar /> 
            <div className='flex justify-between pt-[65px] w-full'>
           <SideBar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/userDetails/:userId' element={<UserDetails />}></Route>
                <Route path='/settings/editProfile' element={<Settings />}></Route>
                <Route path='/settings/security' element={<Settings />}></Route>
                <Route path='/settings' element={<Settings />}></Route>
                <Route path='/messages' element={<Messages />} />
                <Route path='/reels' element={<Reels/>}></Route>
              </Routes>
            </div>
            <Footer />
          </>) :
          (
            <>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgetPassword' element={<ForgetPassword />} />
              </Routes>
            </>
          )
        }
        <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
      </BrowserRouter>
      <ReactQueryDevtools intialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
