import React, { useEffect, useState } from 'react'
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../App';
const HomePage = ({ sideNavbar }) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/api/allVideo`).then(res => {

      // console.log("backend Data",res.data.videos);
      setData(res.data.videos);
      // console.log(res);
      setLoading(false)
    }).catch(error => {
      // console.log({error: error.message})
      setError(error.message)
      setLoading(false)
    })
  }, []);

  const options = ["All", "Twenty20", "Music", "Live", "Mixes", "Gaming", "Detabase", "Pawan Singh", "Democracy", "Comedy", "Live IPL", "Trending Song", "New Songs", "Honey singh", "Pawan Singh",];
  // console.log("render me data:", data)
  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

      <div className='homePage_options'>
        {
          options.map((item, index) => {
            return (
              <div key={index} className='homePage_option'>
                {item}
              </div>
            );
          })
        }
      </div>


      <div className={sideNavbar ? 'home_mainPage' : 'home_mainPageWithoutLink'}>
        {error && <p style={{color: "red"}}>{error}</p>}
        {loading && <p style={{color: "white"}}>Loading please wait...</p>}
        {
          data?.map((item, ind) => {
            return (

              < Link key={ind} to={`/watch/${item._id}`} className='youtube_video'>

                <div className='youtube_thumbnailBox'>
                  <img src={item.thumbnail} alt="Thumnail" className='youtube_thumbnailPic' />
                  <div className='youtube_timingThumbnail'>
                    28:05
                  </div>
                </div>

                <div className='youtubeTitleBox'>
                  <div className='youtubeTitleBoxProfile'>
                    <img src={item?.user?.profilePic} alt='profile' className='youtube_thumbnail_profile' />
                  </div>

                  <div className='youtubeTitleBox_Title'>
                    <div className='youtube_videoTitle'>{item?.title}</div>
                    <div className='youtube_channelName'>{item?.user?.channelName}</div>
                    <div className='youtubeVideo_views'>{item?.like}31k likes</div>
                  </div>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  )
}

export default HomePage;