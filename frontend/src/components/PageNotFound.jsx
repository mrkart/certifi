import { React } from 'react';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='pnf'>
        <img src={require('../assets/images/page-not-found.png')} loading="lazy" />
        <h6>Oops!</h6>
        <p>The page you were looking for doesn't exist</p>
        <NavLink to="/dashboard" className='btn btn-primary'>Go to Dashboard</NavLink>
    </div>
  );
}

export default PageNotFound;