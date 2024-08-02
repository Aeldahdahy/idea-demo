import React from 'react';
import WhoAreWe from './WhoAreWe';
import Industries from './Industries';
import CompaniesStories from './CompaniesStories';
import PartnersFeatured from './PartnersFeatured';
import CarouselMain from './CarouselMain';
import Statistics from './Statistics';


function Home() {
  return (
    <>
      <CarouselMain />
      <div className='spacemax'></div>
      <Statistics />
      <div className='spacemax'></div>
      <WhoAreWe />
      <div className='space'></div>
      <Industries />
      <div className='space'></div>
      <CompaniesStories />
      <div className='space'></div>
      <PartnersFeatured />
      <div className='space'></div>
    </>
  );
}

export default Home;
