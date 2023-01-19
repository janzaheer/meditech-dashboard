import { useSelector } from "react-redux";
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;