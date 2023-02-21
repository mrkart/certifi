import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import { history } from '_helpers';

export { PrivateRoute };

function PrivateRoute({ children }) {
    let authUser = localStorage.accessToken;
    if (!authUser) {
      return <Navigate to="/login"/>
    }
    // authorized so return child components
    return children;
}