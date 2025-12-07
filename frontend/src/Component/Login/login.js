import React, { useState } from 'react'
import './login.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BASE_URL } from '../../App';




const Login = ({ setLoginModel }) => {
    const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
    const [loader, setLoader] = useState(false)

    const handleOnChangeInput = (event, name) => {
        setLoginField({
            ...loginField, [name]: event.target.value
        })
    }

    const handleLoginFun = async () => {
        setLoader(true)
        axios.post(`${BASE_URL}/auth/logIn`, loginField, { withCredentials: true }).then((response) => {
            setLoader(false)
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.user._id)
            sessionStorage.setItem("userProfilePic", response.data.user.profilePic)
            window.location.reload();
        }).catch(error => {
            toast.error("invalid Credentials")
            console.log(error);
            setLoader(false)
        })
    }
    return (
        <div className='login'>
            <div className='login_card'>
                <div className='titleCard_login'>
                    <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
                    Login
                </div>

                <div className='loginCredentials'>
                    <div className='userNameLogin'>
                        <input className='userNameLoginUserName' value={loginField.userName} onChange={(e) => handleOnChangeInput(e, "userName")} placeholder='UserName' type='text' />
                    </div>

                    <div className='userNameLogin'>
                        <input className='userNameLoginUserName' value={loginField.password} onChange={(e) => handleOnChangeInput(e, "password")} placeholder='Password' type='password' />
                    </div>

                    <div className='login_buttons'>
                        <div className='login-btn' onClick={handleLoginFun}>Login</div>
                        <Link to={'/signup'} onClick={() => setLoginModel()} className='login-btn'>Signup</Link>
                        <div className='login-btn' onClick={() => setLoginModel()}>Cancel</div>
                    </div>

                    {loader && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}
                </div>
            </div>
            < ToastContainer />
        </div>
    )
}

export default Login






















