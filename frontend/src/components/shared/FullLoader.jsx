import { React } from 'react';

const FullLoader = () => {
  return (
    <div className='cert-full-loader'>
      <div className='backgroundblur'>
        <img src={require('../../assets/images/certifi-loader.gif')} loading="lazy" />
      </div>
    </div> 
  );
}

export default FullLoader;