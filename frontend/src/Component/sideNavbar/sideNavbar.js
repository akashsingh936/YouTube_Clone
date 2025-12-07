import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ContentCutIcon from '@mui/icons-material/ContentCut';
const SideNavbar = ({ sideNavbar }) => {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
        <div className='home_sideNavbarTop'>
            <div className={`home_sideNavbarTopOption`}>
               <HomeIcon />
               <div className='home_sideNavbartopOptionTitle'>Home</div>
            </div>

              <div className={`home_sideNavbarTopOption`}>
               <VideocamIcon />
               <div className='home_sideNavbartopOptionTitle'>Shorts</div>
            </div>

             <div className={`home_sideNavbarTopOption`}>
               <SubscriptionsIcon />
               <div className='home_sideNavbartopOptionTitle'>Subscription</div>
            </div>
        </div>

        <div className='home_sideNavbarMiddle'>
             <div className={`home_sideNavbarTopOption`}>
                <div className='home_sideNavbartopOptionTitle'>You</div>
               <KeyboardArrowRightIcon />
                
            </div>

            <div className={`home_sideNavbarTopOption`}>
               <RecentActorsIcon />
               <div className='home_sideNavbartopOptionTitle'>Your Channel</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <HistoryIcon />
               <div className='home_sideNavbartopOptionTitle'>History</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <PlaylistAddIcon />
               <div className='home_sideNavbartopOptionTitle'>Playlist</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <SmartDisplayIcon />
               <div className='home_sideNavbartopOptionTitle'>Your Videos</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <WatchLaterIcon />
               <div className='home_sideNavbartopOptionTitle'>Watch Later</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <ThumbUpIcon />
               <div className='home_sideNavbartopOptionTitle'>Liked videos</div>
            </div>
            
            <div className={`home_sideNavbarTopOption`}>
               <ContentCutIcon />
               <div className='home_sideNavbartopOptionTitle'>Your Clips</div>
            </div>
        </div>

        <div className='home_sideNavbarMiddle'>
        <div className='home_sideNavbarTopOtion'>
            <div className='home_sideNavbarTopOptionTitleHeader'>Subscriptions</div>
        </div>
        <div className='home_sideNavbarTopOption'>
            <img className='home_sideNavbar_imgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' alt='Logo'/>
            <div className='home_sideNavbarTopOptionTitle'>Aaj tak</div>
        </div>

        <div className='home_sideNavbarTopOption'>
            <img className='home_sideNavbar_imgLogo' src='https://i.pinimg.com/736x/84/1e/1b/841e1bc1ca4bbcb9e5a64aadb741eafd.jpg' alt='Logo'/>
            <div className='home_sideNavbarTopOptionTitle'>CNBC Awaz</div>
        </div>

        <div className='home_sideNavbarTopOption'>
            <img className='home_sideNavbar_imgLogo' src='https://m.media-amazon.com/images/I/71mVndT8YCL.png' alt='Logo'/>
            <div className='home_sideNavbarTopOptionTitle'>CSK </div>
        </div>
        
        <div className='home_sideNavbarTopOption'>
            <img className='home_sideNavbar_imgLogo' src='https://bestmediainfo.com/uploads/2019/11/Lallantop_2.jpg' alt='Logo'/>
            <div className='home_sideNavbarTopOptionTitle'> Lallan top </div>
        </div>

        </div>
    </div>
    )
}

export default SideNavbar;