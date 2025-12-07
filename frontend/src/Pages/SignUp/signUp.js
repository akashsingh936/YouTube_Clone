import React, { useState } from 'react'
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BASE_URL } from '../../App';


const SignUp = () => {

  const [uploadedImageUrl, setUploadedImageUrl] = useState("https://tse4.mm.bing.net/th/id/OIP.FlcG6zg-UdT2VTUzoyafmwHaHa?pid=Api&P=0&h=180");
  const [signUpField, setSignUpField] = useState({ "channelName": "", "userName": "", "password": "", "about": "", "profilePic": uploadedImageUrl });
  const [progressBar, setProgressBar] = useState(false);
  const navigate = useNavigate();


  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField, [name]: event.target.value
    })
  }

  console.log(signUpField);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    // youtube-clone
    data.append('upload_preset', 'youtube-clone');

    try {
      // cloudName="dikcx99jl"
      setProgressBar(true)
      const response = await axios.post("https://api.cloudinary.com/v1_1/dikcx99jl/image/upload", data)
       setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);

      setSignUpField({
        ...signUpField, "profilePic": imageUrl
      })

    } catch (err) {
      console.error(err);
    }
  }


  const handleSignup = async () => {
    setProgressBar(true);
    axios.post(`${BASE_URL}/auth/signup`, signUpField).then((res) => {
      console.log(res);
      toast.success(res.data.data.message);
       setProgressBar(false);
navigate('/');
    }).catch(error => {
      console.log(error)
       setProgressBar(false);
       toast.error(error)
    })
  }

  return (
    <div className='signUp'>
      <div className=' signup_card'>
        <div className='signUp_title'>
          <  YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
          SignUp
        </div>

        <div className=' signUp_Inputs'>
          <input type="text" className=' signUp_Inputs_inp' value={signUpField.channelName} onChange={(e) => { handleInputField(e, "channelName") }} placeholder='channel name' />
          <input type="text" className=' signUp_Inputs_inp' value={signUpField.userName} onChange={(e) => { handleInputField(e, "userName") }} placeholder='User Name' />
          <input type="password" className=' signUp_Inputs_inp' value={signUpField.password} onChange={(e) => { handleInputField(e, "password") }} placeholder='Password' />
          <input type="text" className=' signUp_Inputs_inp' value={signUpField.about} onChange={(e) => { handleInputField(e, "about") }} placeholder='About Your Channel' />

          <div className='image_upload_signup'>
            <input type='file' onChange={(e) => uploadImage(e)} />

            <div className='image_upload_signup_div'>
              <img className=' image_default_signUp' src={uploadedImageUrl} />
            </div>
          </div>

          <div className='signUpBtns'>
            <div className='signUpBtn' onClick={handleSignup}> SignUp</div>
            < Link to={'/'} className='signUpBtn'> home Page</Link>
          </div>

          { progressBar && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}

        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignUp;