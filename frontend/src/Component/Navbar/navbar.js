  import React, { useState, useEffect } from 'react'
import './navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios';
import { BASE_URL } from '../../App';

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
    const [userPic, setUserPic] = useState("https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png")
    const [navbarModel, setNavbarModel] = useState(false);
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();
    const [isLogedIn, setIsLogedIn] = useState(false);


    const handleClickModel = () => {
        setNavbarModel(prev => !prev);
    }
    const SideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar)
    }

    const handleprofile = () => {
        let userId = sessionStorage.getItem("userId")
        navigate(`/user/${userId}`);
        setNavbarModel(false);
    }

    const setLoginModel = () => {
        setLogin(false);
    }

    const onclickOfPopUpOption = (button) => {
        setNavbarModel(false)
        if (button === "login") {
            setLogin(true);
        } else {
            sessionStorage.clear();
            getLogoutFun();
            setTimeout(() =>{
                navigate('/')
                window.location.reload();
            }, 2000);
        }
    }

    const getLogoutFun = async() =>{
        axios.post(`${BASE_URL}/auth/logout`,{},{withCredentials: true}).then((response) =>{
            console.log("Logout")
        }).catch (error =>{
            console.log(error);
        })
    } 


    useEffect(() => {
        let userProfilePic = sessionStorage.getItem("userProfilePic");
        setIsLogedIn(sessionStorage.getItem("userId") !== null ? true : false);
        if (userProfilePic !== null) {
            setUserPic(userProfilePic)
        }
    }, [])

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <div className='navbarHamberger' onClick={SideNavbarFunc}>
                    <MenuIcon sx={{ color: "white" }} />
                </div>
                <Link to={'/'} className='navbar_youtubeImg'>
                    <YouTubeIcon sx={{ fontSize: "34px" }} className='navbar_youtubeImg' />
                    <div className='navbar_utubeTitle'>YouTube</div>
                </Link>
            </div>

            <div className='navbar-middle'>
                <div className='navbar_searchBox'>
                    <input type='text' placeholder='search' className='navbar_searchBoxInput' />
                    <div className='navbar_searchIconBox'><SearchIcon sx={{ fontSize: "28px", color: "white" }} /> </div>
                </div>

                <div className='navbar_mike'>
                    <KeyboardVoiceIcon sx={{ color: "white" }} />
                </div>
            </div>

            <div className='navbar-right'>
                <Link to={'/763/upload'}>
                    <VideoCallIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
                </Link>
                <NotificationsIcon sx={{ fontSize: "30px", cursor: "pointer", color: "white" }} />
                <img onClick={handleClickModel} src={userPic} className='navbar-right-logo' alt='Logo' />


                {navbarModel &&
                    <div className='navbar-model'>
                        {isLogedIn && <div className='navbar-model-option' onClick={handleprofile}>Profile</div>}

                        {isLogedIn && <div className='navbar-model-option' onClick={() => onclickOfPopUpOption("logout")}>Logout</div>}
                        {!isLogedIn && <div className='navbar-model-option' onClick={() => onclickOfPopUpOption("login")}>Login</div>}

                    </div>
                }
            </div>
            {
                login && <Login setLoginModel={setLoginModel} />
            }
        </div>
    )
}

export default Navbar