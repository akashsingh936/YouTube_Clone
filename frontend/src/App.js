
import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Home/Video/video';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/profile.js';
import VideoUpload from './Pages/VideoUpload/videoUpload.js';
import SignUp from './Pages/SignUp/signUp.js';
import axios from 'axios';


export const BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);


  // useEffect(()=>{
  //      axios.get(`${BASE_URL}/api/allVideo`).then(res=>{
  //       console.log(res);
  //      }).catch(error=>{
  //       console.log(error)
  //      })
  // },[])
  

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value)
  }

  return (
    <div className="App">

      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element={<VideoUpload />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;
