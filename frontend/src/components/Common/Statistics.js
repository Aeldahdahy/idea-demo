import React from 'react';
import StatImg1 from '../../assets/img-0.20.png';
import StatImg2 from '../../assets/img-0.21.png';
import StatImg3 from '../../assets/img-0.22.png';
import StatImg4 from '../../assets/img-0.23.png';



function Statistics() {
  return (
    <div className='Statistics-container'>
        <h2>Discover why many entrepreneurs and investors choose IDEA to grow their businesses...</h2>
        <div className='StatisticsCon'>
            <div className='box'>
                <img alt='lodaing...' src={StatImg1} width={50} height={50} />
                <span>50+ Countries</span>
            </div>
            <div className='box'>
                <img alt='lodaing...' src={StatImg2} width={50} height={50} />
                <span>Thousands of Pioneers & Investors</span>
            </div>
            <div className='box'>
                <img alt='lodaing...' src={StatImg3} width={50} height={50} />
                <span>60% Successful Connections</span>
            </div>
            <div className='box'>
                <img alt='lodaing...' src={StatImg4} width={50} height={50} />
                <span>$100k - $500k+ funds raised</span>
            </div>
        </div>
    </div>
  );
}

export default Statistics;
