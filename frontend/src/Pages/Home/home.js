 import React from 'react';
import SideNavbar from '../../Component/sideNavbar/sideNavbar';
import HomePage from '../../Component/HomePage/homePage';
import './home.css';

const Home = ({ sideNavbar }) => {
  return (
    <div className='home'>
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar}/>
    </div>
  );
};

export default Home;
