import {Navigate} from 'react-router-dom';
import {LocalStorage} from '../../../../utils/storage';

const ProtectedRoute = ({children}) => {
  const token = LocalStorage.get ('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default ProtectedRoute;
