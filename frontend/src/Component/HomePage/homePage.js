 import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../App';
import axiosInstance from '../../config';
import { RotatingLines } from 'react-loader-spinner';

const HomePage = ({ sideNavbar }) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);

    axiosInstance
      .get(`${BASE_URL}/api/allVideo`)
      .then((res) => {
        setData(res.data.videos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

  }, []);

  const options = [
    "All",
    "Twenty20",
    "Music",
    "Live",
    "Mixes",
    "Gaming",
    "Database",
    "Pawan Singh",
    "Democracy",
    "Comedy",
    "Live IPL",
    "Trending Song",
    "New Songs",
    "Honey Singh",
    "Pawan Singh",
  ];

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

      {/* Top Options */}
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

      {/* Main Videos Section */}
      <div className={sideNavbar ? 'home_mainPage' : 'home_mainPageWithoutLink'}>

        {/* Error */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Loader */}
        {
          loading ? (
            <div className='loaderBox'>
              <RotatingLines
                strokeColor="red"
                strokeWidth="5"
                animationDuration="0.75"
                width="80"
                visible={true}
              />
            </div>
          ) : (

            data?.map((item, ind) => {
              return (

                <Link
                  key={ind}
                  to={`/watch/${item._id}`}
                  className='youtube_video'
                >

                  {/* Thumbnail */}
                  <div className='youtube_thumbnailBox'>
                    <img
                      src={item.thumbnail}
                      alt="Thumbnail"
                      className='youtube_thumbnailPic'
                    />

                    <div className='youtube_timingThumbnail'>
                      28:05
                    </div>
                  </div>

                  {/* Title Box */}
                  <div className='youtubeTitleBox'>

                    {/* Profile */}
                    <div className='youtubeTitleBoxProfile'>
                      <img
                        src={item?.user?.profilePic}
                        alt='profile'
                        className='youtube_thumbnail_profile'
                      />
                    </div>

                    {/* Video Details */}
                    <div className='youtubeTitleBox_Title'>

                      <div className='youtube_videoTitle'>
                        {item?.title}
                      </div>

                      <div className='youtube_channelName'>
                        {item?.user?.channelName}
                      </div>

                      <div className='youtubeVideo_views'>
                        {item?.like} likes
                      </div>

                    </div>
                  </div>

                </Link>
              );
            })

          )
        }

      </div>
    </div>
  );
};

export default HomePage;