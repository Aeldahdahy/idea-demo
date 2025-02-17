import React from 'react';
import CarouselMain from './CarouselMain';
import Statistics from './Statistics';
import WhoAreWe from './WhoAreWe';
// import Industries from './Industries';
import HowItWorks from './HowItWorks';
import CompaniesStories from './CompaniesStories';
import PartnersFeatured from './PartnersFeatured';


function Home() {
  return (
    <>
      <CarouselMain />
      <div className='spacemax'></div>
      <Statistics />
      <div className='spacemax'></div>
      <WhoAreWe />
      <div className='space'></div>
      {/* <Industries /> */}
      <HowItWorks />
      <div className='space'></div>
      <CompaniesStories />
      <div className='space'></div>
      <PartnersFeatured />
      <div className='space'></div>
    </>
  );
}

export default Home;
