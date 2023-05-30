import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const user = useSelector(state => state.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return isAuthenticated && user.user.is_seller == true ? <Outlet /> : <Navigate to="*" />;
}

export default ProtectedRoute;
