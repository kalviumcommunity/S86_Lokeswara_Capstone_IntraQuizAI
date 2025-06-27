import { Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './pages/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import OauthSuccess from './pages/OauthSuccess';



import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Home />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
                  <Route path="/oauth-success" element={<OauthSuccess />} />


        </Routes>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Footer />
    </>
  );
}

export default App
