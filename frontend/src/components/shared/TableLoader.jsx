import { React } from 'react';

const TableLoader = () => {
  return (
    <div className='cert-loader'>
      <div className='backgroundblur'>
        <img src={require('../../assets/images/certifi-loader.gif')} loading="lazy" />
      </div>
    </div> 
  );
}

export default TableLoader;