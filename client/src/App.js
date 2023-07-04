import Home from './pages/Home';
import "./App.css";
import { QueryClientProvider,QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

function App() {

  const { currentUser } = useSelector((state) => state.userSlice);
  
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    {currentUser ? (
          <>
    <Navbar />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Routes>
    <Footer />
    </>) :
    (
      <>
      <Routes>
    <Route path='/' element={<Login/>}/>
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
